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

export interface PerformanceSummary {
    pebbles: number;
    rank: number;
    division: string;
    month: number;
    year: number;
}

export interface CareerSummary {
    division: string;
    cnt: number;
    avg_rank: number;
    worst_rank: number;
    best_rank: number;
    avg_pebbles: number;
    worst_pebbles: number;
    best_pebbles: number;
    avg_wins: number;
    worst_wins: number;
    best_wins: number;
    avg_losses: number;
    best_losses: number;
    worst_losses: number;
    avg_pf: number;
    worst_pf: number;
    best_pf: number;
    avg_pa: number;
    best_pa: number;
    worst_pa: number;
    avg_pd: number;
    worst_pd: number;
    best_pd: number;
    avg_qp: number;
    worst_qp: number;
    best_qp: number;
    avg_at: number;
    worst_at: number;
    best_at: number;
}

export interface RivalryPebbles {
    one_score: number;
    two_score: number;
}

export interface RivalryResults {
    one_wins: number;
    two_wins: number;
    ties: number;
}