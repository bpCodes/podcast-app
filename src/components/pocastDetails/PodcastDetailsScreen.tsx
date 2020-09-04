import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SearchStackRouteParamsList } from '../../navigators/types';
import { FlatList, Image, StyleSheet } from 'react-native';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;
const PodcastDetailsScreen = () => {
  const { data } = useRoute<NavigationParams>().params ?? {};
  return (
    <>
      <Box f={1} bg="white">
        <FlatList
          ItemSeparatorComponent={() => (
            <Box w="100%" px="sm" my="sm">
              <Box style={{ height: StyleSheet.hairlineWidth }} bg="greyLighter" />
            </Box>
          )}
          ListHeaderComponent={
            <>
              <Box dir="row" px="sm" mt="sm" mb="md">
                {data.thumbnail && (
                  <Box mr={12}>
                    <Image
                      source={{ uri: data.thumbnail }}
                      style={s.thumbnail}
                    />
                  </Box>
                )}
                <Box f={1}>
                  <Text size="lg" bold>
                    {data.podcastName}
                  </Text>
                  <Text size="xs" color="grey">
                    {data.artist}
                  </Text>
                  <Text size="xs" color="blueLight">
                    Subscribed
                  </Text>
                </Box>
              </Box>
              <Box px="sm" mb="md">
                <Text>Play last episode</Text>
              </Box>
              <Box px="sm" mb="md">
                <Text bold size="lg">
                  Episodes
                </Text>
              </Box>
            </>
          }
          data={[{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }]}
          renderItem={() => (
            <Box px="sm">
              <Text size="sm" color="grey">
                Friday
              </Text>
              <Text bold>#400 - Title</Text>
              <Text size="sm" color="grey" numberOfLines={2}>
                Some descriptioon about some podcast about gary vee. Some
                descriptioon about some podcast about gary vee
              </Text>
              <Text size="sm" color="grey">
                3hrs. 13min
              </Text>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </>
  );
};

const s = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 4,
  },
});

export default PodcastDetailsScreen;
