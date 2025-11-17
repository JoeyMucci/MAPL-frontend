"use client"

import { ComplicatedBout } from "@/types/bouts";
import { FullBout } from "./FullBout";

const complicatedBout: ComplicatedBout = {
  away: {
    name: "Gregory",
    description: "N/A",
    trait: "Skill",
    quirk: "Even Temper",
    ability: "Miracle"
  },
  home: {
    name: "Marcel",
    description: "N/A",
    trait: "Speed",
    quirk: "Untouchable",
    ability: "Will to Win"
  },
  division: "Master",
  year: 2025,
  month: 6,
  day: 5,

  away_roll: 1,
  home_roll: 3,

  away_quirk: true,
  home_quirk: true,

  away_ability: true,
  home_ability: true,

  away_roll_half: 3,
  home_roll_half: 3,
  away_roll_final: 3,
  home_roll_final: 6,

  away_score: 2,
  home_score: 29
};

export const CoolBout = () => (
    <FullBout bout={complicatedBout} />
)