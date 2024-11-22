export const popularity = (popularity: number) => {
  if (popularity >= 70) {
    return "High";
  } else if (popularity >= 40) {
    return "Middle";
  } else {
    return "Low";
  }
};
