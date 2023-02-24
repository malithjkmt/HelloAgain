import React, { FC, memo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import { theme } from '../styles/theme';
import { Reward } from '../types/appTypes';
import { Icons, PlaceHolders } from '../assets/images';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { isRewardCollected, collectReward } from '../redux/rewards/rewards.slice';

interface RewardCardProps {
  reward: Reward;
  index: number;
}

export const CARD_HEIGHT = 90;
export const CARD_MARGIN = 2;

const RewardCard: FC<RewardCardProps> = props => {
  const { id, name, image, neededPoints } = props.reward;
  const dispatch = useAppDispatch();
  const isCollected = useAppSelector(isRewardCollected(id));

  const onCollect = () => {
    dispatch(collectReward(props.reward));
  };

  console.log('Rendring Reward Card: ', props.index);
  return (
    <View style={styles.card} key={id}>
      {image ? (
        <FastImage
          style={styles.logo}
          source={{
            uri: image,
            priority: FastImage.priority.high,
          }}
        />
      ) : (
        <Image style={styles.logo} source={PlaceHolders.helloAgain} />
      )}

      <View style={styles.centerColumn}>
        <Text
          style={styles.nameText}
          allowFontScaling={false}
          numberOfLines={2}
          ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.pointsText} allowFontScaling={false}>
          {neededPoints} Points
        </Text>
      </View>
      <TouchableOpacity style={styles.actionContainer} disabled={isCollected} onPress={onCollect}>
        {!isCollected && (
          <Image style={styles.collectRewardIcon} source={Icons.collectRewardIcon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default memo(RewardCard);

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    marginVertical: CARD_MARGIN,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.cardBackground,

    // Shadow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    elevation: 0.7,
  },
  logo: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: theme.colors.emptyImage,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerColumn: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  nameText: {
    fontSize: 18,
  },
  pointsText: {
    fontSize: 18,
    color: theme.colors.lightText,
  },
  actionContainer: {
    height: 70,
    width: 70,
    padding: 10,
  },
  collectRewardIcon: {
    height: 50,
    width: 50,
  },
});
