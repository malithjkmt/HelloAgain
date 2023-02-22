import { rewardFromRewardDTO, APIResponse } from '../types/helloAgainAPITypes';

const fetchRewards = async (clientId: string) => {
  const apiResponse = await fetch(
    `https://staging.helloagain.at/api/v1/clients/${clientId}/bounties`,
  );

  const apiResponseJSON: APIResponse = await apiResponse.json();
  console.log('apiResponseJSON: ', apiResponseJSON);

  if (Array.isArray(apiResponseJSON)) {
    return apiResponseJSON.map(i => rewardFromRewardDTO(i));
  } else if (apiResponseJSON?.detail) {
    throw new Error(apiResponseJSON.detail);
  } else {
    return [];
  }
};

export default { fetchRewards };
