import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>index</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  Text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})