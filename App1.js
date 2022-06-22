import React, {useEffect, useState, useReducer} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';

const intialState = {
  message: '',
};
const reducer = (state, action) => {
  if (action.type === 'ERROR_HANDLING') {
    return {...state, message: action.payload};
  }
  return state;
};
const App1 = () => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (state.message) {
      alert('error occured');
    }
  });
  console.log('re-renders');
  const handleSubmit = () => {
    try {
      console.log('reached!');
      throw new Error('your Request is failed!');
    } catch (err) {
      // console.log('catch block ');
      // console.log(err.message, 'message');
      // setError(err.message);
      dispatch({type: 'ERROR_HANDLING', payload: 'your request is failed!'});
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title={'Submit'} onPress={handleSubmit} />
      <Text>Your component is wrapped here!</Text>
    </View>
  );
};

export default App1;
