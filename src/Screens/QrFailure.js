
import {View,  Text,  StyleSheet, Dimensions, Button} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {onReadSuccess} from  '../redux/actions/QrActions' 
import React from 'react';

const QrFailure = () => {


    return (
        <View style={{justifyContent : 'center'}}>
            <Text>Couldnt Scan Qr Code</Text>
        </View>
    )
 }


 export default QrFailure
