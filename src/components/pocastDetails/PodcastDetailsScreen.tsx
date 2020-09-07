import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { RouteProp, useRoute } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useQuery } from '@apollo/react-hooks';
import { SearchStackRouteParamsList } from '../../navigators/types';
import { ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';
import { FeedQuery, FeedQueryVariables } from '../../types/graphql';
import feedQuery from '../../graphql/query/feedQuery';
import { getWeekDay, humanDuration } from '../../lib/dateTimeHelper';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;
const PodcastDetailsScreen = () => {
  const { data: podcastData } = useRoute<NavigationParams>().params ?? {};
  const { data, loading } = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {
      feedUrl: podcastData.feedUrl,
    },
  });

  return (
    <>
      <Box f={1} bg="white">
        <FlatList
          ItemSeparatorComponent={() => (
            <Box w="100%" px="sm" my="sm">
              <Box
                style={{ height: StyleSheet.hairlineWidth }}
                bg="greyLighter"
              />
            </Box>
          )}
          ListHeaderComponent={
            <>
              <Box dir="row" px="sm" mt="sm" mb="md">
                {podcastData.thumbnail && (
                  <Box mr={12}>
                    <Image
                      source={{ uri: podcastData.thumbnail }}
                      style={s.thumbnail}
                    />
                  </Box>
                )}
                <Box f={1}>
                  <Text size="lg" bold>
                    {podcastData.podcastName}
                  </Text>
                  <Text size="xs" color="grey">
                    {podcastData.artist}
                  </Text>
                  <Text size="xs" color="blueLight">
                    Subscribed
                  </Text>
                </Box>
              </Box>
              <Box dir="row" px="sm" mb="md" align="center">
                <Box mr={12}>
                  <FeatherIcon
                    name="play"
                    size={30}
                    color={theme.color.blueLight}
                  />
                </Box>
                <Box f={1}>
                  <Text bold>Play</Text>
                  <Text size="sm">{data?.feed[0].title}</Text>
                </Box>
              </Box>
              <Box px="sm" mb="md">
                <Text bold size="lg">
                  Episodes
                </Text>
              </Box>
              {loading && (
                <Box h={200} center>
                  <ActivityIndicator
                    size="large"
                    color={theme.color.blueLight}
                  />
                </Box>
              )}
            </>
          }
          data={data?.feed}
          renderItem={({ item }) => (
            <Box px="sm">
              <Text size="sm" color="grey">
                {getWeekDay(new Date(item.pubDate)).toUpperCase()}
              </Text>
              <Text bold>{item.title}</Text>
              <Text size="sm" color="grey" numberOfLines={2}>
                {item.description}
              </Text>
              <Text size="sm" color="grey">
                {humanDuration(item.duration)}
              </Text>
            </Box>
          )}
          keyExtractor={(item) => item.linkUrl}
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
