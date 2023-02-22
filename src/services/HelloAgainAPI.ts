import { rewardFromRewardDTO, APIResponce } from '../types/helloAgainAPITypes';

const fetchRewards = async (clientId: string) => {
  try {
    const apiResponse = await fetch(
      `https://staging.helloagain.at/api/v1/clients/${clientId}/bounties`,
    );
    const apiResponseJSON: APIResponce = await apiResponse.json();
    console.log('apiResponseJSON: ', apiResponseJSON);

    if (Array.isArray(apiResponseJSON)) {
      return apiResponseJSON.map(i => rewardFromRewardDTO(i));
    } else if (apiResponseJSON?.detail) {
      throw new Error(apiResponseJSON.detail);
    } else {
      return [];
    }
  } catch (err) {
    console.log('Error fetching rewards: ', err);
    throw err;
  }
};

export default { fetchRewards };
