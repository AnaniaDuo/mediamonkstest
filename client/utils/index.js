export const deleteCookies = (str) => {
  const strArr = str.split("; ");
  strArr.forEach((ele) => {
    let i = ele.indexOf("=");
    ele = ele.slice(0, i);
    document.cookie = `${ele}= ; expires = Thu, 02 Jun 2022 00:00:00 GMT`;
  });
};
