import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { useRoute } from '@react-navigation/native';
import { FeedQuery_feed, SearchQuery_search } from '../../types/graphql';
import { Image, ScrollView } from 'react-native';
import { theme } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {humanDuration} from "../../lib/dateTimeHelper";

const EpisodeDetailsScreen = () => {
  const routeParams = (useRoute().params ?? {}) as {
    episode: FeedQuery_feed;
    podcast: SearchQuery_search;
  };
  return (
    <Box bg="white" f={1}>
      <ScrollView>
        <Box px="sm">
          <Box dir="row" mb="sm">
            <Box
              h={60}
              w={60}
              radius={4}
              style={{ overflow: 'hidden' }}
              mr={12}>
              <Image
                source={{
                  uri:
                    routeParams.episode.image ?? routeParams.podcast.thumbnail,
                }}
                style={{ flex: 1 }}
              />
            </Box>
            <Box f={1}>
              <Text weight="bold" size="sm">
                {routeParams.episode.title}
              </Text>
            </Box>
          </Box>
          <Box dir="row" align="center" mb="sm">
            <FeatherIcon name="play" size={30} color={theme.color.blueLight} />
            <Box>
              <Text weight="bold" size="sm">
                Play
              </Text>
              <Text color="grey" size="xs">
                {humanDuration(routeParams.episode.duration)}
              </Text>
            </Box>
          </Box>
          <Box h={1} bg="greyLightest" mb="sm" />
          <Box>
            <Text size="xl" weight="bold">
              Episode Notes
            </Text>
          </Box>
          <Box f={1} mt="sm">
            <Text>{routeParams.episode.description}</Text>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default EpisodeDetailsScreen;
