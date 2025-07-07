export interface MediumPebbler {
    name: string;
    current_division: string;
    current_rank: number;
    pebbles: number;
    home_pebbles: number;
    away_pebbles: number;
    qp: number;
    at: number;
    ytd_pebbles: number;
    ytd_home_pebbles: number;
    ytd_away_pebbles: number;
    ytd_qp: number;
    ytd_at: number;
    masters: number;
    all_stars: number;
    professionals: number;
    learners: number;
}

export interface SimplePebbler {
    name: string;
    current_rank: number;
}

export interface PersonalPebbler {
    name: string;
    description: string;
    trait: string;
    quirk: string;
    ability: string;
}
