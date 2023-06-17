import { View, Text } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';

const Chat = ({ route }) => {
    const { data, id } = route?.params
    const [messages, setMessages] = useState([]);
console.log({data});
console.log({id});
    useEffect(() => {
        const subscribe = firestore().collection("chats").doc(id + data.userId).collection("messages").orderBy("createdAt", "desc");
        subscribe.onSnapshot((querysnapshot) => {
            const allMessages = querysnapshot.docs.map((items) => {
                return {...items._data, createdAt: items._data.createdAt};
            })
            setMessages(allMessages);
        });

        return () => {
            subscribe();
        }
    }, [])

    const onSend = useCallback((messages = []) => {
        const msg = messages[0];
        const newMessage = {
            ...msg,
            sendBy: id,
            sendTo: data.userId,
            createdAt: Date.parse(msg?.createdAt)
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
        firestore().collection("chats").doc('' + id + data.userId).collection("messages").add(newMessage);
        firestore().collection("chats").doc('' + data.userId + id).collection("messages").add(newMessage);
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: id,
                }}
            />
        </View>
    )
}

export default Chat