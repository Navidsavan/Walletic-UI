import React, {useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {dispatch, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchBlanceInfo} from "../redux/actions/blanceInfoActions"
const SwicherScreen = () => {
  const nav = useNavigation();
  const dispatch=useDispatch();
  AsyncStorage.getItem('user_data')
    .then(jsonValue => {
      if (jsonValue != null) {
        jsonValue = JSON.parse(jsonValue);
       
        // formate of jwt exp
        // The number is the number of seconds since Jan 1 1970
        if (jsonValue.token) {
          const date = new Date();
          const currentTimeMs = date.getTime();
          const futureExpTimeMs = jsonValue.exp * 1000;
        // dispatch(fetchBlanceInfo(jsonValue.user_id, jsonValue.token));
          nav.navigate('HomeScreen');
          //   console.log(futureExpTimeMs, '1');
          //   console.log(currentTimeMs, '2');
          if (futureExpTimeMs >= currentTimeMs) {
            //load data to reduxstore
            dispatch({type: 'USER_AUTH_INFO', payload: jsonValue});
            nav.push('HomeScreen');
          } else {
            nav.navigate('Auth');
            AsyncStorage.clear().then(() => {
              consle.log('storate cleared successfully');
            });
          }
        } else {
          nav.navigate('Auth');
        }
      } else {
        nav.navigate('Auth');
      }
    })
    .catch(err => {
      console.log(err);
    });

  return <></>;
};

export default SwicherScreen;
