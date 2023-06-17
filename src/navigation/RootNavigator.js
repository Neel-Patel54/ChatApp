import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        getData();
    }, [isLogin])

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('USERID')
            if (value) {
                setIsLogin(true)
                return;
            }
            setIsLogin(false)
        } catch (e) {
            // error reading value
        }
    }

    return (
        <NavigationContainer>
            {!isLogin ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default RootNavigator