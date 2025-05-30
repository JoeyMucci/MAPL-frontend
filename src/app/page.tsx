import { Bout } from "@/components/Bout/Bout";

export default function Home() {
  const divs = ["Master", "All-Star", "Professional", "Learner"];
  return (
    <>
      {divs.map((division, i) => (
        <Bout
          key={i}
          division={division}
          time={new Date("2023-10-01T12:00:00Z")}
          awayPebbler={{
            name: "Dominic Bluey",
            rank: 1,
            trait: "Swift",
            quirk: "Lucky",
            quirkActivated: true,
            ability: "Speed Boost",
            abilityTriggered: true,
            roll: 2,
            rollHalf: 3,
            rollFinal: 4,
            score: 11,
          }}
          homePebbler={{
            name: "Liam",
            rank: 22,
            trait: "Strong",
            quirk: "Clever",
            quirkActivated: false,
            ability: "Power Strike",
            abilityTriggered: false,
            roll: 2,
            rollHalf: 3,
            rollFinal: 4,
            score: 1,
          }}
        />
      ))}
    </>
  );
}
