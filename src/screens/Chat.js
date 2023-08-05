import { View, Text } from 'react-native'
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
// import firestore from '@react-native-firebase/firestore';
import { collection, addDoc, orderBy, query, onSnapshot } from '@react-native-firebase/firestore';

const Chat = ({ route }) => {
    const { data, id } = route?.params
    const [messages, setMessages] = useState([]);
    console.log({ data });
    console.log({ id });

    // useEffect(() => {
    //     const subscribe = firestore().collection("chats").doc(id + data.userId).collection("messages").orderBy("createdAt", "desc");
    //     subscribe.onSnapshot((querysnapshot) => {
    //         const allMessages = querysnapshot.docs.map((items) => {
    //             return { ...items._data, createdAt: items._data.createdAt };
    //         })
    //         setMessages(allMessages);
    //     });

    //     return () => {
    //         subscribe();
    //     }
    // }, [])

    useLayoutEffect(() => {
        const collectionRef = collection('newchats');
        const q = query(collectionRef, orderBy('createAt', 'desc'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setMessages(snapshot.docs.map(doc => ({
                _id: doc.id,
                createdAt: doc.data().createdAt,
                text: doc.data().text,
                user: doc.data().user
            })))
        })
        return unsubscribe;
    }, []);

    // const onSend = useCallback((messages = []) => {
    //     const msg = messages[0];
    //     const newMessage = {
    //         ...msg,
    //         sendBy: id,
    //         sendTo: data.userId,
    //         createdAt: Date.parse(msg?.createdAt)
    //     }
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
    //     firestore().collection("chats").doc('' + id + data.userId).collection("messages").add(newMessage);
    //     firestore().collection("chats").doc('' + data.userId + id).collection("messages").add(newMessage);
    // }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const {_id, createdAt, text, user} = messages[0];
        addDoc(collection('newchats'), {
            _id,
            createdAt,
            text,
            user,
        })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {/* <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: id,
                }}
            /> */}
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

export default Chat;