import {phoneVerfication} from './AuthConstants';
import {baseUrl} from '../../Api/BaseUrl.js';
import { Alert } from 'react-native';

export const fetchBlanceInfo = (userId, token) => {
    return async (dispatch, getState) => {
     
     let url=`${baseUrl}/api/account/user/${userId}`
      try {
        const res =  await fetch(url, {
         method: 'POST',
         body: JSON.stringify({
            "token": token
           
         }),
         headers: {
           'Content-Type': 'application/json; charset=UTF-8',
           
         },
       });
       const data = await res.json();
      
      await dispatch({type: phoneVerfication.ACCOUNT_DATA, payload: data});
       return true;
       
      // return true;
     } catch (err) {
       Alert.alert(
         err.message + "!",
              "Check your network and try again", [
              { text: 'OK' },]
      )
     }
   };
  };

  