import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ListenNowScreen from '../components/listenNow/ListenNowScreen';
import SearchScreen from '../components/search/SearchScreen';
import LibraryScreen from '../components/library/LibraryScreen';
import PodcastDetailsScreen from '../components/pocastDetails/PodcastDetailsScreen';
import { theme } from '../constants/theme';

const ListenNowStack = createStackNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        options={{
          title: 'Listen Now',
        }}
        name="ListenNow"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTintColor: theme.color.blueLight,
      }}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen
        options={{
          headerTitle: '',
        }}
        name="PodcastDetails"
        component={PodcastDetailsScreen}
      />
    </SearchStack.Navigator>
  );
};

const LibraryStack = createStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="Library" component={LibraryScreen} />
    </LibraryStack.Navigator>
  );
};

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <React.Fragment>
      <MainTab.Navigator>
        <MainTab.Screen
          options={{
            title: 'Listen Now',
          }}
          name="ListenNow"
          component={ListenNowStackNavigator}
        />
        <MainTab.Screen name="Library" component={LibraryStackNavigator} />
        <MainTab.Screen name="Search" component={SearchStackNavigator} />
      </MainTab.Navigator>
    </React.Fragment>
  );
};
MainTabNavigator.defaultProps = {};

MainTabNavigator.propTypes = {};

export default MainTabNavigator;
