import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { useAppSelector } from '../redux/hooks';
import { selectCollectedRewards } from '../redux/rewards/rewards.slice';
import { theme } from '../styles/theme';

export const CollectedRewardsView = () => {
  const collectedRewards = useAppSelector(selectCollectedRewards);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Collected Rewards: {collectedRewards.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.whiteBackground,
    borderBottomColor: theme.colors.seperatorLine,
    borderBottomWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    elevation: 1,
  },
  text: {
    textAlign: 'center',
    color: theme.colors.defaultText,
    fontSize: 18,
  },
});
