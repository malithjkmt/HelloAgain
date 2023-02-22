import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../styles/theme';

interface ListEmptyCompProps {
  message: string;
  isError?: boolean;
}

export const ListEmptyComp: FC<ListEmptyCompProps> = ({ message, isError }) => (
  <View style={styles.container}>
    <Text
      style={[
        styles.text,
        { color: isError ? theme.colors.errorMessage : theme.colors.lightText },
      ]}>
      {message}
    </Text>
    <Text style={styles.tryAgainText}>Pull to Try Again</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 10,
  },
  text: {
    textAlign: 'center',
  },
  tryAgainText: {
    marginTop: 10,
    textAlign: 'center',
    color: theme.colors.lightText,
  },
});
