import {phoneVerfication} from './AuthConstants';
import {baseUrl} from '../../Api/BaseUrl.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const verifyPhone = phoneNumber => {
  //   verifying phone number and delivering msg on mobile
  return async dispatch => {
    try {
      const res = await fetch(`${baseUrl}/api/auth/verify/phone`, {
        method: 'POST',
        body: JSON.stringify({
          phoneNo: `+92${phoneNumber}`,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (res.status != 200) {
        throw new Error('your request is failed');
      } else {
        // success
        dispatch({type: phoneVerfication.VERIFY_PHONE, payload: phoneNumber});
        return true; // to suggest ready to navigate
      }
    } catch (err) {
     
      throw new Error('Your request is failed');
    }
  };
};

// verifying the otp code associated with that number

export const verifyCode = otpCode => {
  return async (dispatch, getState) => {
    // console.log(getState().auth.phoneNumber, 'state');
    try {
      const phoneNumber = getState().auth.phoneNumber;
      console.log(phoneNumber);
      const res = await fetch(`${baseUrl}/api/auth/verify/code`, {
        method: 'POST',
        body: JSON.stringify({
          code: otpCode,
          phoneNo: `+92${phoneNumber}`,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      // console.log(res.status);
      // console.log(res);
      const data = await res.json();
      if (!data.verification_check.valid) {
        throw new Error('Your request is not failed!');
      }

      const result = {isValid: data.verification_check.valid};
      // console.log(result);
      dispatch({type: phoneVerfication.VERIFY_CODE, payload: result});
      return true;
    } catch (err) {
      throw new Error('Your request is failed!');
    }
  };
};
// fullname, email, phoneNumber, password, role
export const signUp = (fullname, email, password, role) => {
  return async (dispatch, getState) => {
    const phoneNumber = getState().auth.phoneNumber;
    // const phoneNumber = '3332176508';
    console.log('signup');
    try {
      const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({
          fullname,
          email,
          password,
          phoneNumber,
          role,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();

      console.log(data, 'daa');
      if (res.status !== 200 && data?.error) {
        throw new Error(data.error);
      } else if (res.status !== 200) {
        throw new Error('Something went wrong!');
      }

      storeData(data);
      dispatch({type: phoneVerfication.USER_DATA, payload: data});
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

export const login = (username, password) => {
  return async (dispatch, getState) => {
    // const phoneNumber = getState().auth.phoneNumber;

    console.log('login');
    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      // console.log(res, 'res');
      // console.log(data, 'message');
      if (res.status !== 200 && data?.error) {
        throw new Error(data.error);
      } else if (res.status !== 200) {
        throw new Error('Something went wrong!');
      }
      storeData(data);
     
      dispatch({type: phoneVerfication.USER_DATA, payload: data});
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user_data', jsonValue);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
