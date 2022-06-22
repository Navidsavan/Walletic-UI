import { Alert} from 'react-native';
import {baseUrl} from '../../Api/BaseUrl.js';
import {phoneVerfication, transferVarification} from './AuthConstants';


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
        `Transaction Successful`,
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
       `Transaction Successful`,
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

