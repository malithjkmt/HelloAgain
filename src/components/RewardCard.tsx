import React, { FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import { theme } from '../styles/theme';
import { Reward } from '../types/appTypes';
import { Icons, PlaceHolders } from '../assets/images';

interface RewardCardProps extends Reward { }
export const CARD_HEIGHT = 90;
export const CARD_MARGIN = 2;

export const RewardCard: FC<RewardCardProps> = ({ id, name, image, neededPoints }) => {
  return (
    <View style={styles.card} key={id}>
      {image ? (
        <Image
          style={styles.logo}
          source={{
            uri: image,
          }}
        />
      ) : (
        <Image style={styles.logo} source={PlaceHolders.helloAgain} />
      )}

      <View style={styles.centerColumn}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.pointsText}>{neededPoints} Points</Text>
      </View>
      <TouchableOpacity style={styles.actionContainer}>
        <Image style={styles.collectRewardIcon} source={Icons.collectRewardIcon} />
      </TouchableOpacity>
    </View>
  );
};

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
    padding: 10,
  },
  collectRewardIcon: {
    height: 50,
    width: 50,
  },
});
