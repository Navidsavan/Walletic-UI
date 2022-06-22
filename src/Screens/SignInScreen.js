import React, { useState, useReducer } from 'react';
import Regex from '../Extras/Regex';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  BackHandler, 
  
} from 'react-native';
import { useBackHandler, exitApp } from '@react-native-community/hooks'
//import Icon from 'react-native-ionicons'
import Icon from 'react-native-vector-icons/FontAwesome';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
//npm i react-native-otp-inputs
import OTPInputView from '@twotalltotems/react-native-otp-input';
import color from '../colors/colors';
import { login } from '../redux/actions/Auth';

const dew_Height = Dimensions.get('window').height;
const dew_Width = Dimensions.get('window').width;
const intialState = {
  username: { uname: '', isValid: false, isFocused: false },
  password: { pass: '', isValid: false, isFocused: false },
  isAllValid: { isValid: false, isFocused: false },
};
const reducer = (state, action) => {
  if (action.type === 'USERNAME_STATE') {
    let isValid = false;
    const phoneRegex = Regex.phoneRegex;
    const isValidPhoneNo = phoneRegex.test(action.payload);
    const emailRegex = Regex.emailRegex;
    const isValidEmailAddress = emailRegex.test(action.payload);
    if (isValidEmailAddress || isValidPhoneNo) {
      isValid = true;
    } else {
      isValid = false;
    }
    return {
      ...state,
      username: { ...state.username, uname: action.payload, isValid: isValid },
    };
  } else if (action.type === 'USERNAME_FOCUSED') {
    return { ...state, username: { ...state.username, isFocused: true } };
  } else if (action.type === 'PASSWORD_VALIDATE') {
    // console.log(action.payload);
    const passwordRegex = Regex.passwordRegex;
    const isValid = passwordRegex.test(action.payload);
    return {
      ...state,
      password: { ...state.password, pass: action.payload, isValid },
    };
  } else if (action.type === 'PASSWORD_FOCUSED') {
    return {
      ...state,
      password: { ...state.password, isFocused: true },
    };
  } else if (action.type === 'VALIDATE_ALL') {
    let isValid = true;
    let j = 0;
    for (let i in state) {
      // increase the number if you increase the input field
      if (j != 2) {
        console.log(state[i].isValid, 'isValid');
        isValid = isValid && state[i].isValid;
      }
      j++;
    }
    console.log(isValid, 'isValididity');
    return { ...state, isAllValid: { ...state.isAllValid, isValid: isValid } };
  }
  return state;
};
const SignInScreen = (props) => {
  const dispatchRedux = useDispatch();
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  const [state, dispatch] = useReducer(reducer, intialState);
  const [passwordSecured, setPasswordSecured]=useState(true);
  console.log(state);

  const signIn = async () => {
    if (!state.isAllValid.isValid) {
      return Alert.alert(
        'Invalid Login Credentials',
        'Enter a valid Phone Number/Email and password',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      );
    } else {
      try {
        setLoading(true);
        const status = await dispatchRedux(
          login(state.username.uname, state.password.pass),
        );
        if (status) {
          nav.navigate('HomeScreen');
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        return Alert.alert('Login Failed!', err.message, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
  };
  // onPress={Keyboard.dismiss}
  ///////////////////////Back handler to handler back button press///////////////////
  const backActionHandler = () => {
    Alert.alert('Are You Sure!', 'Do you want to exit App?', [
        {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
};
useBackHandler(backActionHandler);
//////////////////////////////////////////////////////////////////////////////////////////
  return (
    <TouchableWithoutFeedback accessible={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerSection}>
            <View style={styles.lockContainer}>
              <Icon name='lock' color={color.primary} size={RFValue(70)}/>
            </View>
           {/* <Image
              source={require('../images/signin.png')}
              style={styles.logo}
  />*/}
            <Text style={styles.welcomeText}>Sign In</Text>
          </View>
          <View style={styles.formContainer}>
           

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email/Phone Number</Text>
              <View style={styles.inputView}>
                             <Icon color='#333' name='user' type='font-awesome' size={20}/>  
              <TextInput
                style={styles.input}
                placeholder="Enter Email/Phone"
                keyboardType="email-address"
                textContentType="name"
                onChangeText={val => {
                  dispatch({ type: 'USERNAME_STATE', payload: val });
                  dispatch({ type: 'VALIDATE_ALL' });
                }}
                onBlur={() => dispatch({ type: 'USERNAME_FOCUSED' })}
                value={state.username.uname}
              />
               </View>
              {!state.username.isValid && state.username.isFocused ? (
                <Text style={styles.errorText}>
                  Your Email or Phone is Invalid{' '}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputView}>
                                <Icon color='#333' name='lock' type='font-awesome' size={20} />
              <TextInput
                style={styles.input}
                secureTextEntry={passwordSecured}
                placeholder="Enter Password.."
                textContentType="password"
                value={state.password.pass}
                // onchangeText={val =>
                //   dispatch({type: 'PASSWORD_VALIDATE', payload: val})
                // }
                onChangeText={val => {
                  dispatch({ type: 'PASSWORD_VALIDATE', payload: val });
                  dispatch({ type: 'VALIDATE_ALL' });
                }}
                onBlur={() => dispatch({ type: 'PASSWORD_FOCUSED' })}
              />
             

                           <TouchableOpacity 
                                        //style={{marginRight:100}}
                                         onPress={()=>{
                                        setPasswordSecured(!passwordSecured);
                                    }}>
                                      <Icon name='eye' type='font-awesome-5' size={20} />

                </TouchableOpacity>
               
            </View>
            {!state.password.isValid && state.password.isFocused ? (
                <Text style={styles.errorText}>Your password is invalid</Text>
              ) : (
                <Text></Text>
              )}
            </View>
            
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => signIn()}>
                  {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>




            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              <Text style={styles.forgetText}>Forgot Password?</Text>
              <TouchableOpacity style={{ margin: 10 }}>

                <Text style={styles.resetButtonText}>Rest Now</Text>

              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
              <Text style={styles.forgetText}>If account does not exist ?</Text>

              <TouchableOpacity style={{ margin: 10 }} onPress={() => props.navigation.navigate('Auth')}>

                <Text style={styles.resetButtonText}>Sign Up</Text>

              </TouchableOpacity>
            </View>
          </View>


        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-between'

  },
  headerSection: {
     flex: 2,
    width: '100%',
    height: '100%',
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingVertical:40,
    backgroundColor: color.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  welcomeText: {
    fontSize: RFValue(20, 580),
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  formContainer: {
    flex: 3,
    backgroundColor: 'white',
    marginTop: 20,
    margin: "3%",
    height: '100%',
    padding: "5%",
    borderRadius: 10,
  },

  loginTitleText: {
    fontSize: RFValue(15, 580),
    color: 'black',
    fontWeight: 'bold',
    marginTop: 0,
    marginLeft: 5
  },


  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    margin: 10,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: RFValue(12, 580),
    fontWeight: 'bold',
    marginBottom: 6,
    color: 'black',
    marginLeft: 5
  },
  input: {
    width: '100%',
    height: RFValue(45, 580),
    fontSize: RFValue(10, 580),
    paddingHorizontal: 15,
    //borderWidth: 1,
    backgroundColor: '#E1E1F5',
    borderRadius: 30,
    //paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: color.primary,
    height: RFValue(45, 580),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(14, 580),
    fontWeight: 'bold',
  },
  forgetText: {
    fontSize: RFValue(12, 580),
    alignSelf: 'center',
    color: 'black',
    fontWeight: '500'
  },
  resetButtonText: {
    fontSize: RFValue(12, 580),
    alignSelf: 'center',
    color: color.primary,

    fontWeight: 'bold'

  },
  errorText: {
    color: 'red',
    fontSize: RFValue(10, 580),
    paddingLeft: 20
  },


  inputView:{
    width: '100%',
    height: RFValue(45, 580),
    backgroundColor: '#E1E1F5',
    paddingHorizontal: 25,
   paddingRight:50,
    //justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 30,
   
},
lockContainer:{
  backgroundColor:"white",
  height: dew_Height/6,
  width:  dew_Height/6,
  borderRadius: 100,
   justifyContent:'center',
   alignSelf:'center',
   alignItems:'center',
   borderWidth:3,
   borderColor:'silver'
   
}

});

export default SignInScreen;
