import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Text, TextInput, View, Button } from 'react-native'
import styles from '../StyleSheet'

function AddTherapist({ navigation, state, dispatch }) {

    //Controlled inputs
    const [email, setEmail] = useState('')

    function addTherapist() {
        const configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify({email: email, user_id: state.auth.id})
        }

        fetch(`https://safe-keeping-backend.herokuapp.com/user_therapists`, configObj)
            .then(resp => resp.json())
            .then(json => {
                dispatch({ type: "ADD_THERAPIST", payload: json })
                navigation.navigate("Settings")
            })
    }

    return <View style={styles.container}>
        <Text style={styles.p}>enter your therapist's email</Text>
        <TextInput style={{ height: 40, width: 200, marginBottom: 10 }} autoCapitalize={'none'}
            placeholder="email" defaultValue={email} onChangeText={(email) => setEmail(email)} />
        <Button title="Submit" onPress={addTherapist} />
    </View>
}

export default connect((state)=>({state}))(AddTherapist)