import { Metadata } from "next";
import BoutsPage from "./client";

export const metadata: Metadata = {
  title: 'MAPL | Bouts'
};

export default function Page(){
  return(<BoutsPage />)
};