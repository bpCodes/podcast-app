import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { DBContext } from '../../contexts/DbContext';

const LibraryScreen = () => {
  const dbContext = React.useContext(DBContext);
  return (
    <Box f={1} center>

      {dbContext.podcasts.map((podcast) => (
        <Box key={podcast.feedUrl}>
          <Text>{podcast.name}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default LibraryScreen;
