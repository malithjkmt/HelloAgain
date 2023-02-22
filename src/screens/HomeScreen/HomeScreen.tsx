import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRewards } from '../../redux/rewards/rewards.slice';
import { Reward } from '../../types/appTypes';
import { CLIENT_ID } from '../../utils/constants';
import {
  selectAvailableRewards,
  selectCollectedRewardsMap,
  collectReward,
} from '../../redux/rewards/rewards.slice';
import { ListEmptyComp, RewardCard, CARD_HEIGHT, CARD_MARGIN } from '../../components';
import { CollectedRewardsView } from '../../views';
import { commonStyles } from '../../styles/commonStyles';
import { theme } from '../../styles/theme';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const availableRewards = useAppSelector(selectAvailableRewards);
  const collectedRewardsMap = useAppSelector(selectCollectedRewardsMap);

  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState<null | string>(null);

  const onLoad = async () => {
    try {
      setIsFetching(true);
      setFetchingError(null);
      await dispatch(fetchRewards(CLIENT_ID)).unwrap();
      setIsFetching(false);
    } catch (err) {
      setIsFetching(false);
      setFetchingError('Error Fetching Rewards');
      console.log('Error fetching rewards: ', err);
    }
  };

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCollect = (i: Reward) => {
    dispatch(collectReward(i));
  };

  const renderRewardCard = ({ item }: { item: Reward }) => (
    <RewardCard
      {...item}
      isCollected={collectedRewardsMap[item.id] || false}
      onCollect={() => onCollect(item)}
    />
  );

  return (
    <View style={styles.container}>
      {fetchingError ? (
        <Text style={commonStyles.errorMessageText}>{fetchingError}</Text>
      ) : (
        <>
          <CollectedRewardsView />
          <FlatList
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<ListEmptyComp message="No Loyalty rewards found" />}
            data={availableRewards}
            keyExtractor={item => item.id.toString()}
            renderItem={renderRewardCard}
            progressViewOffset={200}
            refreshing={isFetching}
            getItemLayout={(data, index) => ({
              length: CARD_HEIGHT,
              offset: (CARD_HEIGHT + CARD_MARGIN * 2) * index,
              index,
            })}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={onLoad}
                tintColor={theme.colors.loader}
                colors={[theme.colors.loader]}
              />
            }
          />
        </>
      )}
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
});

export default HomeScreen;
