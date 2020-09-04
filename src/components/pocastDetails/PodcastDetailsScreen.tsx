import React from 'react';
import { Box } from 'react-native-design-utility';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SearchStackRouteParamsList } from '../../navigators/types';
import { Text } from 'react-native';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;
const PodcastDetailsScreen = () => {
  const { data } = useRoute<NavigationParams>().params ?? {};
  return (
    <>
      <Box f={1} bg="white">
        <Text>{data.podcastName}</Text>
      </Box>
    </>
  );
};

export default PodcastDetailsScreen;
