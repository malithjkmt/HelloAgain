import { Reward } from './appTypes';

export interface RewardDTO {
  id: string;
  name: string;
  needed_points: number;
  image: string;
}

export const rewardFromRewardDTO = ({ id, name, needed_points, image }: RewardDTO): Reward => {
  return {
    id,
    name,
    neededPoints: needed_points,
    image,
  };
};

export type APIResponce = RewardDTO[] | { detail: string };
