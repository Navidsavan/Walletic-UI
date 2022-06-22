import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import color from "../colors/colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const CustomAlert=(props)=>{
    return(
        <View style={styles.container}>
            <Icon name="deleteuser" size={RFValue(80)} color="red"/>
            <Text style={styles.message}>{props.message}</Text> 
            <TouchableOpacity onPress={props.onClosePress} style={styles.conformButton}>
                <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor: 'red',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        width: "100%",
        backgroundColor: color.primary,
        paddingVertical: 15,
        borderRadius: 5
    },
    message:{
        color:"white",
        fontSize:RFValue(20),
        fontWeight:"600"
    },
    conformButton:{
        backgroundColor:'green',
        width: '47%',
        height: RFValue(45),
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginVertical:20
    },
    buttonText:{
        color:"white",
        fontSize:RFValue(16),
        fontWeight:'bold',
       
        
    },
})

export default CustomAlert;