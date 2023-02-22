import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Reward } from '../../types/appTypes';
import HelloAgainAPI from '../../services/HelloAgainAPI';

const dummyData = [
  {
    id: 'c4f89b88-7ddb-4539-8be2-97fdf3b75476',
    name: 'TEST ACTIVATE',
    neededPoints: 100,
  },
  {
    id: 'ea26b5f2-dc1b-4356-955f-42cda4d6dd94',
    name: 'BountyTest',
    neededPoints: 0,
  },
  {
    id: '79e0378e-88b6-4cb0-b123-626b03e61742',
    name: 'UC-Reward-1',
    neededPoints: 0,
  },
  {
    id: '530a214a-e9cd-48c9-a2c8-527d7f4dc7d4',
    name: 'Demo- Shop',
    neededPoints: 1,
  },
  {
    id: '620fc1f9-a446-4c37-ac11-a7d0378a5b73',
    name: 'lorem ipsum | dolor sit amet',
    neededPoints: 10,
  },
  {
    id: '4c791a09-b5dd-4a32-8fb2-8bd82367e374',
    name: 'Gutscheincode: Zillertaler Schürzenjäger',
    neededPoints: 30,
  },
  {
    id: '56b280f8-77a5-4495-953f-bb7a9bffc758',
    name: '10% Rabatt',
    neededPoints: 0,
  },
  {
    id: 'bcc72aa6-f6fa-4a4a-ba1f-de11933b0aa7',
    name: '10% Rabatt',
    neededPoints: 0,
  },
  {
    id: '7086dc9d-1830-48c7-adbf-35e02da8b4ea',
    name: '10% Rabatt',
    neededPoints: 0,
  },
  {
    id: 'd8154353-7cf8-4559-a9fc-f55e23f2dc21',
    name: '10% Rabatt',
    neededPoints: 0,
  },
  {
    id: '4a408fdc-d822-48ae-92d6-72a4f99dffbb',
    name: '2 für 1',
    neededPoints: 0,
  },
  {
    id: 'ea2fe74e-f922-4a92-b117-409a8f94bc26',
    name: '5 Euro Spende für SOS Kinderdorf',
    neededPoints: 0,
  },
  {
    id: '8ea590c3-a661-46fe-9576-e32ab87ff59e',
    name: '5 Euro Spende für SOS Kinderdorf',
    neededPoints: 0,
  },
  {
    id: 'daa30241-7df2-4d5b-8f02-f43cbb2b8188',
    name: '99test',
    neededPoints: 0,
  },
  {
    id: 'ec728921-a5ae-4935-83a7-43d0c42f02ff',
    name: 'ActivatablePromo',
    neededPoints: 0,
  },
  {
    id: 'fde211b8-61c2-41ac-988b-6bcfa4c26bb7',
    name: 'Gratis Gold Brew Sparkling Orange zu deiner Bestellung',
    neededPoints: 0,
  },
  {
    id: '8a8630de-cc34-4914-913c-ef9e1723f6b5',
    name: 'Gratis Gold Brew Sparkling Orange zu deiner Bestellung',
    neededPoints: 0,
  },
  {
    id: '06c12974-0964-46db-99df-119e759c2990',
    name: 'instantReward',
    neededPoints: 0,
  },
  {
    id: '9d5857b1-909d-440d-bc2d-eda579158323',
    name: 'Meine tolle Prämie',
    neededPoints: 0,
  },
  {
    id: '568dc989-0084-4401-9447-c567085e479e',
    name: 'MultiplePromo',
    neededPoints: 0,
  },
  {
    id: 'e0d920ac-d70c-4401-8405-b4f7dc12ec07',
    name: 'MultiplePromo2',
    neededPoints: 0,
  },
  {
    id: '4c174c0d-a54d-421b-bf48-ea4de15752b2',
    name: 'MultiplePromo3',
    neededPoints: 0,
  },
  {
    id: '93fae03a-a2c9-48a5-a82e-65772b7b0a1b',
    name: 'PROMO CODE TEST',
    neededPoints: 0,
  },
  {
    id: 'bd6629f9-92fc-46ab-9f84-f21d784c81b7',
    name: 'SHIPPING TEST',
    neededPoints: 0,
  },
  {
    id: 'c3b7fe08-6983-4e0a-ae14-632a3b947dab',
    name: 'Sofort Test',
    neededPoints: 0,
  },
  {
    id: 'aacccfa9-f28c-4e86-84c1-17c7b356bb73',
    name: 'test activate promo',
    neededPoints: 0,
  },
  {
    id: 'cabdb8d0-c7aa-4de5-8c2f-ca0d6acc7880',
    name: 'TestByApi2',
    neededPoints: 0,
  },
  {
    id: 'c63956d2-aa9d-41a0-96f8-0399e1348f2a',
    name: 'test unlimitiert',
    neededPoints: 1,
  },
  {
    id: '9a7286ba-1459-4912-af53-e1dff966c245',
    name: 'Voucher Test',
    neededPoints: 1,
  },
  {
    id: 'd0b67e1f-853b-4951-b820-3d5b6bc88350',
    name: 'T: ship global limit"><iframe/src="http://1ln2wvnwnksl4gpify1962qzkqqie7.burpcollaborator.net/t"></iframe>',
    neededPoints: 2,
  },
  {
    id: '1e1e9273-67e6-4efd-9e6d-625eea5cbf6d',
    name: 'T: Ship no limit',
    neededPoints: 2,
  },
  {
    id: 'c69e0962-7697-4e4a-bfa8-0729d6804919',
    name: 'Prämie Campaign Update',
    neededPoints: 3,
  },
  {
    id: '10660b65-d97a-4790-baba-d41b3b01371c',
    name: '1 Flasche: Punica (de)',
    neededPoints: 10,
  },
  {
    id: '32a47e38-c941-4e52-839f-6c1a908ee0c3',
    name: 'In Store2',
    neededPoints: 10,
  },
  {
    id: '1f22cbe6-b55d-454c-b27c-cffa50a3ffe8',
    name: 'In Store - needs activation',
    neededPoints: 10,
  },
  {
    id: 'ec02bd0f-d913-4621-9c53-7f844ecdbbaf',
    name: 'In Store - Single Use',
    neededPoints: 10,
  },
  {
    id: '5332c042-9ec0-4cc4-8911-c5d1c6be2634',
    name: 'In Store - Single Use - Kopie',
    neededPoints: 10,
  },
  {
    id: 'ca07eeef-39d0-4027-befb-17da4fefb348',
    name: 'Tamagotchi (jetzt reservieren - limited)',
    neededPoints: 10,
  },
  {
    id: 'd5b3705d-25e4-443e-a25a-22a5b7ef60f1',
    name: 'test 1234',
    neededPoints: 10,
  },
  {
    id: 'f07fe971-b2c9-445c-8c02-1e33b16ca1f3',
    name: 'Test Promo',
    neededPoints: 10,
  },
  {
    id: '912ec7f0-224e-4c2c-911d-39dc77a08016',
    name: '-50% auf 1 Paar Kinderschuhe',
    neededPoints: 12,
  },
  {
    id: '051c487a-7815-46ee-922c-d56c6becaa32',
    name: 'Viele Segmente 2',
    neededPoints: 12,
  },
  {
    id: 'd6e29e8e-0811-4729-a35c-7788a3ad5afc',
    name: 'Viele Segmente 3',
    neededPoints: 13,
  },
  {
    id: 'e4330ab4-5a75-4c2b-b77b-51d3b517e7a7',
    name: 'Alan-Test',
    neededPoints: 100,
  },
  {
    id: '7120063d-cb1b-4ab4-aa59-af216dcc9924',
    name: 'Test reward',
    neededPoints: 200,
  },
  {
    id: 'db0b0a30-b0bb-474e-a9fe-5c089c6019ee',
    name: 'Wjfsfomocp',
    neededPoints: 350,
  },
  {
    id: '9ae5e046-2770-4bad-ade8-59f24c1e0020',
    name: '5 Euro Spende für SOS Kinderdorf',
    neededPoints: 500,
  },
  {
    id: '2fb118d1-f3b7-4199-be57-530f3f11a575',
    name: 'This is a vamed voucher',
    neededPoints: 500,
  },
  {
    id: '87266999-152f-4942-a619-386ab719cfae',
    name: 'Vamed test 2',
    neededPoints: 500,
  },
];

interface RewardsState {
  availableRewards: Reward[];
}

const initialState: RewardsState = {
  availableRewards: dummyData,
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRewards.fulfilled, (state, action) => {
      state.availableRewards = action.payload;
    });
  },
});

export const selectAvailableRewards = (state: RewardsState) => state.availableRewards;

export default rewardsSlice.reducer;
