export const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...Array.from(new Uint8Array(input))))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
