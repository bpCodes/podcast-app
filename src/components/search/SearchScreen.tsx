import React, {useState} from 'react';
import { Box, Text } from 'react-native-design-utility';
// @ts-ignore
import styled from 'styled-components/native';
import { useLazyQuery } from '@apollo/react-hooks';
import { theme } from '../../constants/theme';
import KeyboardDismissView from '../KeyboardDismissView';
import { FlatList, StyleSheet } from 'react-native';
import {SearchQuery, SearchQuery_search, SearchQueryVariables} from '../../types/graphql';
import searchQuery from '../../graphql/query/searchQuery';

const StyledInput = styled.TextInput`
  height: 44px;
  flex: 1;
  background-color: ${theme.color.greyLightest};
  border-radius: 4px;
  padding: 0 ${theme.space.sm}px;
  font-size: ${theme.text.size.md}px;
`;

const SearchScreen = () => {

  const [term, setTerm] = useState<String>('')
  const [search, { data, loading, error }] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery);

  const onSearch = async () => {
    try {
      await search({ variables: { term } });
    } catch (err) {
      console.error('error', err);
    }
  };
  return (
    <KeyboardDismissView>
      <Box f={1} bg="white">
        <Box h={50} w="100%" px="sm" my="sm">
          <StyledInput
            onChangeText={setTerm}
            selectionColor={theme.color.blueLight}
            placeholder="Search Podcast"
            autoCorrect={false}
            onSubmitEditing={onSearch}
            value={term}
          />
        </Box>
        <FlatList<SearchQuery_search>
          keyboardShouldPersistTaps="never"
          style={s.list}
          data={data?.search ?? []}
          renderItem={({ item }) => (
            <Box h={90} dir="row" align="center" px="sm">
              <Box h={70} w={70} bg="blueLight" radius={10} mr={12} />
              <Box>
                <Text bold>Joe</Text>
                <Text size="xs" color="grey">
                  Subtitle
                </Text>
                <Text size="xs">400 episodes</Text>
              </Box>
            </Box>
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </Box>
    </KeyboardDismissView>
  );
};

const s = StyleSheet.create({
  list: {
    minHeight: '100%',
  },
});

export default SearchScreen;
