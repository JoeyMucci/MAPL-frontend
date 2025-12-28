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

import { theme } from "./theme";

export const leagueStart: string = "2026-01-01"

export const MATCHES_PER_ROUND = 12
export const FORM_THRESHOLD = 5
export const PROMOTE_DEMOTE = 5
export const PEBBLERS_PER_DIVISION = 25

export const divisions: string[] = ["Master", "All-Star", "Professional", "Learner"]

export const tabs: string[] = ["Meet the Pebbler", "Activity Log", "Performance History", "Look Deeper"]

export const colorMap: { [key: string]: string } = {
    "Master": theme.colors!.red![6],
    "All-Star": theme.colors!.blue![6],
    "Professional": theme.colors!.gray![6],
    "Learner": theme.colors!.yellow![6],
    "Meet the Pebbler": theme.colors!.red![6],
    "Activity Log": theme.colors!.blue![6],
    "Performance History": theme.colors!.gray![6],
    "Look Deeper": theme.colors!.yellow![6],
    "Grace": theme.colors!.red![6],
    "Skill": theme.colors!.blue![6],
    "Power": theme.colors!.gray![6],
    "Speed": theme.colors!.yellow![6],
    "Merged": theme.colors!.red![6],
    "Ari": theme.colors!.blue![6],
    "Patrick": theme.colors!.gray![6],
    "Lippo": theme.colors!.yellow![6],
    "W": theme.colors!.goodGreen![6],
    "L": theme.colors!.alarmRed![6],
    "T": theme.colors!.midBlue![6],
}

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
    "Grace": "1, 2, 4, 4, 5, 5",
    "Skill": "1, 3, 3, 4, 4, 6",
    "Power": "1, 1, 2, 5, 5, 6",
    "Speed": "1, 1, 3, 3, 6, 6",
}

export const quirkDescMap: { [key: string]: string } = {
    "Pity Pebble": "If trailing by two or more, gain pebble instantly",
    "Proud Pebble": "If leading by two or more, gain pebble instantly",
    "Oddball": "If roll parity differs from day parity and opponent's roll parity, gain pebble instantly",
    "Even Temper": "If roll parity matches day parity and opponent's roll parity, gain pebble instantly",
    "Untouchable": "If opponent's roll is one, gain pebble instantly",
}

export const abilityDescMap: { [key: string]: string } = {
    "Miracle": "If trailing opponent, upgrade your roll to opponent's roll (12% trigger rate)",
    "Lucky Seven": "If leading opponent, upgrade your roll to 7 (12% trigger rate)",
    "Generosity": "If tied with opponent, double your tie bonus (36% trigger rate)",
    "Will to Win": "If tied with opponent, reroll and double your win bonus (36% trigger rate)",
    "Tip the Scales": "If trailing by one, switch your roll with opponent's roll (24% trigger rate)",
}

export const abilityActionMap: { [key: string]: string } = {
    "Miracle": "upgrades roll to opponent's roll",
    "Lucky Seven": "upgrades roll to 7",
    "Generosity": "doubles tie bonus",
    "Will to Win": "rerolls and doubles win bonus",
    "Tip the Scales": "switches roll with opponent",
}

export const quirkMultMap: { [key: string]: number } = {
    "Master": 2,
    "All-Star": 2,
    "Professional": 1,
    "Learner": 1,
}

export const abilityMultMap: { [key: string]: number } = {
    "Master": 2,
    "All-Star": 1,
    "Professional": 1,
    "Learner": 0,
}

export const pebblerNameList = [
    'Ally', 'Ally Jr.', 'Almond', 'Aurora', 'Aversa', 'Baby', 'Bamboo', 'Banji', 'Barry', 'Beefcake',
    'Berry', 'Bert', 'Bload', 'Bloshi', 'Bloshi Jr.', 'Bonez', 'Brad', 'Bumper', 'Buzz', 'Cammy',
    'Carrotz', 'Casey', 'Chad', 'Chalk', 'Chaucer', 'Cream', 'Croc', 'Cuddlez', 'Daffy', 'Dave',
    'Dominic Bluey', 'Doug', 'Duke', 'Duncan', 'Edward', 'Ethan', 'Felix', 'Flapper', 'Flippo', 'Frederick',
    'Glad', 'Gnaf', 'Gregory', 'Grumps', 'Hayley', 'Hugz', 'Ignatius', 'Ima Reddy', 'Jiggy', 'Jolly',
    'Jonathan', 'Juan', 'Julie B.', 'Leo', 'Liam', 'Logan', 'Luke', 'Marcel', 'Marvin', 'Matthew',
    'Mertz', 'Monet', 'Moshi', 'Ness', 'Nickelby', 'Nut', 'Osh', 'Owen', 'Pabu', 'Papa',
    'Pete', 'Pigion', 'Pinky', 'Pip', 'Raito', 'Road', 'Ruby', 'Ruth', 'Shell', 'Shortstop',
    'Simon', 'Sir Rocco', 'Snow', 'Spencer', 'Spot', 'Sprinkle', 'Stewart', 'Straw', 'Stretch', 'Stripe',
    'Taro', 'Timmy', 'Toast', 'Tom', 'Tonkotsu', 'Tony', 'Waddles', 'Wasabi', 'Watson', 'Yoad',
]
