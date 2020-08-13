import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Text, TextInput, View, Button } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import styles from '../StyleSheet'

function EditAccount({ state, navigation, dispatch }) {

  //Controlled inputs
  const [name, setName] = useState(state.auth.firstName)
  const [email, setEmail] = useState(state.auth.email)
    
  return (
    <View style={styles.container}>
      
      <Text>Name</Text>
      <TextInput autoCapitalize={'none'} defaultValue={name} onChangeText={name => setName(name)} />

      <Text>Email</Text>
      <TextInput  autoCapitalize={'none'} defaultValue={email} onChangeText={email => setEmail(email)} />

      <Button title="Submit" onPress={() => {
        console.log("In submit")
        const updatedUser = {
          id: state.auth.id,
          first_name: name,
          email: email
        }

        // **TO DO** Bug fix: this doesn't work in iOS. Possibly has to do with "non serializable values" error
        const configObj = {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "accepts": "application/json"
          },
          body: JSON.stringify(updatedUser)
        }

        fetch(`http:///localhost:3000/users/${state.auth.id}`, configObj)
          .then(resp => resp.json())
          .then(json => {
            console.log(json)

            dispatch({type: "UPDATE_ACCOUNT", payload: json})
            navigation.navigate("Profile")
          })
          .catch(console.log)
        
      }} />

      <Button title="Delete" onPress={() => {
        fetch(`http://localhost:3000/users/${state.auth.id}`, { method: "DELETE" })
          .then(resp => resp.json())
          .then(json => {
            
            SecureStore.deleteItemAsync("token")
            dispatch({ type: "LOGOUT", payload: { token: '' } })
          })
          .catch(console.log)
        
      }}/>
      
    </View>
  )
}

export default connect((state)=>({state}))(EditAccount)