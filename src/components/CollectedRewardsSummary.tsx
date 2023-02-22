import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { useAppSelector } from '../redux/hooks';
import { selectCollectedRewards } from '../redux/rewards/rewards.slice';
import { theme } from '../styles/theme';

export const CollectedRewardsSummary = () => {
  const collectedRewards = useAppSelector(selectCollectedRewards);

  return (
    <View style={styles.container}>
      <Text style={styles.labelText} allowFontScaling={false}>
        Collected Rewards:
      </Text>
      <Text style={styles.valueText} allowFontScaling={false}>
        {collectedRewards.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
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
  labelText: {
    flex: 2.5,
    textAlign: 'right',
    color: theme.colors.defaultText,
    fontSize: 18,
  },
  valueText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 5,
    color: theme.colors.defaultText,
    fontSize: 18,
  },
});
