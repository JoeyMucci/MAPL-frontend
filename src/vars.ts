import {
    IconFeatherFilled,
    IconDropletFilled,
    IconMeat,
    IconBoltFilled,
    IconMoodCry,
    IconMoodHappy,
    IconWaveSine,
    IconCircuitResistor,
    IconShieldFilled,
    IconSparkles,
    IconPlayCard7,
    IconHeartHandshake,
    IconSwords,
    IconScale,
} from "@tabler/icons-react";

export const divisions: string[] = ["Master", "All-Star", "Professional", "Learner"]

export const tabs: string[] = ["Meet the Pebbler", "Activity Log", "Performance History", "Look Deeper"]

export const colorMap: { [key: string]: string } = {
    "Master": "red",
    "All-Star": "blue",
    "Professional": "gray",
    "Learner": "yellow",
    "Meet the Pebbler": "red",
    "Activity Log": "blue",
    "Performance History": "gray",
    "Look Deeper": "yellow",
    "Grace": "red",
    "Skill": "blue",
    "Power": "gray",
    "Speed": "yellow",
    "W": "goodGreen",
    "L": "alarmRed",
    "T": "midBlue",
    "D": "midBlue", // Remove when db is fixed from D->T
};

export const traitMap: { [key: string]: typeof IconFeatherFilled } = {
    "Grace": IconFeatherFilled,
    "Skill": IconDropletFilled,
    "Power": IconMeat,
    "Speed": IconBoltFilled,
}

export const quirkMap: { [key: string]: typeof IconFeatherFilled } = {
    "Pity Pebble": IconMoodCry,
    "Proud Pebble": IconMoodHappy,
    "Oddball": IconWaveSine,
    "Even Temper": IconCircuitResistor,
    "Untouchable": IconShieldFilled,
}

export const abilityMap: { [key: string]: typeof IconFeatherFilled } = {
    "Miracle": IconSparkles,
    "Lucky Seven": IconPlayCard7,
    "Generosity": IconHeartHandshake,
    "Will to Win": IconSwords,
    "Tip the Scales": IconScale,
}

export const traitDescMap: { [key: string]: string } = {
    "Grace": "Roll a die with faces 1, 2, 4, 4, 5, 5",
    "Skill": "Roll a die with faces 1, 3, 3, 4, 4, 6",
    "Power": "Roll a die with faces 1, 1, 2, 5, 5, 6",
    "Speed": "Roll a die with faces 1, 1, 3, 3, 6, 6",
}

export const quirkDescMap: { [key: string]: string } = {
    "Pity Pebble": "If trailing by more than one, gain pebble instantly",
    "Proud Pebble": "If leading by more than one, gain pebble instantly",
    "Oddball": "If roll parity differs from round parity and opponent roll parity, gain pebble instantly",
    "Even Temper": "If roll parity matches round parity and opponent roll parity, gain pebble instantly",
    "Untouchable": "If opponent roll is one, gain pebble instantly",
}

export const abilityDescMap: { [key: string]: string } = {
    "Miracle": "If trailing opponent, upgrade roll to opponent's roll (12% trigger rate)",
    "Lucky Seven": "If leading opponent, upgrade roll to 7 (12% trigger rate)",
    "Generosity": "If tied with opponent, double draw bonus (36% trigger rate)",
    "Will to Win": "If tied with opponent, reroll and double win bonus (36% trigger rate)",
    "Tip the Scales": "If trailing by one, switch rolls with opponent (24% trigger rate)",
}

export const abilityActionMap: { [key: string]: string } = {
    "Miracle": "upgrades roll to opponent's roll",
    "Lucky Seven": "upgrades roll to 7",
    "Generosity": "doubles draw bonus",
    "Will to Win": "rerolls and doubles win bonus",
    "Tip the Scales": "switches roll with opponent",
}

export const quirkMultMap: { [key: string]: number } = {
    "Master": 2,
    "All-Star": 2,
    "Professional": 1,
    "Learner": 1,
}
