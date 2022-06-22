// import React from 'react';
// import {Text, View, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../redux/actions/Auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  BackHandler, 
  Alert,
  Modal,
  ToastAndroid
} from 'react-native';
import color from '../../colors/colors';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-ionicons';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import HomeFeatures from '../../Components/HomeFeatures';
import { useBackHandler, exitApp } from '@react-native-community/hooks'
import {fetchBlanceInfo} from "../../redux/actions/blanceInfoActions"
import CardFlip from 'react-native-card-flip';

const HomeScreen = props => {
  // for testing purpose
 
  const state = useSelector(state => state); 
  const accountAllData =useSelector(state=>state.AccountInfo.accountData)
  const [accountInfoModalVisible, setAccountInfoModalVisible] = useState(false);
  // actual
  const flipcard =useRef();
  const nav = useNavigation();
  const dispatch = useDispatch();
  const log_out = async () => {
    dispatch(logout());
    await AsyncStorage.clear();
    // nav.navigate('Login', {
    //    screen: 'PhoneScreen',
    // });
    // setting a stack [auth]
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  ///////////////////////Back handler to handler back button press///////////////////
  const backActionHandler = () => {
    Alert.alert('Are You Sure!', 'Do you want to exit App?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  useBackHandler(backActionHandler);
  //////////////////////////////////////////CALL API TO FETCH BLANCE ////////////////////////////////////////////////
  useEffect(()=>{
   
    AsyncStorage.getItem('user_data')
    .then(jsonValue => {
      if (jsonValue != null) {
        jsonValue = JSON.parse(jsonValue);
       dispatch(fetchBlanceInfo(jsonValue.user_id, jsonValue.token));
       
      }}
      )  
  },[])


console.log(accountAllData)

  return (
    <View style={[styles.container]}>
      {/*//////////////////////////////// Account info modal //////////////////////////////////////////// */}
      {accountInfoModalVisible==true?
      <Modal
                    animationType='fade'
                    transparent={true}

                    backgroundColor={"blue"}
                    visible={accountInfoModalVisible}
                    onRequestClose={() => {
                        setAccountInfoModalVisible(!accountInfoModalVisible);


                    }}>
                      <View style={styles.modalContainer}>
                       <View style={styles.modalBodyContainer}>
                       

                         <Text style={styles.modalTitle}>Account Info</Text>

                  
                            <View style={styles.textContainer}>

                            <Text style={styles.modalLabel}>Account Holder </Text>
                            <View style={styles.infotextContainer}>
                            <Text style={[styles.modalText,{paddingLeft:15}]}>{accountAllData?accountAllData.fullname: null}</Text>
                            </View>
                            </View>
                            <View style={styles.textContainer}>
                                  
                                  <Text style={styles.modalLabel}>Account Number </Text>
                                  <View style={styles.infotextContainer}>
                                  <Text style={styles.modalText}> +92 {accountAllData?accountAllData.phoneNo: null}</Text>
                                  </View>
                            </View>
                            <View style={styles.textContainer}>
                                 

                                  <Text style={styles.modalLabel}>Account Type </Text>
                                
                                  <View style={styles.infotextContainer}>

                                  <Text style={[styles.modalText,{paddingLeft:25}]}> {accountAllData?accountAllData.role: null}</Text>
                                  </View>
                            </View>

                            <TouchableOpacity style={styles.modalClossButton}
                            onPress={()=>setAccountInfoModalVisible(false)}>
                              <Text style={[styles.modalLabel,{color:"white"}]}>Close</Text>
                            </TouchableOpacity>
                       </View>
                      </View>
                </Modal>
                  :null}



      {/*//////////////////////////////// Account info modal end //////////////////////////////////////////// */}

      <View style={styles.header}>
        <View style={{flex: 3}}>
          <View style={styles.topMenuContainer}>
            <TouchableOpacity>
              <Icon
               
                name="menu"
                type="font-awesome"
                size={RFValue(20, 580)}
                color="white"
                padding={10}
              />
            </TouchableOpacity>
            <Image
              source={require('../../images/logo1.png')}
              // source={require('../../images/send.png')}
              style={styles.logo}
            />

            <TouchableOpacity onPress={()=> props.navigation.navigate('notifications')} >
              <Icon
               
                name="notifications"
                type="font-awesome"
                size={RFValue(20, 580)}
                color="white"
                padding={10}
              />
            </TouchableOpacity>



            <TouchableOpacity onPress={log_out}>
              <Icon
               
                name="log-out"
                type="font-awesome"
                size={RFValue(20, 580)}
                color="white"
                padding={10}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.blanceContainer}>
            <View style={styles.blanceSubContainer}>
            <CardFlip ref={flipcard} style={{height:"100%", width:'100%', alignSelf:'center',}}>
            <TouchableOpacity onPress={()=>flipcard.current.flip()} style={{height:"100%",justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <Text style={{color:color.primary, fontSize: RFValue(16)}}>Show Balance</Text>
              </TouchableOpacity>
              <View style={{justifyContent:'center',height:'100%', paddingVertical:15, paddingHorizontal:10}}>
              <TouchableOpacity onPress={()=>flipcard.current.flip()} style={{alignContent:'flex-start', justifyContent:'flex-start', alignItems:'flex-start'}}>
                <Text style={{color:color.primary , fontSize: RFValue(16)}}>Hide Balance</Text>
              </TouchableOpacity>
              <View style={{justifyContent:'center', alignItems:'center',alignSelf:'center' ,height:'100%'}}>
              <Text style={styles.blanceText}>{accountAllData?accountAllData.fullname: null}</Text>
             
              <View style={{flexDirection:'row'}}>
           
              <Text style={styles.RSText}>Rs </Text> 

             
              <Text style={styles.totalAmount}>{accountAllData?accountAllData.balance: null}</Text>             
              </View>
              </View>
              </View>
              </CardFlip>
            </View>
            <View style={styles.statementContainer}>
              <View style={styles.acccountDetailsContainer}>
                <TouchableOpacity style={styles.infoButtons} onPress={()=>setAccountInfoModalVisible(true)}>
                  <Text style={styles.cartButtonText}>View Account Info</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.transactionContainer}>
              <TouchableOpacity onPress={()=> props.navigation.navigate('statements')} style={styles.infoButtons}>

                  <Text style={styles.cartButtonText}>View Statements</Text>
                </TouchableOpacity>
              </View>

            </View >
          
          </View>
        </View>
      </View>
      <View style={[styles.featuresContainer,{opacity: accountInfoModalVisible?0.5:1}]}>
        <HomeFeatures
          onTransferPress={() => props.navigation.navigate('transferForm')}
          onBillPress={()=>ToastAndroid.show("Available Soon", ToastAndroid.SHORT)}
          onBankPress={()=>ToastAndroid.show("Available Soon", ToastAndroid.SHORT)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#F5F8F8',
    backgroundColor:'white'

},
header: {
    flex: 2,
    backgroundColor: color.primary,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20

},
topMenuContainer: {
    flex: 1.5,
    flexDirection: 'row',
    //backgroundColor: "pink",
    justifyContent: 'space-between',
    margin: 20,

},
blanceContainer: {
    flex: 6,
    backgroundColor:color.primary,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
   // width: "90%",
    shadowColor: 'white',
    shadowOffset: {
        width: 4,
        height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.54,
    
    elevation: 1,


},
blanceSubContainer: {
  flex:4,
  justifyContent:'center',
  alignContent:'center',
  alignItems:'center',
  borderTopRightRadius:5,
  borderTopStartRadius:5,
 
     backgroundColor: 'white',
  //  marginBottom: 10,
    width: '100%'

},

statementContainer:{
   flex:2,
   flexDirection:'row',
  
},
acccountDetailsContainer:{
  flex:1, 
  backgroundColor:'#5403AB',
  borderWidth:2,
  borderRightWidth:0,
  borderLeftWidth:0,
  borderBottomWidth:0,
  borderColor:'silver'

},
transactionContainer:{
  flex:1, 
  backgroundColor:'#5403AB',
  borderWidth:2,
  borderRightWidth:0,
  borderBottomWidth:0,
  borderColor:'silver'
  
},
infoButtons:{
  height:"100%",
  width:"100%",
  justifyContent:'center',
  alignItems:"center",
  alignSelf: 'center'

},
cartButtonText:{
  color:"white",
  fontSize: RFValue(16)

},
RSText:{
color:color.primary,
alignSelf:'center',
fontWeight:'500', 
fontSize: RFValue(16)
},
featuresContainer: {
    flex: 4,
    flexDirection: 'row',
    //  backgroundColor: 'white',
  },
 
blanceText: {
    fontSize: RFValue(18),
    fontWeight: '800',
    color: 'black',

},
totalAmount: {
    fontSize: RFValue(20),
    color: 'black',
   // marginTop: 20,
    fontWeight: '600',
   // width: "70%"

},
addContainer: {
    backgroundColor: '#F99815',
    borderTopRightRadius:30,
    justifyContent: 'center',
    width: '20%',
    alignItems: "center",

   
},

logo: {
    width: RFValue(120),
    height: RFValue(40),
},
userName:{
  fontSize: RFValue(16, 580),
  color: 'white',
 // width: "80%",
  marginVertical:5
},
//////////////////////////////////// modal info style //////////////////////////
modalContainer:{
  flex:1,
  justifyContent:'center',
  alignContent:'center',
  height:'50%',
  width:'100%',
  backgroundColor:'transparent',
  alignItems:'center',
  alignSelf:'center'
},
modalBodyContainer:{
  backgroundColor:"#E7E2DD",
  marginTop:50,
  width:'90%',
  justifyContent:'center',
 
  paddingHorizontal:20,
  paddingVertical:30,
  borderRadius:5
  

},
textContainer:{
  
  flexDirection:'row',
  paddingHorizontal:5,
  paddingVertical:3,
  borderBottomWidth:1,
  borderBottomColor:"silver",
  marginBottom:10

},
modalTitle:{
  textAlign:'center',
  fontSize:RFValue(18),
  fontWeight:'bold',
  color:"#270667" ,
  paddingBottom:20

},

modalLabel:{
  fontSize:RFValue(13),
  color:'#270667',
  fontWeight:"900"
},
infotextContainer:{
width:'70%', 
alignItems:'flex-start',
paddingLeft:20,
},
modalText:{
  fontSize: RFValue(16),
  paddingLeft:5,
  color:color.primary
},
modalClossButton:{
  justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',
  backgroundColor:color.primary,
  borderRadius:30,
  paddingVertical: 10,
  marginTop:10,
  width:'60%'

}

});

export default HomeScreen;
