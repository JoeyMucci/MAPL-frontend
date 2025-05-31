import { SimplePebbler } from "./pebblers";

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