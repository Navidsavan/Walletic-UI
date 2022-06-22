import React, {useState, useReducer, useRef} from 'react';
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
  ActivityIndicator,
  Keyboard,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import color from '../colors/colors';
import {useSelector, useDispatch} from 'react-redux';
import {signUp} from '../redux/actions/Auth';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {qrDataFormCreate} from "../redux/actions/QrActions"
import Icon from "react-native-ionicons";


const QrDataForm = (props) => {

  const account_id = useSelector(state =>  state.AccountInfo.accountData.account_id)

const [account, setAccount]=useState('');
const [amount, setAmmount]=useState('');
const [purpose, setPurpose]=useState('');
    const dataObj2 = {
        orderId: 16272,
        amount: 20000,
        purpose: "hellow", 
        walletId: phoneNumber
    }

    const dataObj = {
        orderId: account,
        amount: amount,
        purpose: purpose, 
        reciever_id: account_id 
        
    }
 
    console.log(dataObj)
    const dispatch = useDispatch();

    const nav = useNavigation()

    // to store phone number as wallet id in qrGeneration

    const {phoneNumber} = useSelector(state => state.auth)
 
/////////////////////////// Input Validation //////////////////////
function isValidAccountNo(account) {
    const re = /^[-,0-9 ]+$/
    return re.test(String(account))
  }
  

  function isValidAmount(amount) {
    const re = /^[-,0-9 ]+$/
    return re.test(String(amount))
  }
//////////////////////////////////////////////////////////////////

    const onSubmit = () => {
        if(!isValidAccountNo(account) || !isValidAmount(amount) || purpose.length<5){
            Alert.alert(
                "Invalid Data!",
                "Please enter valid data and try again",
                [
                  
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }

      else {
            ToastAndroid.show("success", ToastAndroid.SHORT)
            dispatch(qrDataFormCreate(dataObj))
            nav.navigate("QrGeneration")
        }
    }

    return (
    
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
          <View  style={styles.headerContainer}>
         
          <TouchableOpacity  onPress={()=>props.navigation.navigate("Home")}>
                        <Icon  name='arrow-back'  size={RFValue(30, 580)} color="white" style={styles.icon} />                
                    </TouchableOpacity>
                   
                    <View style={{justifyContent:'center', width:'100%'}}>
                <Text style={styles.headerText}>Generate QR Code</Text>
                </View>
          </View>


          <View style={styles.formContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.loginTitleText}>Enter  Details</Text>
                <View style={styles.hr}></View>

                    <View style={[styles.inputView]}>
                    <Text style={styles.inputLabel}>Account Number</Text>
                    <TextInput
                    style={[styles.input, {borderColor: !isValidAccountNo(account) && account.length>0?"red":"silver"}]}
                    placeholder="xxxxxxxxxxxxx"
                    keyboardType="decimal-pad"
                    textContentType="name"
                    onChangeText={(val) => {
                       setAccount(val)
                    }}
                    />
                </View>

                    <View style={styles.inputView}>
                        <Text style={styles.inputLabel}>Amount </Text>
                        <TextInput
                        style={[styles.input,{borderColor: !isValidAmount(amount) && amount.length>0?"red":"silver"}]}
                        placeholder="Amount"
                        keyboardType="number-pad"
                        textContentType="name"
                        onChangeText={(val) => {
                           setAmmount(val)
                        }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text style={styles.inputLabel}>Purpose </Text>
                        <TextInput
                        style={[styles.input,{borderColor: purpose && purpose.length<5?"red":"silver"}]}
                        placeholder="Purpose"
                        keyboardType="default"
                        textContentType="name"
                        onChangeText={(val) => {
                            setPurpose(val)
                        }}
                        />
                    </View>
               
                  <TouchableOpacity
                   style={styles.sendButton}
                    onPress={() => {
                      onSubmit();
                    }}
                    >
                    <Text style={styles.sendText}>Submit</Text>
                  </TouchableOpacity>
                  </ScrollView>
                  </View>
      
      </View>
      </TouchableWithoutFeedback>
  )
}

const styles=StyleSheet.create({
  container:{
      flex:4,
     backgroundColor: color.primary,
     
     
  },

  headerContainer:{
     
      backgroundColor: color.primary,
      justifyContent: 'space-between',
      textAlign: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'row',
       paddingRight:20,
       paddingHorizontal:20,
       paddingVertical:20
    
     
     // width: '100%',
    


  },
  formContainer:{
      flex:3,
    //  marginHorizontal: 20,
   // marginVertical:30,
     backgroundColor: 'white',
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
     paddingVertical:20,
    
    
    
   
  },
  headerText:{
    fontSize: RFValue(18, 580),
    fontWeight:'bold',
    color: 'white',
    textAlign: 'center',
  },

  loginTitleText: {
    fontSize: RFValue(16, 580),
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal:20
  },

 
  
  inputView:{
      width: '90%',
      //height: RFValue(45, 580),
      flexDirection: 'column',
      justifyContent: 'space-between',
    // justifyContent: 'flex-start',
      marginTop: 10,
      backgroundColor: 'white',
      marginHorizontal:20,
     
    

      
    


     
  },
  inputLabel: {
      fontSize: RFValue(16),
      fontWeight: '600',
      color: 'black'
  },
  input: {
     fontSize:RFValue(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: RFValue(45),
    color:"black",
   paddingHorizontal:20,
   marginTop:5,
   borderWidth:1,
   borderColor:'silver',
    borderRadius: 4,
    shadowColor: 'gray',

    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,
  
    elevation: 1,

  },
  contactButton:{
      justifyContent: 'center',
       alignItems: 'center',
       paddingHorizontal:10,
       backgroundColor: '#EF862F',  
       height: '100%',
  },
  purposeInput:{
      width: '90%',
    
      flexDirection: 'row',
      justifyContent: 'space-between',
     // borderWidth:1,
     // borderColor: color.primary,
      marginTop: 10,
     // backgroundColor: '#E1E1F5',
      marginHorizontal:20,
      paddingBottom:50,
      marginBottom:30,
     // marginVertical:30,
     // height:'30%',
    
     
      borderRadius: 4,
      shadowColor: 'gray',

      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8.84,
    
      elevation: 2,


  },
  logo: {
      width: '80%',
      height: '70%',
    },

  sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      height: RFValue(45),
      backgroundColor: color.primary,
      marginTop: 20,

      marginHorizontal:20,
     
      paddingVertical: 10,
     
      borderRadius: 5,


      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8.84,
    
      elevation: 8,
  },
  sendText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: RFValue(14),
      fontWeight: 'bold',
  },
})


  export default QrDataForm;