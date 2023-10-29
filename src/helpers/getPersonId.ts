export const getPersonId = (url: string) => {
  const splitedArr = url.split("/");
  return splitedArr[splitedArr.length - 2];
};
