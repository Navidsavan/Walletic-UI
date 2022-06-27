import {transferVarification} from '../actions/AuthConstants';
const intialState = {
  bankStatementsData: null,
 
};
export default bankStatements = (state = intialState, action) => {
  if (action.type === transferVarification.BANK_STATEMENTS) {
   
    return {...state, bankStatementsData: action.payload};

  } 
 /* else if(action.type === transferVarification.DELETE_RECEIVER_INFO){
    console.log("clear successfully")
    return intialState //{...state, receiverData: null};
  }
  console.log(state)*/
  return state;

};