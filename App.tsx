import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { UtilityThemeProvider, Box } from 'react-native-design-utility';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';
import TrackPlayer from 'react-native-track-player';

import { theme } from './src/constants/theme';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import { client } from './src/graphql/client';
import { ActivityIndicator } from 'react-native';
import { PlayerContextProvider } from './src/contexts/PlayerContext';

const App = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      console.log('player setup');
      TrackPlayer.updateOptions({
        capabilities: []
      })
      setIsReady(true);
    });
  }, []);

  return (
    <UtilityThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        {isReady ? (
          <PlayerContextProvider>
            <NavigationContainer>
              <MainStackNavigator />
            </NavigationContainer>
          </PlayerContextProvider>
        ) : (
          <Box f={1} center>
            <ActivityIndicator />
          </Box>
        )}
      </ApolloProvider>
    </UtilityThemeProvider>
  );
};

export default App;
