import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import color from '../colors/colors';
import { useNavigation } from '@react-navigation/native';
import QrGeneration from '../Screens/QrGeneration'
import QrGenerationForm from "../Screens/QrGenerationDataForm"

//<Icon color='#333' name='send' type='font-awesome' size={RFValue(40, 580)} color="white" padding={10} />

const HomeFeatures = props => {

  // hooks

  const nav = useNavigation()

 // Handler Functions
  
  const QrGenerationHandler = () => {
    nav.navigate("QrDataForm")
  }



  return (
    <View style={styles.container}>
            <Text style={styles.textstyle}>Send Anywhere in Pakistan</Text>
            <View style={styles.subContainer}>
                <View style={styles.featureSubContainer}>
                    <TouchableOpacity onPress={props.onTransferPress} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.iconContainer}>

                            <Icon  name='send' type='font-awesome' size={RFValue(35, 580)} color={'#1E3B6C'} style={styles.icon} />
                        </View>
                        <Text style={styles.featureText}>Send Money</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.verticalLine}/>
                <View style={styles.featureSubContainer}>
                    <TouchableOpacity onPress={props.onBankPress}  style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.iconContainer}>

                            <Icon  name='bank' type='font-awesome' size={RFValue(35, 580)} color={'#1E3B6C'} style={styles.icon} />
                        </View>
                        <Text style={styles.featureText}>Transfer To Bank Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
       
     
            <View style={styles.subContainer}>
                <View style={styles.featureSubContainer}>
                    <TouchableOpacity onPress={QrGenerationHandler} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.iconContainer}>

                            <Icon  name='qrcode' type='font-awesome' size={RFValue(35, 580)} color={'#1E3B6C'} style={[styles.icon,{paddingHorizontal:15}]} />
                        </View>
                        <Text style={styles.featureText}>Generate QR Code</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.verticalLine}/>
                <View style={styles.featureSubContainer}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={props.onBillPress}>
                        <View style={styles.iconContainer}>

                            <Icon name='list' type='font-awesome' size={RFValue(35, 580)} color={'#1E3B6C'} style={styles.icon} />
                        </View>
                        <Text style={styles.featureText}>Send Bills/invoices</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  '#F5F8F8',
    marginHorizontal:10,
    backgroundColor:'white'


},
subContainer:{
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderRadius:5,
    marginVertical:5,
},
featureSubContainer: {
    flex:1,
    //backgroundColor:'red',
    backgroundColor:'#E7E2DD',
    paddingHorizontal:3,
    justifyContent: 'center',
    marginHorizontal:10,
    alignItems: 'center',
    marginVertical:5,
    width: '100%',
    borderRadius:10
  
   
    
    
},

featureText: {
    fontSize: RFValue(10, 580),
    fontWeight: '600',
    color: "black",

    textAlign: 'center',
    marginTop: 10,


},
iconContainer: {
     backgroundColor: 'white',
     padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 300,

    
    shadowColor: color.primary,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    // borderBottomEndRadius:30,
    //borderTopLeftRadius:30
},
featureImg: {

},
icon: {
    padding: 10

},
textstyle:{
     alignSelf: 'flex-start',
    // alignSelf: 'center',
    paddingTop:10,
    paddingHorizontal:10,

   textAlign: 'center',
   alignSelf: 'flex-start',
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: 'black',
},


});

export default HomeFeatures;
