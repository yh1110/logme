import crypto from "crypto";

// .env に設定した32バイトのキー（例: ENCRYPTION_KEY=32charslongsecretkey12345678）
const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY ?? "", "utf8");

if (key.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be exactly 32 bytes");
}

// 安全な暗号化関数（IVをランダム生成）
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16); // 16バイトのランダムIV
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  // 暗号化されたデータとIVを結合してbase64で返す（IV + encrypted）
  const encryptedData = Buffer.concat([iv, Buffer.from(encrypted, "base64")]).toString("base64");
  return encryptedData;
}

// 安全な復号関数（IVを分離して復号）
export function decrypt(encryptedData: string): string {
  const raw = Buffer.from(encryptedData, "base64");

  const iv = raw.subarray(0, 16); // 先頭16バイトがIV
  const encryptedText = raw.subarray(16); // 残りが暗号文

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, undefined, "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
