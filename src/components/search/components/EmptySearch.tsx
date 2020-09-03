import { Box, Text } from 'react-native-design-utility';
import React from 'react';

const EmptySearch = () => {
  return (
    <Box f={1} center>
      <Text color="grey">No podcast, search something please...</Text>
    </Box>
  );
};

export default EmptySearch;
