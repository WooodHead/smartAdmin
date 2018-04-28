import axios from 'axios';

export const CAT_DATA = 'CAT_DATA';
export const SELECTED_ITEM = 'SELECTED_ITEM';
export const SELECT_ALL = 'SELECT_ALL';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export function catData({ url, params }) {
  const { countSkip, pageSize } = params;
  return async dispatch => {
    let req = null;
    let res = null;
    try {
      req = await axios.get(`${url}?countSkip=${countSkip}&pageSize=${pageSize}&orderBy=ASC`);
      res = req.data || [];
    } catch (e) {
      console.log(e);
      res = [];
    }
    res.countSkip = countSkip;
    res.pageSize = pageSize;
    return dispatch({
      type: CAT_DATA,
      data: res
    })
  }
}

export function selectedElement(checked, el) {
  return dispatch => dispatch({ type: SELECTED_ITEM, data: { checked, el } });
}

export function selectAll(data) {
  return dispatch => dispatch({ type: SELECT_ALL, data });
}

export function removeItem(url, id) {
  return async dispatch => {
    let req = null;
    try {
      req = await axios.delete(`${url}?id=${id}`, configs);
      msg = req.data.messageCode
    } catch (e) {
      msg = 'Something went wrong';
    }
    return dispatch({
      type: REMOVE_ITEM,
      data: { msg }
    })
  }
}
