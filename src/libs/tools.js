/**
 *
 * @description 业务无关工具函数
 */

export const awaitWrap = promise =>
  promise
    .then(res => {
      if (res.status === 200 && res.data.code === "0") {
        return [null, res.data];
      }
      return [res.data.message ? res.data.message : "错误", null];
    })
    .catch(err => {
      const msg = typeof err === "object" ? err.message : err;
      return [msg, null];
    });

export const chunk = (arr, size) => {
  const arr2 = [];
  for (let i = 0; i < arr.length; i += size) {
    arr2.push(arr.slice(i, i + size));
  }
  return arr2;
};

export const toArr = num => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(i);
  }
  return arr;
};

export const cloneForm = (from, to) => {
  if (!(from instanceof Object) || !(to instanceof Object)) {
    return from;
  }
  const newForm = {};
  for (const p in from) {
    newForm[p] = to[p] === null ? from[p] : to[p];
  }
  return newForm;
};

export function toThousands(num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}
