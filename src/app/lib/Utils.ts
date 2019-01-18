export const createURL = (URL, dataGETParams) => {
  const params = [];
  let paramsStr;
  for (const d in dataGETParams) {
    if (dataGETParams.hasOwnProperty(d)) {
      params.push(encodeURIComponent(d) + '=' + encodeURIComponent(dataGETParams[d]));
    }
  }
  paramsStr = params.join('&');
  return paramsStr.length > 0 ? URL + '?' + params.join('&') : URL;
};
// deep clone for alternative spread/ Object.Assign
export const deepClone = (obj: any) => {
  let copy;
  if (null == obj || 'object' !== typeof obj) {
      return obj;
  }
  if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
  }
  if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
          copy[i] = deepClone(obj[i]);
      }
      return copy;
  }
  if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
          if (obj.hasOwnProperty(attr)) {
              copy[attr] = deepClone(obj[attr]);
          }
      }
      return copy;
  }
};
export const setCookie = (cookieName, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cookieName + '=' + cvalue + ';' + expires + ';path=/';
};
export const getCookie = (cname) => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
      }
  }
  return null;
};
export const delete_cookie = (cookieName) => {
  document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
