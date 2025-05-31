import { FC } from "react";
import { Bout } from "@/components/Bout/Bout";
import { SimpleBout } from "@/types/bouts";
import { Flex, ScrollArea, Title } from "@mantine/core";
import classes from "./page.module.css";
import axios from "axios";

export default async function Home() {
  async function fetchData() {
    try {
      console.log("Fetching next day of bouts...");
      const response = await axios.get("http://127.0.0.1:8000/api/bouts/");
      return response.data;
    }
    catch (error) {
      console.error("Error fetching data:", error);
      return {};
    }
  }

  const data = await fetchData();
  const day = data.day
  const month = data.month
  const bouts: SimpleBout[] = data.bout_info

  return (
    <>
      <Title ta="center" order={1}>Daily Bouts: {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}{" "}{day}</Title>
      <ScrollArea>
        <Flex my="md" align="center">

          {bouts.map((bout, i) => (
            <div className={classes.item} key={i}>
              <Bout
                bout={bout}
              />
            </div>
          ))}
        </Flex>
      </ScrollArea>
    </>
  );
}
