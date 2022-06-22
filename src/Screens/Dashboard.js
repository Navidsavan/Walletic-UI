import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, TouchableNativeFeedback, TouchableOpacity,
    useColorScheme,
    View,
    Button
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import Card from '../Components/Card'
import TouchableItem from "react-navigation-stack/src/vendor/views/TouchableItem";



export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.updateBalanceHandler = this.updateBalanceHandler.bind(this)
        this.state = {
            walletBalance: 10000
        }
    }


    contentStyler(justifyContent='center', flexDirection= 'column', alignContent='center', flex=1) {
        const style = {
            balanceCardInnerView: {
                justifyContent: justifyContent,
                flexDirection: flexDirection,
                alignContent: alignContent,
                flex: flex,
            }
        }
        return style.balanceCardInnerView
    }

    balanceCard() {
        return (

            <TouchableItem
                      style={styles.touchableItem}
                  >
                       <Card style={styles.balanceCard}>
                   <View style={this.contentStyler()}>
                       <Text>
                           Balance
                       </Text>
                   </View>
                   <View style={this.contentStyler()}>
                       <Text>
                           RS: {this.state.walletBalance}
                       </Text>
                   </View>
                       </Card>
                  </TouchableItem>
        )
    }

    buttonView() {
        return(
            <View>
                <Button title={"Update Balance By 1000"}  onPress={this.updateBalanceHandler} />
            </View>
        )
    }

    updateBalanceHandler() {
        this.setState({
            walletBalance : this.state.walletBalance  + 1000
        })
    }

    render(){
        return(
            <View style={styles.dashboardView}>
                {this.balanceCard()}
                {this.buttonView()}
            </View>
        );
    }
}

const marginHorizontal = '8%'
const marginTop = '10%'

const styles = {
    dashboardView: {
        flex: 1,
    },

    balanceCard: {
        paddingVertical: '10%',
        flexDirection: 'row',
    },

    touchableItem: {
        marginHorizontal: marginHorizontal,
        marginTop:  marginTop
    }

}