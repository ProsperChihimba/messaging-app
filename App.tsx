import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { Text } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY = "vty362fzsycy";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isReady, setIsReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  useEffect(() => {
    const connectUser = async () => { 
      await client.connectUser(
        {
          id: 'proc',
          name: 'prosper',
          image: 'https://avatars.githubusercontent.com/u/72831371?v=4',
        },
        client.devToken('proc'),
      ); 

      //channel
      const channel = client.channel("messaging", "GutaChannel", { name: 'Guta' });
      await channel.watch();
      setIsReady(true);
    };

    connectUser();

    return () => client.disconnectUser();
  }, []);

  const onChannelPressed = (channel) => {
    setSelectedChannel(channel);
  }

  if (!isLoadingComplete || !isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <OverlayProvider>
          <Chat client={client} >
            {/* <Navigation colorScheme={colorScheme} /> */}
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
          </Chat>
        </OverlayProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
