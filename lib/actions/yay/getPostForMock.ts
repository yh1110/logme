export async function getPostForMock() {
  const diaryData = [
    {
      id: 513766421,
      postContent: {
        text: ">経歴詐称すると同級生とか元上司とかからPR来るのか\n\n面白すぎる",
        attachment: [{ uri: "..." }],
        video: [],
      },
      createdAt: "2025/4/11 22:41:05",
    },
    {
      id: 513744183,
      postContent: {
        text: "markdownで職務経歴書を書けばバージョン管理できるのか",
        attachment: [],
        video: [],
      },
      createdAt: "2025/4/11 20:56:15",
    },
  ];
  return diaryData;
}
