import React, {useEffect, useState, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
//import Icon from 'react-native-ionicons'
import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
//npm i react-native-otp-inputs
import OTPInputView from '@twotalltotems/react-native-otp-input';
import color from '../colors/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {verifyCode} from '../redux/actions/Auth';
//import{ LottieView} from 'lottie-react-native';

const dew_Height = Dimensions.get('window').height;
const dew_Width = Dimensions.get('window').width;
const intialState = {
  message: '',
};
const reducer = (state, action) => {
  if (action.type === 'ERROR_HANDLING') {
    return {...state, message: action.payload};
  }
  return state;
};

const OtpScreen = (props) => {
  const phoneNumber= props.route.params.number;
  
  const [otp, setOpt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorState, dispatchFunc] = useReducer(reducer, intialState);
  const nav = useNavigation();
  const state = useSelector(state => state.auth);
  console.log(state);
  const dispatch = useDispatch();
  const verifyOtp = async () => {
    try {
      setLoading(true);
      const status = await dispatch(verifyCode(otp));
      if (status) {
        setLoading(false);
        nav.navigate('SignUpScreen');
      }
    } catch (err) {
      dispatchFunc({type: 'ERROR_HANDLING', payload: err.message});
    }
  };
  useEffect(() => {
    if (errorState.message) {
      Alert.alert('Network Error', errorState.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      setLoading(false);
      dispatchFunc({type: 'ERROR_HANDLING', payload: ''});
    }
  });
  // useEffect(() => {
  //   if (state?.isNumberVerified) {
  //     nav.navigate('SignUpScreen');
  //   }
  // }, [state?.isNumberVerified]);
  // onPress={Keyboard.dismiss}
  return (
    <TouchableWithoutFeedback accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../images/verified.png')}
            style={styles.logo}
          />

          <Text style={styles.OTPtext}>OTP Varification</Text>
          <Text style={styles.enterText}>Enter the OTP sent To</Text>
          <Text style={styles.phoneNumberStyle}>(+92){phoneNumber}</Text>
        </View>

        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <OTPInputView
              style={styles.otpContainer}
              pinCount={4}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              // onCodeFilled={setOpt}
              onCodeChanged={setOpt}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Text style={styles.text}>Didn't receive the OTP? </Text>
              <TouchableOpacity>
                <Text style={styles.resendText}>RESEND OTP </Text>
              </TouchableOpacity>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color={color.primary} />
            ) : otp?.length === 4 ? (
              <TouchableOpacity style={styles.button} onPress={verifyOtp}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.buttonText}>Next</Text>
                  <Icon
                    name="arrow-right"
                    size={RFValue(18, 580)}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}

            {/* {otp?.length === 4 ? (
              <TouchableOpacity style={styles.button} onPress={verifyOtp}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.buttonText}>VERIFY</Text>
                  <Icon
                    name="arrow-right"
                    size={RFValue(18, 580)}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <Text> </Text>
            )} */}

            {// <Button style={styles.goBackButton} title="Go back" onPress={() => nav.goBack()} style={styles.goBackButton} /> 
            
            
            
            <TouchableOpacity style={styles.goBackButton}  onPress={() => nav.goBack()}>
            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
                 <Icon
                name="arrow-left"
                size={RFValue(18, 580)}
                color="white"
              />
              <Text style={styles.buttonText}>Go Back</Text>
             
            </View>
          </TouchableOpacity>}
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  header: {
    flex: 1,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  OTPtext: {
    fontSize: RFValue(20, 580),
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
  },

  enterText: {
    fontSize: RFValue(14, 580),
    color: 'white',
  },

  phoneNumberStyle:{
    fontSize: RFValue(16, 580),
    fontWeight: '800',
    marginTop:5,
    color: 'white',

  },

  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
    paddingHorizontal: 30,
    //marginVertical:20,
    width: dew_Width / 1.2,
    borderRadius: 10,
    height: RFValue(45, 580),
  },
  buttonText: {
    fontSize: RFValue(14, 580),
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 12,
    borderRadius: 15,
    marginHorizontal: 50,
  },
  otpContainer: {
    height: 100,
    // margin:20,
    color: 'black',
    // backgroundColor:'red',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  text: {
    fontSize: RFValue(14, 580),
    marginHorizontal: 10,
  },
  resendText: {
    fontSize: RFValue(13, 580),
    fontWeight: 'bold',
    color: 'red',
  },
  goBackButton:{

    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
    paddingHorizontal: 30,
    //marginVertical:20,
    width: dew_Width / 1.2,
    borderRadius: 10,
    height: RFValue(45, 580),
    marginTop:20

  },

  
});

export default OtpScreen;
