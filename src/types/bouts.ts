import { PersonalPebbler, SimplePebbler } from "./pebblers";

export interface SimpleBout {
    away: SimplePebbler;
    home: SimplePebbler;
    division: string;
    time: string; // ISO 8601 format
    away_quirk: boolean;
    home_quirk: boolean;
    away_ability: boolean;
    home_ability: boolean;
    away_roll_final: number | null;
    home_roll_final: number | null;
    away_score: number;
    home_score: number;
}


export interface ComplicatedBout {
    away: PersonalPebbler;
    home: PersonalPebbler;
    division: string;
    year: number;
    month: number;
    day: number;
    away_roll: number | null;
    home_roll: number | null;
    away_quirk: boolean;
    home_quirk: boolean;
    away_ability: boolean;
    home_ability: boolean;
    away_roll_half: number | null;
    home_roll_half: number | null;
    away_roll_final: number | null;
    home_roll_final: number | null;
    away_score: number;
    home_score: number;
}