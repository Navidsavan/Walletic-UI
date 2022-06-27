import { Alert} from 'react-native';
import {baseUrl} from '../../Api/BaseUrl.js';
import {phoneVerfication, transferVarification} from './AuthConstants';
import LottieView from 'lottie-react-native';

export const TransferAmount =(accountNo, amount, purpose, ) => {
 // console.log("received data on action creator:", accountNo,  amount,  purpose)
  return async( dispatch) => {
    let url=`${baseUrl}/api/account/userVerify/${accountNo}`
    try {
      console.log(url)
      const res = await fetch(url, {
        method: 'GET',
       
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      console.log("res data",data);
     
     
      dispatch({type: transferVarification.RECEIVER_INFO, payload: data});
    
    } catch (err) {
     
      throw new Error('Your request is failed');
    }
  };
};

//////////////////////// ConfirmTransfer ///////////////////////////////
export const ConfirmTransfer =(senderid, recieverid, amount, ) => {
 
   return async( dispatch) => {
     let url=`${baseUrl}/api/account/walleticToWalletic`
     const data={
      "sender_id":senderid,
      "reciever_id":recieverid,
      "amount": amount
     }
     try {
      
       const res = await fetch(url, {
         method: 'POST',
         body: JSON.stringify({
          "data":{
            "sender_id":senderid,
            "reciever_id":recieverid,
            "amount": amount
           }
         
       }),
         headers: {
           'Content-Type': 'application/json; charset=UTF-8',
         },
       });
       const data = await res.json();
      
       if(data.message==="success"){
       
       Alert.alert(
        `Amount Transfer Successfully`,
        data.message,
        [
         
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
     // await dispatch({ type: phoneVerfication.SUBTRACT_BLANCE, payload:amount });
      await dispatch({ type: transferVarification.DELETE_RECEIVER_INFO });
     
       }
       else{
        Alert.alert(
          `Opps`,
          data.message,
          [
           
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        await dispatch({ type: transferVarification.DELETE_RECEIVER_INFO });
       }
      
      
      
     
     } catch (err) {
      
       throw new Error('Your request is failed');
     }
   };
 };
 
//////////////////////////////////// pay by QR ////////////////////////////////





export const TransferByQR =(senderid, recieverid,  ) => {
 
  return async( dispatch) => {
    let url=`${baseUrl}/api/account/walleticToWalletic`
    const data={
     "sender_id":senderid,
     "reciever_id":recieverid,
     "amount": amount
    }
    try {
     
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
         "data":{
           "sender_id":senderid,
           "reciever_id":recieverid,
           "amount": amount
          }
        
      }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
     
      if(data.message==="success"){
      
      Alert.alert(
       `Amount Transfer SuccessFully`,
       data.message,
       [
        
         { text: "OK", onPress: () => console.log("OK Pressed") }
       ]
     );
  
    
      }
      else{
       Alert.alert(
         `Opps`,
         data.message,
         [
          
           { text: "OK", onPress: () => console.log("OK Pressed") }
         ]
       );
      
      }
     
     
     
    
    } catch (err) {
     
      throw new Error('Your request is failed');
    }
  };
};


//////////////////////////////////////////////////////////////
//////////////////////// Bank Transfer ///////////////////////////////
export const BankTransfer =(sender_id, bank_id, amount ) => {
  console.log("sender_id", sender_id,"bank id",bank_id,"amount", amount)
 
  return async( dispatch) => {
    let url=`${baseUrl}/api/account/withdraw`
   /* const data={
     "sender_id":senderid,
     "bank_account_id":bank_id,
     "amount": amount
    }*/
    
    try {
     
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
       
          "account_id":sender_id,
          "bank_account_id":bank_id,
          "amount": amount
          
        
      }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
     console.log(data)
      if(data.message){
      
      Alert.alert(
       `Transfer Successfully`,
       data.message,
       [
        
         { text: "OK", onPress: () => console.log("OK Pressed") }
       ]
     );
    // await dispatch({ type: phoneVerfication.SUBTRACT_BLANCE, payload:amount });
    // await dispatch({ type: transferVarification.DELETE_RECEIVER_INFO });
    
      }
      else{
       Alert.alert(
         `Transfer Failed`,
         data.error,
         [
          
           { text: "OK", onPress: () => console.log("OK Pressed") }
         ]
       );
       //await dispatch({ type: transferVarification.DELETE_RECEIVER_INFO });
      }
     
     
     
    
    } catch (err) {
     
      throw new Error('Your request is failed');
    }
  };
};






//////////////////////// P2P TRANSACTION HISTORY      ///////////////////////////////
export const P2PStatementAction =(userId) => {
 
 
  return async( dispatch) => {
    let url=`${baseUrl}/api/account/bankhistory/${userId}`
  
    
    try {
     
      const res = await fetch(url, {
        method: 'GET',
        
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
    
   
     await dispatch({ type: transferVarification.BANK_STATEMENTS, payload:data });
    // await dispatch({ type: transferVarification.DELETE_RECEIVER_INFO });  
    
    } catch (err) {
     
      throw new Error('Your request is failed');
    }
  };
};

