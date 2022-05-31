import Cookies from 'js-cookie';

export const formatNumber = (value, type) => {
  if (!value) return 0;
  if (type === 'number') {
    return value.toFixed(2);
  }
  return 0;
};

export const setAccess = (access) => Cookies.set('nt-access', access);
export const setRefresh = (refresh) => Cookies.set('nt-refresh', refresh);
export const getAccess = () => Cookies.get('nt-access');
export const getRefresh = () => Cookies.get('nt-refresh');
export const cleanToken = () => {
  Cookies.remove('nt-access');
  Cookies.remove('nt-refresh');
};
