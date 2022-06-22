import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Rect } from 'react-native-svg';
import React from 'react';
import {View,  Text,  StyleSheet, modal} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {onReadSuccess, QrDataSave, ModalToggle} from  '../redux/actions/QrActions' 
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue as rfv } from "react-native-responsive-fontsize";
import axios from 'axios';
import color from '../colors/colors';
 
   const QRCodeScannerScreen = () => { 

    const dispatch = useDispatch()

    const nav = useNavigation();

    const state = useSelector(state => state.QrScannerReducer );

     console.log(state)

    const onSuccess = e => {
      dispatch(onReadSuccess(e.data))
      // setTimeout(() => {
        // console.log("state", state)
        console.log(e.data)
        nav.navigate("QrDataScreen");
      // }, 1000)
      };



      // Scanner screen styling and content, currently a placeholder

    const topContent = () => {
      state.qrCodeStatus == "success" ?  
      (<Text>{state.qrCodeStatus}</Text>) :
            <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
          
      }

    
        return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Text style={styles.qrTitle}>Please Scan  QR Code</Text>
      </View>
      <View style={styles.qrContainer}>
     <QRCodeScanner
        reactivate={true}
       
        reactivateTimeout={2000}
        onRead={onSuccess}
        showMarker={true}
        topContent={topContent()} />
        </View>
          </View>
          
        );
      }


    export default QRCodeScannerScreen;


    const styles = StyleSheet.create({
      container:{
         flex: 8, 
         flexDirection: 'column', 
         justifyContent: 'center',
         width:"100%" ,
         backgroundColor:color.primary,
         height:"100%"
      },
      headerContainer:{
        flex: 2, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems:'center',
        alignContent:'center' ,
        backgroundColor:color.primary,
       
       
      },
      qrContainer:{
         flex:6, 
         flexDirection: 'column', 
         justifyContent: 'center',
         height:'100%', 
        
      },
      qrTitle:{
        color:'white',
        fontSize:rfv(18),
       fontWeight:"bold",
        textAlign:'center',
        alignSelf:'center'
      },
        qrCodeStyle: {
          justifyContent:'center',
          alignContent: 'center',
          flexDirection: 'row'
        }, 
        header: {
          marginVertical: '5%',
        },
        sectionContainer: {
          marginTop: 32,
          paddingHorizontal: 24,
        },
        sectionTitle: {
          fontSize: 24,
          fontWeight: '600',
        },
        sectionDescription: {
          marginTop: 8,
          fontSize: 18,
          fontWeight: '400',
        },
        highlight: {
          fontWeight: '700',
        },
       
      });
