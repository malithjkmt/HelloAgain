import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRewards } from '../../redux/rewards/rewards.slice';
import { CLIENT_ID } from '../../utils/constants';
import { Reward } from '../../types/appTypes';
import {
  selectAvailableRewards,
  selectIsFetching,
  selectFetchingError,
  selectIsInitialized,
} from '../../redux/rewards/rewards.slice';

import RewardCard from '../../components/RewardCard';
import { ListEmptyComp, CollectedRewardsSummary, CARD_HEIGHT, CARD_MARGIN } from '../../components';
import { theme } from '../../styles/theme';

const getItemLayout = (data: any, index: number) => ({
  length: CARD_HEIGHT,
  offset: (CARD_HEIGHT + CARD_MARGIN * 2) * index,
  index,
});

const keyExtractor = (item: Reward) => item.id;

const renderItem = ({ item, index }: { item: Reward; index: number }) => (
  <RewardCard reward={item} index={index} />
);

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const availableRewards = useAppSelector(selectAvailableRewards);
  const isFetching = useAppSelector(selectIsFetching);
  const fetchingError = useAppSelector(selectFetchingError);
  const initialized = useAppSelector(selectIsInitialized);

  const onLoad = useCallback(() => {
    dispatch(fetchRewards(CLIENT_ID));
  }, [dispatch]);

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line prettier/prettier
  console.log('Rendering Home Screen with states:', { rewards: availableRewards.length, isFetching, fetchingError, initialized });

  const renderListEmptyComponent = () => {
    if (isFetching && !initialized) {
      return <ActivityIndicator size="large" color={theme.colors.loader} style={styles.loader} />;
    } else if (fetchingError) {
      return <ListEmptyComp message={fetchingError} isError={true} />;
    } else {
      return <ListEmptyComp message="No Loyalty rewards found" />;
    }
  };

  return (
    <View style={styles.container}>
      <>
        <CollectedRewardsSummary />
        <FlatList
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderListEmptyComponent}
          data={availableRewards}
          initialNumToRender={10}
          windowSize={3}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          progressViewOffset={10}
          onRefresh={onLoad}
          refreshing={isFetching}
          getItemLayout={getItemLayout}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightBackground,
  },
  listContainer: {
    paddingTop: 4,
  },
  loader: {
    marginTop: 20,
  },
});

export default HomeScreen;
