import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from "react-native";
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-ionicons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import color from "../../colors/colors";
import LottieView from 'lottie-react-native';



const StatementsScreen = (props) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => props.navigation.goBack(null)}>
                        <Icon  name='arrow-back' size={RFValue(30, 580)} color="white" style={styles.icon} />
                    </TouchableOpacity>

                    <Text style={styles.notificationsheaderText}>Transaction History</Text>

                </View>
                <View style={styles.notificationsVContainer}>
                    <View style={styles.notificationIconContainer}>

                        <Icon  name='list' size={RFValue(80, 580)} color="gray" style={styles.icon} />
                    </View>
                    <Text style={styles.emptyText}>No Transactions History Found!</Text>
                </View>

            </View>



        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 8,
        backgroundColor: color.primary,


    },

    headerContainer: {
        flex: 1,
        backgroundColor: color.primary,
        justifyContent: 'flex-start',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        paddingRight: 20,


        // width: '100%',



    },
    notificationsVContainer: {
        flex: 7,
        //  marginHorizontal: 20,
        // marginVertical:30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    notificationsheaderText: {
        color: 'white',
        fontSize: RFValue(18, 580),
        fontWeight: '900',
        paddingLeft: RFValue(50, 580),
    },
    emptyText: {
        fontSize: RFValue(18, 580),
    },
    notificationIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E7E2DD',
        // padding:40,
        height: 200,
        width: 200,
        borderRadius: 200,
    }





})
export default StatementsScreen;