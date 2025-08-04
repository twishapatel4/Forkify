import { TIMEOUT } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long to proceed!Timeout after ${s} seconds`)
      );
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    //const res = await Promise.race([fetch(url), timeout(TIMEOUT)]);
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
