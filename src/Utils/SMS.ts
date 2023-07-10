export const verifyCode = (text, validCode) => {
  return text.toString() === validCode.toString();
};
