import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const commonStyles = StyleSheet.create({
  errorMessageText: {
    paddingHorizontal: 50,
    textAlign: 'center',
    marginTop: 20,
    color: theme.colors.errorMessage,
  },
});
