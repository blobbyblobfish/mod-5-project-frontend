import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default function Trends( { navigation } ) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
  
  return (
    <View style={styles.container}>
      <Text>Trends!</Text>

      {/* Stretch Feature */}
      <Button title="Add New Tracker" onPress={() => navigation.navigate("New Tracker")}/>
    </View>
  )
}