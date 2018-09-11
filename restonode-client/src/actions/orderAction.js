import * as actionTypes from './actionTypes';

export const fetchCreateOrderSuccess = order => ({
    type: actionTypes.CREATE_NEW_ORDER,
    order: order
});

export const createOrder = (order) => {
    return dispatch => {
      return fetch("http://localhost:3001/api/order/", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
        })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          dispatch(fetchCreateOrderSuccess(json));
          return json;
        })
    };
};
  
function handleErrors(response) {
    if (!response.ok) {
        console.error(response);
        throw Error(response.statusText);
    }
    return response;
}