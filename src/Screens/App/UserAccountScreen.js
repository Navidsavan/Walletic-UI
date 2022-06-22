import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import color from '../../colors/colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-ionicons';
import { useSelector, useDispatch } from 'react-redux';




const UserAccountScreen = (props) => {


  const accountAllData = useSelector(state => state.AccountInfo.accountData)


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent:'flex-start',alignContent:'center',alignItems:"center",  width:"100%", paddingHorizontal:15 }}>
          
          <TouchableOpacity style={{  width:"20%" }} onPress={() => props.navigation.goBack(null)}>
            <Icon name='arrow-back' size={RFValue(30)} color="white" style={styles.icon} />
          </TouchableOpacity>
         
          <View style={{flexDirection:'row', width:"95%",  justifyContent:'space-around'}}>
          <Text style={styles.userProfile}>User Profile</Text>



          <TouchableOpacity style={{  }} >
            <Icon name='more' size={RFValue(20, 580)} color="white" style={styles.icon} />
          </TouchableOpacity>
          </View>

        </View>
        <View style={styles.userImgContainer}>
          <Icon

            name="person"
            // style={styles.userImg}
            type="font-awesome"
            size={RFValue(50, 580)}
            color="white"
            padding={10}
          />


        </View>
        <Text style={styles.userName}>{accountAllData?accountAllData.fullname:null}</Text>
      </View>
      <View style={styles.infoContainer}>

        <Text style={styles.textTitle}>Email</Text>
        <Text style={styles.text}>{accountAllData?accountAllData.email:null}</Text>
        <Text style={styles.textTitle}>Phone Number</Text>
        <Text style={styles.text}>(+92){accountAllData?accountAllData.phoneNo:null}</Text>
        <Text style={styles.textTitle}>Account Type</Text>
        <Text style={styles.text}>{accountAllData?accountAllData.role:null}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 5,

  },
  headerContainer: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: color.primary,
    width:"100%",
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30
  },
  infoContainer: {
    flex: 3,
    marginHorizontal: RFValue(15, 580),
    //backgroundColor: 'gray',
    // marginHorizontal:40
    //


  },
  userImgContainer: {
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    // borderRadius:1000,
    borderColor: 'white',
    height: 100,
    width: 100,
    borderRadius: 70,
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  userName: {
    fontSize: RFValue(15, 580),
    fontWeight: '900',
    marginVertical: 20,
    color: 'white'
  },
  userProfile: {
    // justifyContent: 'center',
    // alignSelf: 'center',

    textAlign: 'center',
    fontSize: RFValue(15, 580),
    fontWeight: '900',
   
    color: 'white'

  },
  textTitle: {
    marginVertical: 10,
    fontSize: RFValue(16),
    fontWeight: '600',
    color: 'black'
  },
  text: {
    fontSize: RFValue(16),
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: 'gray',
    borderRadius: 4,
    fontWeight: '500',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

  }

})

export default UserAccountScreen;
