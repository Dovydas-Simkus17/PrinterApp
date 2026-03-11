import { View, Text, StyleSheet} from 'react-native'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ----------------------- Page -----------------------

function index() {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>index</Text>
    </View>
  )
}

export default index


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SecondComponent() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Test" component={index} />
    </Tab.Navigator>
  );
}

function FirstComponent() {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Home" component={index} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



// ----------------------- StyleSheet -----------------------

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

// ----------------------- /// -----------------------