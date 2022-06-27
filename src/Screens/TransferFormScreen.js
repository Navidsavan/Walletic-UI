import React, { useRef, useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Modal, Keyboard, ScrollView, Image, Alert, ActivityIndicator } from "react-native";
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-ionicons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import color from "../colors/colors";
import LottieView from 'lottie-react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { TransferAmount, ConfirmTransfer, BankTransfer } from "../redux/actions/TransactionsActions";
import TransferModal from "../Components/TransferModal";
import { transferVarification } from '../redux/actions/AuthConstants';
import CustomAlert from "../Components/CustomAlert";
import { updateBalance } from "../redux/actions/blanceInfoActions";
import {io} from "socket.io-client";



const TransferFormScreen = (props) => {
  const dispatch = useDispatch();
  let  type=props.route.params.type;
  const receiverInfo = useSelector(state => state.receiverInformation.receiverData)
  const senderData =useSelector(state=>state.AccountInfo.accountData)
  console.log("sender data is: ", senderData)

  //////////////////////////////////////// updated blance /////////////////////////////
useEffect(() => {
  const socket = io("http://10.30.0.154:3000");
   
  socket.on("connect", () => {
    console.log(socket.id, 'socket client');
    
    socket.emit("user_id", {user_id: 6})
    socket.on("data", (result)=> {
        console.log("socket blance updated",result)
        dispatch(updateBalance(result));
    }
  )
  })
  })

   console.log(type)
  ////////////////////// component States /////////////////////////////////////
  const [bank, setBank] = useState('');
  const [purpose, setPurpose] = useState('Select');
  const [accountNo, setAccountNo] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [transferModalVisible, setTransferModalVisible] = useState(true)

console.log(bank)

  const pickerRef = useRef();



  function isValidAccountNo(accountNo) {
    const re = /^[-,0-9 ]+$/
    return re.test(String(accountNo))
  }


  function isValidAmount(amount) {
    const re = /^[-,0-9 ]+$/
    return re.test(String(amount))
  }
  /////////////////////////////////////// senHandler ////////////////////////////////////////////////
  const sendHandler = async () => {
    let  sender_id=senderData.account_id
   let  bank_id=bank
    if (!isValidAccountNo(accountNo) || !isValidAmount(amount)) {
      Alert.alert(
        "Invalid Data!",
        "Please enter valid data and try again",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    else {
      try {
        // setLoading(true);
       
        const status = await dispatch(
          TransferAmount(accountNo, amount, purpose)

        );
        
         

      

       
      } catch (err) {
        setLoading(false);
        return Alert.alert('Transfer Failed!', err.message, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

    }
  }
   /////////////////////////////////////// bankTransferHandler ////////////////////////////////////////////////
   const bankTransferHandler = async () => {
    let  sender_id=senderData.account_id
   
    if (!isValidAccountNo(accountNo) || !isValidAmount(amount)) {
      Alert.alert(
        "Invalid Data!",
        "Please enter valid data and try again",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    else {
      try {
        // setLoading(true);
        console.log("bank api called")
          const bankStatus = await dispatch(
            BankTransfer(sender_id, bank, amount)
          )

      

       
      } catch (err) {
        setLoading(false);
        return Alert.alert('Transfer Failed!', err.message, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

    }
  }
  
  ////////////////////////////////////// transferCancelHandler  ////////////////////////////////
  const transferCancelHandler = async () => {
    setTransferModalVisible(false);
    await dispatch({ type: transferVarification.DELETE_RECEIVER_INFO });
    setTransferModalVisible(true);

  }
///////////////////////////////// close alert handler ////////////////////////////////////////////


  const alertCloseHandler=async()=>{
    setTransferModalVisible(false);

    await dispatch({ type: transferVarification.DELETE_RECEIVER_INFO });
    setTransferModalVisible(true);

  }
  ///////////////////////////////// transferConfirmHandler ///////////////////////////////////
  const transferConfirmHandler=async () =>{
    let  senderid=senderData.account_id
    let recieverid=receiverInfo.data.account_id
    try {
      // setLoading(true);
      const status = await dispatch(
        ConfirmTransfer(senderid, recieverid, amount)

      );

     
    } catch (err) {

      return Alert.alert('Transfer Failed!', err.message, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }

  

}
  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* ///////////////////////////////// Transfer modal /////////////////////////////////// */}
        {receiverInfo?
          <Modal
            animationType='fade'
            transparent={true}

            backgroundColor={"blue"}
            visible={transferModalVisible}
            onRequestClose={() => {



            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalBodyContainer}>
                {receiverInfo.message && receiverInfo.message==="success"?
                <TransferModal
                  name={receiverInfo.data.fullname}
                  accountNo={receiverInfo.data.phoneNo}
                  amount={amount}
                  purpose={purpose}
                  onCancelPress={transferCancelHandler}
                  onConformPress={transferConfirmHandler}
                />:<CustomAlert
                message={receiverInfo.message}
                onClosePress={alertCloseHandler}/>}
              </View>

            </View>
          </Modal> : null}
        {/* ///////////////////////////////// Transfer modal end ///////////////////////////// */}
        <View style={styles.headerContainer}>

          <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
            <Icon name='arrow-back' size={RFValue(30, 580)} color="white" style={styles.icon} />
          </TouchableOpacity>

          <View style={{ justifyContent: 'center', width: '100%' }}>
            <Text style={styles.headerText}>Transfer Details</Text>
          </View>
        </View>


        <View style={styles.formContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {type==="bank"?
            <>
          <Text style={styles.inputLabel}>Bank</Text>
          <View style={styles.dropDownStyle}>
              <Picker
                ref={pickerRef}
                mode='dropdown'
                selectedValue={bank}
                onValueChange={(itemValue, itemIndex) => setBank(itemValue)}>
                <Picker.Item label="Select Bank" value="Select" color="gray" paddingHorizontal={20} />
                <Picker.Item label="Meezan Bank" value={1} />
                <Picker.Item label="United Bank Limited" value={3} />
                <Picker.Item label="National Bank of Pakistan" value={4} />
               
              </Picker>

            </View>
              </>:null}
            <Text style={styles.inputLabel}>Receiver Account  Number</Text>
            <View style={[styles.inputView, {
              borderWidth: 1, borderColor: !isValidAccountNo(accountNo) && accountNo.length > 0 ? "red" : "silver", borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }]}>

              <TextInput
                style={[styles.input]}
                placeholder='03XXXXXXXXX'
                textContentType='password'
                autoFocus={true}
                keyboardType='numeric'
                onChangeText={(value) => setAccountNo(value)}
              />
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => {

                }}>


                <Icon name='contact' type='font-awesome-5' size={RFValue(40, 580)} color="white" />


              </TouchableOpacity>
            </View>


            <Text style={styles.inputLabel}>Amount</Text>
            <View style={[styles.inputView, { borderWidth: 1, borderColor: !isValidAmount(amount) && amount.length > 0 ? "red" : "silver", }]}>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setAmount(value)}
                placeholder='Enter Amount in PKR'
                keyboardType='numeric'


              />

            </View>
            <Text style={styles.inputLabel}>Purpose</Text>
            <View style={styles.dropDownStyle}>
              <Picker
                ref={pickerRef}
                mode='dropdown'
                selectedValue={purpose}
                onValueChange={(itemValue, itemIndex) => setPurpose(itemValue)}>
                <Picker.Item label="Select" value="Select" color="gray" paddingHorizontal={20} />
                <Picker.Item label="Education" value="Education" />
                <Picker.Item label="Business" value="Business" />
                <Picker.Item label="Loan" value="Loan" />
                <Picker.Item label="Other" value="Other" />
              </Picker>

            </View>
            {type==="wallet"?
            <TouchableOpacity style={styles.sendButton} onPress={sendHandler}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :

                <Text style={styles.sendText}>Send</Text>
              }
            </TouchableOpacity>:
           
            <TouchableOpacity style={styles.sendButton} onPress={bankTransferHandler}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :

                <Text style={styles.sendText}>Send</Text>
              }
            </TouchableOpacity>}
          </ScrollView>
        </View>

      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: color.primary,


  },

  headerContainer: {

    backgroundColor: color.primary,
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    paddingRight: 20,
    paddingHorizontal: 20,
    paddingVertical: 20



  },
  formContainer: {
    flex: 3,
    //  marginHorizontal: 20,
    // marginVertical:30,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    paddingVertical: 20,




  },
  headerText: {
    fontSize: RFValue(18),

    width: '100%',
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
  },



  inputView: {
    width: '90%',
    height: RFValue(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // justifyContent: 'flex-start',
    marginTop: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    //borderWidth:1,
    //borderColor: color.primary,
    borderRadius: 4,



    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,

    elevation: 10,



  },
  dropDownStyle: {
    height: RFValue(45),
    justifyContent: 'center',
    // justifyContent: 'flex-start',
    marginTop: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    //borderWidth:1,
    //borderColor: color.primary,
    borderRadius: 4,


    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,

    elevation: 10,


  },
  inputLabel: {
    fontSize: RFValue(16),
    marginTop: 6,
    marginHorizontal: 20,
    fontWeight: '600',
    color: 'black'
  },
  input: {
    fontSize: RFValue(16),
    height: RFValue(45),
    paddingHorizontal: 20,
    color: "black",

  },

  contactButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#EF862F',
    height: '100%',
  },
  purposeInput: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth:1,
    // borderColor: color.primary,
    marginTop: 10,
    // backgroundColor: '#E1E1F5',
    marginHorizontal: 20,
    paddingBottom: 50,
    marginBottom: 30,
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

    marginHorizontal: 20,

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
  //////////////////////////////////// modal info style //////////////////////////
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',

    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignSelf: 'center'
  },
  modalBodyContainer: {


    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 5


  },
})
export default TransferFormScreen;