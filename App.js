import 'react-native-gesture-handler';
import React from 'react';
import {Provider, ReactReduxContext} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {StatusBar} from "react-native"
import auth from './src/redux/reducers/Auth';
import QrScannerReducer from './src/redux/reducers/QRScannerReducer'
import {QrDataSaveReducer, modalReducer} from './src/redux/reducers/QRScannerReducer'
import {QRCodeGenerationReducer} from './src/redux/reducers/QrGenerationReducer'
import {combineReducers} from 'redux';
import Navigation from './src/Navigation/Navigation';
import App1 from './App1';
import QrDataScreen from './src/Screens/QrDataScreen';
import color from './src/colors/colors';
import AccountInfo from './src/redux/reducers/AccountInfoReducer';
import receiverInformation from './src/redux/reducers/TransferInfoReducer'
import HomeScreen from './src/Screens/App/HomeScreen';

//import store1 from './Playground/Redux/Store' // pg

//combining the reducers
const reducers = combineReducers({
  auth,
  QrScannerReducer, 
  QrDataSaveReducer,
  modalReducer,
  QRCodeGenerationReducer,
  AccountInfo,
  receiverInformation,
});
const store = createStore(reducers, applyMiddleware(thunk));

export default function App() {

  return (
    <Provider store={store}>
     <StatusBar backgroundColor={color.primary}/>
     <Navigation />
  
           {/* <App1 /> */}
     
    </Provider>
  );

}
