import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

let id = '';

const Main = ({navigation}) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchList();
    }, [])

    const fetchList = async () => {
        const email = await AsyncStorage.getItem('EMAIL');
        console.log({email});
        id = await AsyncStorage.getItem('USERID');
        console.log({id});
        firestore().collection("users").where("email", "!=", email).get().then((res) => {
            console.log("listing", res.docs);
            let newUserList = [];
            if (res.docs != []) {
                res.docs.map((item) => {
                    newUserList.push(item.data());
                })
            }
            setList(newUserList);
        }).catch((error) => {
            console.log("error..", error);
        })
    }

    return (
        <View style={{flex: 1}}>
            <Text style={{ color: 'black' }}>Main</Text>
            {list.map((item, index) => {
                return <TouchableOpacity key={index} onPress={() => navigation.navigate('Chat', {data: item, id:id})} style={{width: '100%', height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: 'tomato', borderWidth: 0.5, marginBottom: 4}}>
                    <Text style={{color: 'white'}}>{item?.name}</Text>
                </TouchableOpacity>
            })}
        </View>
    )
}

export default Main