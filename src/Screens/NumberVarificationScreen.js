import React, {useState, useEffect, useReducer} from 'react';
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
  Alert,
  ActivityIndicator,
  
  BackHandler
} from 'react-native';
import { useBackHandler, exitApp } from '@react-native-community/hooks'
//import Icon from 'react-native-ionicons'
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import color from '../colors/colors';
import {useDispatch, useSelector} from 'react-redux';
// import {phoneVerfication} from '../redux/actions/AuthConstants';
import {verifyPhone} from '../redux/actions/Auth';
import {set} from 'react-native-reanimated';
const dew_Height = Dimensions.get('window').height;
const dew_Width = Dimensions.get('window').width;
import {baseUrl} from '../Api/BaseUrl'

const intialState = {
  message: '',
};
const reducer = (state, action) => {
  if (action.type === 'ERROR_HANDLING') {
    return {...state, message: action.payload};
  }
  return state;
};

const NumberVarificationScreen = (props) => {
  const [errorState, dispatchFunc] = useReducer(reducer, intialState);
  const [phoneNo, setPhoneNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigation();
  const state = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    // validation complete but error handling remains
    const exp = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
    if (!phoneNo) {
      return Alert.alert('Invalid Phone Number', 'Enter a valid Phone Number', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (!exp.test(phoneNo)) {
      return Alert.alert('Invalid Phone Number', 'Enter a valid Phone Number', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    try {
      setLoading(true);
      const status = await dispatch(verifyPhone(phoneNo));
      if (status) {
        setLoading(false);
        nav.navigate('OtpScreen',{
          number:phoneNo
        });
      }
    } catch (err) {
      dispatchFunc({type: 'ERROR_HANDLING', payload: 'your request is failed'});
    }
  };
  console.log('re-renders');
  useEffect(() => {
    if (errorState.message) {
      Alert.alert('Network Error', errorState.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      setLoading(false);
      dispatchFunc({type: 'ERROR_HANDLING', payload: ''});
    }
  });
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
////////////////////////////////////////////////////////////////////////////
useEffect(()=>{
  fetch(baseUrl).then(data=> data.json()).then(value=>console.log(value))

})
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../images/logo1.png')} style={styles.logo} />
        </View>

        <View style={styles.bodyContainer}>
          <ScrollView showsVerticalScrollIndicator={false} >
            <Text style={styles.getText}>Get Started</Text>
            <Text style={styles.text}>Enter Your Mobile Number</Text>

            <View   style={styles.mobileNumberContainer}>
            <View style={{flexDirection:'row'}}>
          
              <Text  style={styles.input}>+92</Text>
            </View>
            <TextInput
              //onChangeText={}
              type="number"
              keyboardType="numeric"
              placeholder={'XXXXXXXXXX'}
              required
              autoFocus={true}
              placeholderTextColor="gray"
              style={styles.input}
              value={phoneNo}
              onChangeText={setPhoneNo}
              maxLength={10}

            />
           </View>
              <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                     {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (<>
                  <Text style={styles.buttonText}>Next</Text>
                  <Icon
                    name="arrow-right"
                    size={RFValue(20, 580)}
                    color="white"
                  /></>
                  )}
                </View>
              </TouchableOpacity>
            <Text style={styles.haveAccountText}>If already have an account ?</Text>
            <TouchableOpacity
              style={{...styles.button}}
              onPress={() => nav.navigate('Login')}>
              <View
                style={{
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={styles.buttonText}>Login</Text>
                <Icon
                  name="user"
                  size={RFValue(20, 580)}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor:'white',
    position:'relative',
  
  },
  header: {
    flex:1,
    width:'100%',
    backgroundColor: color.primary,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
     borderBottomLeftRadius:30,
     borderBottomRightRadius:30,
     position:'relative',
     padding:30

  },
  logo: {
    width: '60%',
    minHeight: "30%",
    height: '30%',
  },
  bodyContainer:{
    flex: 2,
    width:'100%',
    height:'100%',
     backgroundColor: 'white', 
     justifyContent:'center', 
     alignSelf:'center'
  },
  getText: {
    fontSize: RFValue(25, 580),
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: RFValue(13, 580),
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
  },
  mobileNumberContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    width: '90%',
    height: RFValue(45, 580),
    paddingHorizontal:30,
  
    backgroundColor: '#E1E1F5',
    borderRadius: 30,
    fontSize: RFValue(20, 580),
    alignSelf: 'center',
    textAlign:'center',
  
    color: 'black',
    borderWidth: 0.5,
    marginVertical:10,

  },
  input: {
     fontSize: RFValue(16),
    color: 'black',
   
  
  },

  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
    width: '90%',
    height: RFValue(45, 580),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    //marginVertical: 12,
   
    marginHorizontal: 40,
  },
  haveAccountText:{
    fontSize: RFValue(12, 580),
    fontWeight:'bold',
    paddingTop:20,
    color: 'black',
    alignSelf: 'center'
  }
});

export default NumberVarificationScreen;
