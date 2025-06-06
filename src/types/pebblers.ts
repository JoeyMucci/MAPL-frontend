export interface MediumPebbler {
    name: string;
    pebbles: number;
    current_division: string;
    current_rank: number;
    home_pebbles: number;
    away_pebbles: number;
    qp: number;
    at: number;
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
