import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAppDispatch } from '../../redux/hooks';
import { fetchRewards } from '../../redux/rewards/rewards.slice';

const CLIENT_ID = '5189';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const onLoad = async () => {
    try {
      setIsFetching(true);
      // await dispatch(fetchRewards(CLIENT_ID)).unwrap();
      setIsFetching(false);
    } catch (err) {
      setIsFetching(false);
      console.log('Error fetching rewards: ', err);
    }
  };

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello Again</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
