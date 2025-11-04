import { Metadata } from "next";
import RivalryPage from "./client";

export const metadata: Metadata = {
  title: 'MAPL | Rivalry',
};

export default function Page(){
  return(<RivalryPage />)
};