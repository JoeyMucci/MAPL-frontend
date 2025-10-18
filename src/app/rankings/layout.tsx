import { Metadata } from "next";
import RankingsPage from "./page";

export const metadata: Metadata = {
  title: 'MAPL | Rankings'
};
export default function PageLayout(){
  return(<RankingsPage />)
};