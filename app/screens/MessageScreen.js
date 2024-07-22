import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeperator from "../components/ListItemSeperator";
import Screen from "../components/Screen";

import messagesDatabase from "../api/messages";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import { ErrorMessage } from "../components/forms";

// const intialMessages = [
//   {
//     id: 1,
//     title: "T1",
//     description: "D1",
//     image: require("../assets/mosh.jpg"),
//   },
//   {
//     id: 2,
//     title: "T2",
//     description: "D2",
//     image: require("../assets/mosh.jpg"),
//   },
// ];

function MessageScreen({ navigation }) {
  const { user } = useAuth();
  const [refreshing, setRefresh] = useState(false);

  const {
    data: messages,
    setData: setMessages,
    loading,
    setLoading,
    error,
    request: loadMessage,
  } = useApi(messagesDatabase.getMessages);

  const handleDelete = (message) => {
    console.log("====================================");
    console.log(message);
    console.log("====================================");
    const newMessages = messages.filter(
      (msg) => Object.keys(msg)[0] !== message
    );
    messagesDatabase.deleteMesseage(message);
    setMessages(newMessages);
  };

  const getMessagesArray = async () => {
    await loadMessage(user);
  };

  const refresh = async () => {
    setRefresh(true);
    await getMessagesArray();
    setRefresh(false);
  };

  useEffect(() => {
    getMessagesArray();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />

      {error && <ErrorMessage error={error} visible={error} />}
      <Screen>
        <FlatList
          data={messages}
          keyExtractor={(message) => {
            const id = Object.keys(message)[0].toString();
          }}
          renderItem={({ item }) => {
            const id = Object.keys(item)[0];
            const message = item[id];
            return (
              <ListItem
                title={
                  message.reply
                    ? `${message.from.name} [Replied : ${message.reply} ]`
                    : message.from.name
                }
                subTitle={message.message}
                //image={}
                onPress={() => {
                  const object = {
                    fromUser: message.from,
                    messageToReply: message.message,
                  };
                  navigation.navigate("Reply", object);
                }}
                renderRightActions={() => (
                  <ListItemDeleteAction onDelete={() => handleDelete(id)} />
                )}
              />
            );
          }}
          ItemSeparatorComponent={ListItemSeperator}
          refreshing={refreshing}
          onRefresh={() => refresh()}
        />
      </Screen>
    </>
  );
}

export default MessageScreen;
