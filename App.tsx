import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { UtilityThemeProvider } from 'react-native-design-utility';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';
import TrackPlayer from 'react-native-track-player';

import { theme } from './src/constants/theme';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import { client } from './src/graphql/client';
import trackPlayerServices from './src/services/trackPlayerServices';

const track = {
  id: '1',
  title:
    '146: Launching Statamic 3, GitHub Sponsors, Tailwind CSS v1.7, and Preparing for Laracon',
  url: 'https://media.transistor.fm/4683ee54.mp3',
  artist: 'Full Stack radio',
};

const App = () => {
  useEffect(() => {

    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        console.log('player setup');
      });

      TrackPlayer.registerPlaybackService(() => trackPlayerServices);
      await TrackPlayer.add([track]);

      await TrackPlayer.play();

      setTimeout(() => {
        TrackPlayer.stop();
      }, 2000)
    })();
  }, []);

  return (
    <UtilityThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </UtilityThemeProvider>
  );
};

export default App;
