import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { usePlayerContext } from '../../contexts/PlayerContext';
import { Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../constants/theme';

const MiniPlayer = () => {
  const playerContext = usePlayerContext();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }
  return (
    <Box
      h={75}
      bg="white"
      px="sm"
      style={{ borderTopWidth: 1, borderTopColor: theme.color.greyLightest }}>
      <Box f={1} dir="row" align="center" justify="between">
        <Box h={50} w={50} bg="blueLight" radius={4} mr={10} style={{overflow: 'hidden'}}>
          <Image source={{ uri: playerContext.currentTrack?.artwork }} style={{flex: 1}} />
        </Box>
        <Box f={1} mr={20}>
          <Text numberOfLines={1}>{playerContext.currentTrack?.title}</Text>
        </Box>
        {playerContext.isPaused && (
          <TouchableOpacity onPress={() => playerContext.play()}>
            <Icon name="play" size={32} />
          </TouchableOpacity>
        )}
        {playerContext.isPlaying && (
          <TouchableOpacity onPress={playerContext.pause}>
            <Icon name="pause" size={32} />
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  );
};

export default MiniPlayer;
