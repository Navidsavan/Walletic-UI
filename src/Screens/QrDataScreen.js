
import {ToastAndroid, View,  Text,  StyleSheet, Dimensions,Alert, Button, Modal, Pressable,Image, TouchableOpacity} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {onReadSuccess, ModalToggle} from  '../redux/actions/QrActions';
import {TransferByQR} from '../redux/actions/TransactionsActions'
import React from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Icon from "react-native-ionicons";
import color from "../colors/colors";
import axios from 'axios';
import { baseUrl } from '../Api/BaseUrl';
import { askAndroid } from 'react-native-clean-project/source/internals/options';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const QrDataScreen = (props) => {

    const dispatch = useDispatch();

    const qrDataState  = useSelector(state => state.QrScannerReducer.qrData)
    const data = JSON.parse(JSON.parse(qrDataState));
    const sender_id = useSelector(state => state.AccountInfo.accountData.account_id);
    const {reciever_id, amount} = data

    const transferBtnHandler = (reciever_id, sender_id, invoiceAmt) => {
        if(sender_id == reciever_id) {
            ToastAndroid.show("user and reciever cant be same", ToastAndroid.LONG)
        }
        axios.post(`${baseUrl}/api/account/walleticToWalletic`, { 
             data: {
                sender_id: sender_id,
                reciever_id: reciever_id,
                amount: invoiceAmt
            }
        }).then((req, res) => {
            console.log(res)
            //  ToastAndroid.SHORT(res.message)
            Alert.alert(
                `Transfer Successfully`,
                res.message,
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
              
             
        }).catch((err) => {
            console.log(err.message)
            // ToastAndroid.SHORT(err.message)
            Alert.alert(
                err.message,
                
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }); 
    }
   

    const transferConfirmHandler=async () =>{
        let  senderid=6
        let recieverid=6
        try {
          // setLoading(true);
          const status = await dispatch(
            TransferByQR(senderid, recieverid)
    
          );
    
         
        } catch (err) {
    
          return Alert.alert('Transfer Failed!', err.message, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
    
      
    
    }

    return (
        <View style = {styles.container}>
            <View style={styles.headerContainer}>
            <TouchableOpacity style={{paddingLeft:20}} onPress={()=>props.navigation.goBack(null)}>
                        <Icon  name='arrow-back'  size={RFValue(30)} color="white" style={styles.icon} />                
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Receiver Information</Text>
            </View>
            <View style={styles.detailContainer}>
            <View style= {styles.details}>
                <Text style={styles.inputLabel}>Receiver Account Number</Text>
                <Text style={styles.text}>{data.orderId}</Text>

                <Text style={styles.inputLabel}>Amount</Text>
                <Text  style={styles.text}>{data.amount}</Text>
                <Text style={styles.inputLabel}>Purpose</Text>
                <Text  style={styles.text}>{data.purpose}</Text>
            </View>
            <View style= {styles.btnView}>
                
            <TouchableOpacity style={styles.sendButton} onPress={()=> {
                transferBtnHandler(reciever_id , sender_id, amount);
            }}>
                            <Text style={styles.sendText}>Transfer Now</Text>
                        </TouchableOpacity>
            </View>
            </View>
        </View>
    )
} 

export default QrDataScreen


const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        flex: 7,
        backgroundColor: color.primary,
        
      },
      details: {
         width:'90%',

         justifyContent:'center',
         alignContent:'center',
         alignSelf:'center',
          paddingVertical:20,
          flex: 0.5,
         marginVertical:30

      }, 
     
    headerContainer:{
        flex: 1,
        backgroundColor: color.primary,
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
         paddingRight:20,
      
       
       // width: '100%',
      
  

    },
    headerText:{
        fontSize: RFValue(18),
        fontWeight:'900',
        color:'white',
        textAlign:'center',
        width:'100%',
        


    },
    btnView:{
        marginVertical:20

    },
    detailContainer:{
        flex:5,
       borderTopEndRadius:30,
       borderTopLeftRadius:30,
      // marginHorizontal:"2%",
       backgroundColor: 'white'
      
    },
      sendButton: {
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        height: RFValue(45),
        backgroundColor: color.primary,
        marginVertical: 30,
        width: "90%",
      //  marginHorizontal:20,
       
        paddingVertical: 10,
       
        borderRadius: 5,

    },
    inputLabel: {
        fontSize: RFValue(14),
        marginTop: 6,
        fontWeight: '600',
        color: 'black',marginVertical:10,
        paddingTop:5
    },
    text:{
        fontSize: RFValue(14),
        backgroundColor: 'white',
        paddingLeft:20,
        color:'black',
        paddingVertical:10,
        paddingHorizontal:5,
        width: "100%",
        borderRadius:4,
        borderWidth:1,
        borderColor:'silver',
       fontWeight: '500',
        shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    
      elevation: 5,
    
      },
      sendText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: RFValue(14),
        fontWeight: 'bold',
    },
   

  
})