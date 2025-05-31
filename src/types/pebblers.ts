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
