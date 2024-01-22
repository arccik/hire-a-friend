import crypto from "crypto";
import CryptoJS from "crypto-js";

export function generateFileName(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}

export async function computeSHA256(file: File) {
  const buffer = await file.arrayBuffer();
  const wordArray = CryptoJS.lib.WordArray.create(buffer);
  const hash = CryptoJS.SHA256(wordArray);
  return hash.toString(CryptoJS.enc.Hex);
}
