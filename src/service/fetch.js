
import axios from 'axios'
import {filterData} from '../service/utils';
import Qs from 'qs'

let appendQuery =  (url, query, base = '') => {
    let str = '';
    for (let key in query) {
      if (key == 'returnUrl') {
        str += `${key}=${encodeURIComponent(query[key])}&`;
      } else {
        str += `${key}=${query[key]}&`;
      }
    }
    let origin = window.location.origin;
    return `${origin}${base}${url}?${str}`.slice(0, -1);
  };

export const request = (params) => {
    let that = this;
    let xhr = new XMLHttpRequest();
    params.data = params.data || {};
    let url = that.appendQuery(params.url, params.data);
    return new Promise(function (resolve, reject) {
      xhr.open('GET', url, true);
      xhr.timeout = 2000;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 304) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.ontimeout = function () {
        // XMLHttpRequest timed out.
        reject('请求超时');
      };
      xhr.send(null);
    });
  }

export const fetch  = (params) => {
    filterData(params.data || {});
    return new Promise(function (resolve, reject) {
      let method = params.method ? params.method.toLowerCase() : 'get';
      let o = {
        url: params.url,
        baseURL: '',
        method: method,
        timeout: params.timeout || 1000000,
        headers: params.headers || {
          'Content-Type': 'text/html; charset=UTF-8',
          'Accept': 'application/json, text/plain, */*'
        }
      }
      if (method === 'post') {
        o.data = params.data || '';
        o.data  = Qs.stringify(o.data);
      } else {
        o.params = params.data || {};
      }
      axios(o).then((res) => {
        let data = res.data;
        resolve(data);
      }).catch((res) => {
        reject(res);
      });
    });
  }
