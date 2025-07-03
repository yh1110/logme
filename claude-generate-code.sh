#!/bin/bash
set -euo pipefail

# ——————————————
# 必須: リポジトリ外で動いていたら即終了
# ——————————————
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: リポジトリの外で実行されています。"
  exit 1
fi

# 対象リポジトリ (OWNER/REPO形式)
REPO="yh1110/logme"

# ベースブランチ
BASE_BRANCH="master"

# claudeラベル付きオープンIssueの番号一覧を取得
ISSUE_NUMBERS=$(gh issue list \
  --repo "$REPO" \
  --label "claude" \
  --state open \
  --json number \
  --jq '.[].number')

if [ -z "$ISSUE_NUMBERS" ]; then
  echo "'claude'のlabelが付いたオープンなIssueはありません。"
  exit 0
fi

# 現在のブランチを保存
CURRENT_BRANCH=$(git branch --show-current)

for ISSUE_NUMBER in $ISSUE_NUMBERS; do
  # Issueのタイトル／本文を取得
  ISSUE_TITLE=$(gh issue view "$ISSUE_NUMBER" \
    --repo "$REPO" \
    --json title \
    --jq '.title')
  ISSUE_BODY=$(gh issue view "$ISSUE_NUMBER" \
    --repo "$REPO" \
    --json body \
    --jq '.body')

  echo "処理中のissue #$ISSUE_NUMBER: $ISSUE_TITLE"

  # ——————————————
  # ブランチ名生成 例：claude/feature/#123
  # ——————————————
  BRANCH_NAME="claude/feature/${ISSUE_NUMBER}"

  # develop ブランチ更新＋新規ブランチ作成
  git checkout "$BASE_BRANCH"
  git pull origin "$BASE_BRANCH"

  # develop ブランチ更新＋新規ブランチ作成（or 既存checkout）
  if git show-ref --verify --quiet "refs/heads/${BRANCH_NAME}"; then
    # ローカルにあれば checkout のみ
    echo "ローカルに ${BRANCH_NAME} が存在するため checkout します"
    git checkout "${BRANCH_NAME}"
    git pull --ff-only origin "${BRANCH_NAME}"
  elif git ls-remote --exit-code --heads origin "${BRANCH_NAME}" >/dev/null 2>&1; then
    # リモートだけにあれば fetch→checkout
    echo "リモートにだけ ${BRANCH_NAME} が存在するため fetch→checkout します"
    git fetch origin "${BRANCH_NAME}:${BRANCH_NAME}"
    git checkout "${BRANCH_NAME}"
    git pull --ff-only origin "${BRANCH_NAME}"
  else
    # 完全に新規
    echo "新規ブランチ ${BRANCH_NAME} を作成します"
    git checkout "${BASE_BRANCH}"
    git pull origin "${BASE_BRANCH}"
    git checkout -b "${BRANCH_NAME}"
  fi


  # Claude に投げる最初のプロンプト（非対話モード）
  PROMPT_PATCH="$(printf '%s\n\n%s\n%s\n' \
  "GitHub Issue #$ISSUE_NUMBER: $ISSUE_TITLE" \
  "$ISSUE_BODY" \
  "unified diff（パッチ）のみを返してください。'.git' のような'.'から始まるファイル、フォルダの中身は絶対に変更しないでください。")"

  # 1) Claude へプロンプトを投げてパッチを変数にキャプチャ
  PATCH_RAW=$(printf "GitHub Issue #%s: %s\n\n%s\n\nunified diff（diff --git a/... b/... 形式）だけ出力してください。" \
  "$ISSUE_NUMBER" "$ISSUE_TITLE" "$ISSUE_BODY" \
  | tr -d '\r' \
  | claude --print --dangerously-skip-permissions)

  # 2) まずファイルに書き出して中身を確認
  echo "$PATCH_RAW" > /tmp/claude.patch
  echo ">>> Generated patch (head) <<<"
  head -n 20 /tmp/claude.patch
  echo ">>> (…以上先頭20行) <<<"

  PATCH_CLEAN=$(sed -n '/^diff --git/,${p}' /tmp/claude.patch)

  # 4) クリーンなパッチを適用
  echo "$PATCH_CLEAN" | git apply --whitespace=fix -

  # 変更がない場合はブランチを削除してスキップ
  if [[ -z $(git status --porcelain) ]]; then
      echo "変更点はありません。ブランチを削除します。"
      git checkout "$CURRENT_BRANCH"
      git branch -D "$BRANCH_NAME"
      continue
  fi

  # 変更をコミット
  git add .
  git commit -m "fix: $ISSUE_TITLE #$ISSUE_NUMBER"
  git push -u origin "$BRANCH_NAME"

  # develop との差分を取得
  DIFF=$(git diff "origin/$BASE_BRANCH"...HEAD)

  # 変更内容の要約を取得（非対話モード）
  PROMPT_SUMMARY="$(printf '%s\n\n%s\n' \
  "以下の差分を日本語で簡潔に要約してください。" \
  "$DIFF")"

  SUMMARY=$(echo "$PROMPT_SUMMARY" | claude --print --dangerously-skip-permissions)

  # リモートにプッシュ
  git push -u origin "$BRANCH_NAME"

  echo "Creating pull request..."
  gh pr create \
      --title "Fix: $ISSUE_TITLE (#$ISSUE_NUMBER)" \
      --repo "$REPO" \
      --base "$BASE_BRANCH" \
      --head "$BRANCH_NAME" \
      --body "$SUMMARY" \
      --assignee "@me"

  echo "PRを作成しました issue #$ISSUE_NUMBER"

  # 元のブランチに戻る
  git checkout "$CURRENT_BRANCH"
done

echo "処理完了."
