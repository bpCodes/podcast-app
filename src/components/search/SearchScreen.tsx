import React, { useState } from 'react';
import { Box, Text } from 'react-native-design-utility';
import FeatherIcon from 'react-native-vector-icons/Feather';
// @ts-ignore
import styled from 'styled-components/native';
import { useLazyQuery } from '@apollo/react-hooks';
import { theme } from '../../constants/theme';
import KeyboardDismissView from '../KeyboardDismissView';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import {
  SearchQuery,
  SearchQuery_search,
  SearchQueryVariables,
} from '../../types/graphql';
import searchQuery from '../../graphql/query/searchQuery';
import EmptySearch from './components/EmptySearch';
import SearchTile from './components/SearchTile';

const StyledInput = styled.TextInput`
  height: 44px;
  flex: 1;
  font-size: ${theme.text.size.md}px;
`;

const SearchScreen = () => {
  const [term, setTerm] = useState<string>('');
  const [search, { data, loading, error }] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery);

  const onSearch = async () => {
    try {
      await search({ variables: { term } });
    } catch (err) {}
  };
  return (
    <KeyboardDismissView>
      <Box f={1} bg="white">
        <Box h={50} w="100%" px="sm" my="sm">
          <Box
            dir="row"
            align="center"
            h={40}
            bg="greyLightest"
            radius={4}
            px="sm">
            <Box mr={12}>
              <FeatherIcon
                name="search"
                size={24}
                color={theme.color.greyDark}
              />
            </Box>
            <StyledInput
              onChangeText={setTerm}
              selectionColor={theme.color.blueLight}
              placeholder="Search Podcast"
              autoCorrect={false}
              onSubmitEditing={onSearch}
              value={term}
            />
          </Box>
        </Box>
        {error ? (
          <Box f={1} center>
            <Text color="red">{error?.message}</Text>
          </Box>
        ) : (
          <FlatList<SearchQuery_search>
            keyboardShouldPersistTaps="never"
            contentContainerStyle={s.listContentContainer}
            ListHeaderComponent={
              <>
                {loading && (
                  <Box f={1} center h={300}>
                    <ActivityIndicator
                      size="large"
                      color={theme.color.blueLight}
                    />
                  </Box>
                )}
              </>
            }
            ListEmptyComponent={<>{!loading && <EmptySearch />}</>}
            data={data?.search ?? []}
            renderItem={({ item }) => <SearchTile item={item} />}
            keyExtractor={(item) => String(item.feedUrl)}
          />
        )}
      </Box>
    </KeyboardDismissView>
  );
};

const s = StyleSheet.create({
  listContentContainer: {
    // minHeight: '100%',
    paddingBottom: 90,
  },
});

export default SearchScreen;
