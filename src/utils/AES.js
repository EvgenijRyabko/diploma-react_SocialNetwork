import { rand } from 'random-bytes-js';
import CryptoJS from 'crypto-js';

export const encryptPass = (pass = '') => {
  let iv = rand(32);

  // If length bytes > 32 then trim to 32
  if (iv.length > 32) iv = iv.slice(0, 32);

  const AesKey = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_API_KEY);
  const byteIv = CryptoJS.enc.Hex.parse(iv);
  const encryptedStringHex = CryptoJS.AES.encrypt(pass, AesKey, {
    iv: byteIv,
    mode: CryptoJS.mode.CBC,
    format: CryptoJS.format.Hex,
  }).ciphertext;

  const hex = CryptoJS.enc.Hex.stringify(byteIv);

  return `${hex}:${encryptedStringHex.toString()}`;
};
