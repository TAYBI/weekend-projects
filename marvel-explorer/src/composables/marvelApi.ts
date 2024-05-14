import type { Comics } from "@/types/marvel";
import CryptoJS from "crypto-js";

export const useComics = async (): Promise<Comics> => {
  const publicKey = import.meta.env.VITE_APP_MARVEL_API_PUBLIC;
  const privateKey = import.meta.env.VITE_APP_MARVEL_API_SECRET;

  const timestamp = new Date().getTime();
  const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

  const requestURI = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  const res = await fetch(requestURI);
  const jsonRes = await res.json();
  return jsonRes.data;
};
