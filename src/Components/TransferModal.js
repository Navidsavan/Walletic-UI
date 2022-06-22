import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import color from "../colors/colors";
import { RFPercentage, RFValue as rfv } from 'react-native-responsive-fontsize';


const TransferModal = props => {
    return (
        <View style={styles.container} >
            <Text style={[styles.title, { color: 'white', }]}>Receiver Detail</Text>
            <View style={styles.nameLebelContainer}>
                <Text style={styles.lebel}>Name</Text>
                <Text style={styles.text}>{props.name}</Text>
            </View>
            <View style={styles.nameLebelContainer}>
                <Text style={styles.lebel}>Account#</Text>
                <Text style={styles.text}>{props.accountNo}</Text>
            </View>
            <View style={styles.nameLebelContainer}>
                <Text style={styles.lebel}>Amount</Text>
                <Text style={styles.text}>{props.amount}</Text>

            </View>

            <View style={styles.nameLebelContainer}>
                <Text style={styles.lebel}>Purpose</Text>
                <Text style={styles.text}>{props.purpose}</Text>

            </View>
            <Text style={styles.conformationText}>Press on Confirm button to transfer successfully</Text>
            <View style={styles.bottonsContainer}>
            <TouchableOpacity onPress={props.onCancelPress} style={[styles.conformButton,{backgroundColor:'#C75D5D'}]}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onConformPress} style={styles.conformButton}>
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       
        backgroundColor: 'red',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        width: "100%",
        backgroundColor: color.primary,
        paddingVertical: 15,
        borderRadius: 5

    },
    title: {
        color: 'black',
        fontSize: rfv(20),
        marginVertical:15,
        fontWeight: "bold"

    },
    lebel: {
        color: '#201F52',
        fontSize: rfv(16),
        fontWeight: 'bold'
    },
    text: {
        color: color.primary,
        fontSize: rfv(16),
        fontWeight: "600"

    },
    nameLebelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginVertical: 15,
        borderRadius: 5
    },
    conformButton:{
        backgroundColor:'green',
        width: '47%',
        height: rfv(45),
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginVertical:20
    },
    buttonText:{
        color:"white",
        fontSize:rfv(16),
        fontWeight:'bold',
       
        
    },
    bottonsContainer:{
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-between',
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        
    },
    conformationText:{
        color:'white',
        fontSize:rfv(14),
        width:"80%"
    }

})

export default TransferModal;