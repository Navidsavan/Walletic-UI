import {phoneVerfication,transferVarification} from '../actions/AuthConstants';
const intialState = {
  accountData: null,
 
};
export default AccountInfo = (state = intialState, action) => {
  if (action.type === phoneVerfication.ACCOUNT_DATA) {
    console.log("AccountInfo")
    return {...state, accountData: action.payload};

  } 
  else if(action.type=== transferVarification.SUBTRACT_BLANCE){
    console.log("blance subtracted", accountData)
    return {...state, accountData: action.payload};
  }
  return state;

};


