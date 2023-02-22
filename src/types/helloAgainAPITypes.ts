import { Reward } from './appTypes';

export interface RewardDTO {
  id: string;
  name: string;
  needed_points: number;
}

export const rewardFromRewardDTO = ({ id, name, needed_points }: RewardDTO): Reward => {
  return {
    id,
    name,
    neededPoints: needed_points,
  };
};

export type APIResponce = RewardDTO[] | { detail: string };
