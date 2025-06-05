import { Bout } from "@/components/Bout/Bout";
import { SimpleBout } from "@/types/bouts";
import { Flex, ScrollArea, Stack, Title } from "@mantine/core";
import { divisions } from "@/vars";
import classes from "./page.module.css";
import axios from "axios";

export default async function Home() {
  async function fetchBouts() {
    try {
      console.log("Fetching next day of bouts...")
      const response = await axios.get("http://127.0.0.1:8000/api/bouts/")
      return response.data
    }
    catch (error) {
      console.error("Error fetching data:", error)
      return {}
    }
  }

  const data = await fetchBouts()
  const day = data.day
  const month = data.month
  const bouts: { [key: string]: SimpleBout[] } = data.bout_info

  return (
    <>
      <Title ta="center" order={1}>Daily Bouts: {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}{" "}{day}</Title>
      <Stack>
        {divisions.map((division, i) => (
          <ScrollArea key={i}>
            <Flex my="md" align="center">
              {bouts[division].map((bout, j) => (
                <div className={classes.item} key={j}>
                  <Bout
                    bout={bout}
                  />
                </div>
              ))}
            </Flex>
          </ScrollArea>
        ))}
      </Stack>
    </>
  );
}
