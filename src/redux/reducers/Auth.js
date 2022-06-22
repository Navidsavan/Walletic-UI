import {phoneVerfication} from '../actions/AuthConstants';
const intialState = {
  phoneNumber: null,
  isNumberVerified: false,
  userdata: null,
};
export default auth = (state = intialState, action) => {
  if (action.type === phoneVerfication.VERIFY_PHONE) {
    return {...state, phoneNumber: action.payload};
  } else if (action.type === phoneVerfication.VERIFY_CODE) {
    return {...state, isNumberVerified: action.payload.isValid};
  } else if (action.type === phoneVerfication.USER_DATA) {
    return {...state, userdata: action.payload};
  } else if (action.type === 'LOGOUT') {
    return {...state, userdata: null};
  }
  return state;
};
