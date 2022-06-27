import React,{useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput,FlatList, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from "react-native";
//import {Icon } from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/Fontisto";
//import{ Icon as Ionicons} from "react-native-ionicons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import color from "../../colors/colors";
import LottieView from 'lottie-react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { P2PStatementAction } from "../../redux/actions/TransactionsActions";

const StatementsScreen = (props) => {
    const dispatch = useDispatch();
    let userId=props.route.params.userId;
    const bankstatements =useSelector(state=>state.bankStatements.bankStatementsData)

   // console.log("bank dynamic data:",bankstatements)
   /* let transactionData = [
        {
            id: 1,
            name: "Anaaf Jawad",
            date: "12/03/2021",
            amount: 2000,
            typeOfTransaction: "widthdraw"

        },
        {
            id: 2,
            name: "Navid Anjum",
            date: "12/05/2021",
            amount: 2000,
            typeOfTransaction: "widthdraw"

        },
        {
            id: 3,
            name: "abdul samad",
            date: "12/06/2021",
            amount: 2000,
            typeOfTransaction: "deposit"

        }
    ]*/
    /////////////////////////// api call ///////////////////////
    useEffect(()=>{
   
        
           dispatch(P2PStatementAction(userId));
         
      },[])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => props.navigation.goBack(null)}>
                        <Icon name='arrow-left' size={RFValue(25)} color="white" style={styles.icon} />
                    </TouchableOpacity>

                    <Text style={styles.notificationsheaderText}>Transaction History</Text>

                </View>

                {!bankstatements ?
                    /////////////////////////////////if Transaction data is empty//////////////////////////////
                    <View style={styles.notificationsVContainer}>
                        <View style={styles.notificationIconContainer}>

                            <Icon name='list-2' size={RFValue(80, 580)} color="gray" style={styles.icon} />
                        </View>
                        <Text style={styles.emptyText}>No Transactions History Found!</Text>
                    </View>
                    :
                    /////////////////////////////////Transaction data container //////////////////////////////
                    <View style={styles.transactionDataContainer}>
                        
                    <FlatList
                        data={bankstatements}
                        showsVerticalScrollIndicator={false}
                       
                        scrollEnabled={true}
                        nestedScrollEnabled={true}

                        style={styles.priceList}
                        //numColumns={dew_Width >700?8: 6}
                       // keyExtractor={(item, index) => item.balance}

                        renderItem={(itemData) =>
                           <View style={styles.listContainer}>
                            <View style={styles.nameDateContanier}>
                                <View style={{justifyContent:'center', alignItems:'center', alignSelf:'center', paddingRight:5}}>
                                {itemData.item.typeOfTransaction==="withdraw"?
                                <MaterialIcons name="send-to-mobile" size={ RFValue(30)} color="#328F37"/>:
                                <MaterialIcons name="mobile-friendly" size={ RFValue(30)} color="#328F37"/>}

                                </View>
                            <View>
                            <Text style={styles.nameAmountStyle}>{itemData.item.bank_name}</Text>
                            <Text style={styles.dateStyle}>{itemData.item.date}</Text>
                            </View>
                            </View>
                            <View style={styles.rightContainer}>
                            <View>
                            <Text style={styles.nameAmountStyle}>{itemData.item.amount} PKR</Text>
                            <Text  style={styles.dateStyle}>Rs {itemData.item.amount} {itemData.item.typeOfTransaction}</Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                            {itemData.item.typeOfTransaction==="withdraw"?
                                <Icon name="arrow-down-l" size={ RFValue(25)} color="red"/>
                                :
                                <Icon name="arrow-up-l" size={ RFValue(25)} color="green"/>}
                                </View>
                            </View>

                            </View>
                        }

                    />
                    </View>}

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
    },

    transactionDataContainer: {
        flex: 7,
        //  marginHorizontal: 20,
        // marginVertical:30,
       
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'flex-start',
        paddingVertical: 20,
    },

//////////////////////////////////////////////////////////////////// flate list style ////////////////////////
listContainer:{
    flex:1,
    flexDirection:'row',
    width:'95%',
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'#F1F1F1',
    justifyContent:'space-between',
    paddingVertical:5,
    paddingHorizontal:5,
    marginVertical:10,
    borderRadius:5
   
},
nameDateContanier:{
    flexDirection:'row',
    paddingHorizontal:3
    

},
nameAmountStyle:{
    color:'#0F0333',
    fontSize:RFValue(14),
    fontWeight:'600'
},

dateStyle:{
    fontSize:RFValue(14),
    color:'gray'

},
rightContainer:{
    flexDirection:'row'
}


})
export default StatementsScreen;