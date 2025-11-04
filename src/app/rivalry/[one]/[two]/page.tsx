import { Metadata } from "next";
import RivalryPage from "./client";

export const metadata: Metadata = {
  title: 'MAPL | Rivalry'
};

export default function Page({
    params,
}: {
    params: Promise<{ one: string, two: string }>
}){
  return(<RivalryPage params={params}/>)
};