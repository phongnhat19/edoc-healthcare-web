import VI_ERROR_MESSAGE from "./vi";
const getErrorMessage = (errorCode: string, lang: string) => {
  if (lang === "vi") return (VI_ERROR_MESSAGE as any)[errorCode];
  return (VI_ERROR_MESSAGE as any)[errorCode];
};

export { getErrorMessage };
