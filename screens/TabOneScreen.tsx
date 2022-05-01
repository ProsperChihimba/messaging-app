import { StyleSheet } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  const onChannelPressed = (channel) => {
    setSelectedChannel(channel);
  }

  return (
    <>
      {selectedChannel ? (
        <Channel channel={selectedChannel}>
          <Text
            style={{ margin: 50 }}
            onPress= {() => setSelectedChannel(null)}
          >Back</Text>
          <MessageList />
          <MessageInput />
        </Channel>
      ) : (
          <ChannelList onSelect={onChannelPressed}/>
        )}
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
