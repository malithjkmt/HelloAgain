import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../styles/theme';

interface ListEmptyCompProps {
  message: string;
}

export const ListEmptyComp: FC<ListEmptyCompProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 10,
  },
  text: {
    textAlign: 'center',
    color: theme.colors.disabledText,
  },
});
