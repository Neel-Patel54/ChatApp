import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../screens/Main';
import Chat from '../screens/Chat';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    )
}

export default AppNavigator;