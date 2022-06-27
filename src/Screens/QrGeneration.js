/*
import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import Share from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';
import {useSelector, useDispatch} from 'react-redux';
import color from '../colors/colors';
import { RFPercentage, RFValue as rfv } from "react-native-responsive-fontsize";
import Icon from 'react-native-ionicons';


const App = (props) => {

  
 
 const qrDataState = useSelector(state => state.QRCodeGenerationReducer.orderDetails)
 const account_id = useSelector(state =>  state.AccountInfo.accountData.account_id)


 console.log(qrDataState)

 const qrData = JSON.stringify(JSON.stringify(qrDataState)) 
    
    return (
      <View style={styles.container}>
        <View  style={styles.headerContainer}>
         
         <TouchableOpacity  onPress={()=>props.navigation.navigate("Home")}>
                       <Icon  name='arrow-back'  size={rfv(30)} color="white" style={styles.icon} />                
                   </TouchableOpacity>
                  
                   <View style={{justifyContent:'center', width:'100%'}}>
               <Text style={styles.headerText}>Generated QR code</Text>
               </View>
         </View>

          <View style = {styles.qrCodeContainer}>
            <QRCode 
            value= {qrData}
            size={300}
            />
            <View style={styles.buttonContainer}>
             <TouchableOpacity style={styles.qrButtons}>
              <Text style={styles.buttontext}>Take Snapshot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qrButtons}>
              <Text style={styles.buttontext}>Share </Text>
            </TouchableOpacity>
            </View>
          </View>
         
      

      </View>
      
    );
}



const styles = StyleSheet.create({
  container:{ 
    flex: 5, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    backgroundColor:color.primary,
  
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
  


  },
  headerText:{
    fontSize: rfv(18),
   
    width:'100%',
    fontWeight:'bold',
    alignSelf:'center',
    color: 'white',
    textAlign: 'center',
  },

    qrCodeContainer: {
      flex:4,
      flexDirection:'column',
    justifyContent:'center',
    alignContent: 'center',
    backgroundColor:'white',
    borderTopEndRadius:30,
    borderTopStartRadius:30,
    alignItems:'center',

  }, 
  buttonContainer:{
   
    flexDirection:'row',
    paddingVertical:20
  },
 
 qrButtons:{
  backgroundColor:color.primary,
 // paddingVertical:20,
  width:'40%',
  height: rfv(50),
  marginVertical:30,
  borderRadius: 5,
  justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',
  marginHorizontal:10

 },
 buttontext:{
 color:"white",
 fontSize:rfv(14),
 fontWeight:'700'

 }

});

export default App;
*/




import React, {useEffect, useRef} from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
const RNFS = require('react-native-fs');
import Share from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';
import {useSelector, useDispatch} from 'react-redux';
import color from '../colors/colors';
import {RFPercentage, RFValue as rfv} from 'react-native-responsive-fontsize';
import Icon from 'react-native-ionicons';
import ViewShot from 'react-native-view-shot';

const App = props => {
  const qrDataState = useSelector(
    state => state?.QRCodeGenerationReducer?.orderDetails,
  );
  const account_id = useSelector(
    state => state?.AccountInfo.accountData?.account_id,
  );

  console.log(qrDataState);

  const qrData = JSON.stringify(JSON.stringify(qrDataState));
  const viewShotRef = useRef(null);

  const captureAndShareScreenshot = () => {
    viewShotRef.current.capture().then(uri => {
      RNFS.readFile(uri, 'base64').then(res => {
        let urlString = 'data:image/jpeg;base64,' + res;
        let options = {
          title: 'Share Title',
          message: 'Share Message',
          url: urlString,
          type: 'image/jpeg',
        };
        Share.open(options)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
      });
    });
  };

  return (
    <View  style={styles.container}>
    
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Icon
            name="arrow-back"
            size={rfv(30)}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>

        <View style={{justifyContent: 'center', width: '100%'}}>
          <Text style={styles.headerText}>Generated QR code</Text>
        </View>
      </View>
      
      <View style={styles.qrCodeContainer}>
      <ViewShot
        style={{backgroundColor:'white', padding: 20}}
      ref={viewShotRef}
      options={{format: 'jpg', quality: 0.9}}>
        <QRCode value={qrData} size={300} />
        </ViewShot>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.qrButtons}
            onPress={captureAndShareScreenshot}>
            <Text style={styles.buttontext}>Share Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
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
    paddingVertical: 20,
  },
  headerText: {
    fontSize: rfv(18),

    width: '100%',
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
  },

  qrCodeContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
  },

  qrButtons: {
    backgroundColor: color.primary,
    // paddingVertical:20,
    width: '80%',
    height: rfv(50),
    marginVertical: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  buttontext: {
    color: 'white',
    fontSize: rfv(14),
    fontWeight: '700',
  },
});

export default App;
