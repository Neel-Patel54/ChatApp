import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        const userId = uuid.v4()
        firestore().collection("users").doc(userId).set({
            name, email, password, mobile, userId
        }).then(() => {
            console.log("user signup success!");
            navigation.navigate('Login')
        }).catch((error) => {
            console.log("Sign up error", error);
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>Sign up</Text>
            <TextInput value={email} placeholder='email' placeholderTextColor={'black'} onChangeText={(txt) => setEmail(txt)} style={{ alignSelf: 'center', marginTop: 16, height: 48, width: '80%', borderWidth: 1, color: 'black' }} />
            <TextInput value={password} placeholder='password' placeholderTextColor={'black'} onChangeText={(txt) => setPassword(txt)} style={{ alignSelf: 'center', marginTop: 16, height: 48, width: '80%', borderWidth: 1, color: 'black' }} />
            <TextInput value={name} placeholder='name' placeholderTextColor={'black'} onChangeText={(txt) => setName(txt)} style={{ alignSelf: 'center', marginTop: 16, height: 48, width: '80%', borderWidth: 1, color: 'black' }} />
            <TextInput value={mobile} placeholder='mobile' placeholderTextColor={'black'} onChangeText={(txt) => setMobile(txt)} style={{ alignSelf: 'center', marginTop: 16, height: 48, width: '80%', borderWidth: 1, color: 'black' }} />
            <TextInput value={confirmPassword} placeholder='confirmPassword' placeholderTextColor={'black'} onChangeText={(txt) => setConfirmPassword(txt)} style={{ alignSelf: 'center', marginTop: 16, height: 48, width: '80%', borderWidth: 1, color: 'black' }} />
            <TouchableOpacity onPress={handleSignUp} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16, width: 200, height: 48, backgroundColor: 'tomato' }}>
                <Text style={{ color: 'black' }}>SignUp</Text>
            </TouchableOpacity>
            <Text style={{ color: 'black', lineHeight: 18, marginTop: 16 }} onPress={() => navigation.navigate('Login')}>Go to the login screen</Text>
        </View>
    )
}

export default SignUp