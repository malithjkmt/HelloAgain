import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Reward } from '../../types/appTypes';
import HelloAgainAPI from '../../services/HelloAgainAPI';
import { RootState } from '../store';

interface RewardsState {
  availableRewards: Reward[];
  collectedRewards: Reward[];
  collectedRewardsMap: {
    [id: string]: boolean;
  };
  isFetching: boolean;
  fetchingError: string | undefined;
}

const initialState: RewardsState = {
  availableRewards: [],
  collectedRewards: [],
  collectedRewardsMap: {},
  isFetching: true,
  fetchingError: undefined,
};

export const fetchRewards = createAsyncThunk<Reward[], string, { rejectValue: string }>(
  'rewards/fetchRewards',
  async (clientId: string, { rejectWithValue }) => {
    try {
      const data = await HelloAgainAPI.fetchRewards(clientId);
      return data;
    } catch (err) {
      return rejectWithValue((err?.message as string) || 'Error Fetching Rewards');
    }
  },
);

export const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    collectReward: (state: RewardsState, action: PayloadAction<Reward>) => {
      state.collectedRewards.push(action.payload);
      state.collectedRewardsMap[action.payload.id] = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRewards.fulfilled, (state, action) => {
      state.availableRewards = action.payload;
      state.isFetching = false;

      // Reset Collected Rewards
      state.collectedRewards = [];
      state.collectedRewardsMap = {};
    });
    builder.addCase(fetchRewards.rejected, (state, action) => {
      state.availableRewards = [];
      state.fetchingError = action.payload;

      // Reset Collected Rewards
      state.collectedRewards = [];
      state.collectedRewardsMap = {};
    });
  },
});

export const selectAvailableRewards = (state: RootState) => state.rewards.availableRewards;
export const selectCollectedRewards = (state: RootState) => state.rewards.collectedRewards;
export const selectIsFetching = (state: RootState) => state.rewards.isFetching;
export const selectFetchingError = (state: RootState) => state.rewards.fetchingError;

export const isRewardCollected = (id: string) => (store: RootState) => {
  return store.rewards.collectedRewardsMap[id] || false;
};

export const { collectReward } = rewardsSlice.actions;

export default rewardsSlice.reducer;
