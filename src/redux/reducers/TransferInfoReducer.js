import {transferVarification} from '../actions/AuthConstants';
const intialState = {
  receiverData: null,
 
};
export default receiverInformation = (state = intialState, action) => {
  if (action.type === transferVarification.RECEIVER_INFO) {
   
    return {...state, receiverData: action.payload};

  } 
  else if(action.type === transferVarification.DELETE_RECEIVER_INFO){
    console.log("clear successfully")
    return intialState //{...state, receiverData: null};
  }
  console.log(state)
  return state;

};