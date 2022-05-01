import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { Text } from 'react-native';

import AuthContext from "./contexts/Authentication";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY = "vty362fzsycy";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [userId, setUserId] = useState("");

  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  useEffect(() => {
    return () => client.disconnectUser();
  }, []);

  const onChannelPressed = (channel) => {
    setSelectedChannel(channel);
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{ userId, setUserId }}>
          <OverlayProvider>
            <Chat client={client}>
              <Navigation colorScheme={colorScheme} />
            </Chat>
            {/* <Chat client={client} >
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
            </Chat> */}
          </OverlayProvider>
          <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
