import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        firestore().collection('users').where('email', '==', email).get().then((res) => {
            console.log(res.docs);
            if (res.docs !== []) {
                console.log(res.docs[0].data());
                const { name, email, userId } = res.docs[0].data();
                storeData(name, email, userId);
            }
        }).catch((error) => {
            console.log("user not found", error);
        })
    }

    const storeData = async (name, email, userId) => {
        try {
            await AsyncStorage.setItem('NAME', name);
            await AsyncStorage.setItem('EMAIL', email);
            await AsyncStorage.setItem('USERID', userId);
        } catch (e) {
            // saving error
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>Login</Text>
            <TextInput value={email} placeholder='email' placeholderTextColor={'black'} onChangeText={(txt) => setEmail(txt)} style={{ alignSelf: 'center', marginTop: 16, height: 48, width: '80%', borderWidth: 1, color: 'black' }} />
            <TextInput value={password} placeholder='password' placeholderTextColor={'black'} onChangeText={(txt) => setPassword(txt)} style={{ alignSelf: 'center', marginTop: 16, height: 48, width: '80%', borderWidth: 1, color: 'black' }} />
            <TouchableOpacity onPress={handleLogin} style={{ justifyContent: 'center', alignItems: 'center', width: 200, height: 48, backgroundColor: 'tomato', marginTop: 16 }}>
                <Text style={{ color: 'black' }}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;