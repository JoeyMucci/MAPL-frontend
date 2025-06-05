export interface SimplePebblerStats {
    quirk_activated: boolean;
    ability_triggered: boolean;
    roll_final: number | null;
    score: number;
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
    form: string;
    rank: number;
    previous_rank: number;
}

export interface History {
    distribution: DivisionCounts;
    perfomances: PerformanceSummary[];
}

export interface DivisionCounts {
    masters: number;
    all_stars: number;
    professionals: number;
    learners: number;
}

export interface PerformanceSummary {
    pebbles: number;
    rank: number;
    division: string;
    month: number;
    year: number;
}