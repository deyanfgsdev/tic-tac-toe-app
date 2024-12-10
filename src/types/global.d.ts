/* Social Media */

interface SocialMedia {
  id: number;
  icon: IconDefinition;
  url: string;
}

export type SocialMediaList = SocialMedia[];

/* Player */

export interface Player {
  id: number;
  name: string;
  imgSrc: `https://i.ibb.co/${string}/${string}`;
  alt: string;
}

export type Players = [Player, Player];

/* Winner Combinations */

type WinnerCombination = [number, number, number];

export type WinnerCombinations = [
  WinnerCombination,
  WinnerCombination,
  WinnerCombination,
  WinnerCombination,
  WinnerCombination,
  WinnerCombination,
  WinnerCombination,
  WinnerCombination,
];
