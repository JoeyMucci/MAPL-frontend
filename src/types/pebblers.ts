export interface FullPebbler {
    name: string;
    pebbles: number;
    current_rank: number | null;
    trait: string;
    quirk: string;
    ability: string;
    away_pebbles: number;
    home_pebbles: number;
    qp: number;
    at: number;
    current_division: string;
    masters: number;
    all_stars: number;
    professionals: number;
    learners: number;
}

export interface PebblerRowStats {
    pebbler: string;
    pebbles: number;
    played: number;
    wins: number;
    ties: number;
    losses: number;
    pf: number;
    pa: number;
    pd: number;
    away_played: number;
    home_played: number;
    away_pebbles: number;
    home_pebbles: number;
    qp: number;
    at: number;
    form: string;
    rank: number;
    previous_rank: number;
}

export interface SimplePebbler {
    name: string;
    current_rank: number;
}

export interface SimplePebblerStats {
    quirk_activated: boolean;
    ability_triggered: boolean;
    roll_final: number | null;
    score: number;
}
