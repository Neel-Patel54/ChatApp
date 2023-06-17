import { View, Text } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'

const App = () => {
  return (
    <View style={{flex:1}}>
      <RootNavigator />
    </View>
  )
}

export default App