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
}

const initialState: RewardsState = {
  availableRewards: [],
  collectedRewards: [],
  collectedRewardsMap: {},
};

export const fetchRewards = createAsyncThunk(
  'rewards/fetchRewards',
  async (clientId: string, { rejectWithValue }) => {
    try {
      const data = await HelloAgainAPI.fetchRewards(clientId);
      return data;
    } catch (err) {
      return rejectWithValue(err);
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

      // Reset Collected Rewards
      state.collectedRewards = [];
      state.collectedRewardsMap = {};
    });
  },
});

export const selectAvailableRewards = (state: RootState) => state.rewards.availableRewards;
export const selectCollectedRewards = (state: RootState) => state.rewards.collectedRewards;
export const selectCollectedRewardsMap = (state: RootState) => state.rewards.collectedRewardsMap;

export const { collectReward } = rewardsSlice.actions;

export default rewardsSlice.reducer;
