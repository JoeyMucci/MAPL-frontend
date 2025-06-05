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

