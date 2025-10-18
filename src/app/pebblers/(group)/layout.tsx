import { Metadata } from "next";
import PebblersPage from "./page";

export const metadata: Metadata = {
  title: 'MAPL | Pebblers'
};
export default function PageLayout(){
  return(<PebblersPage />)
};