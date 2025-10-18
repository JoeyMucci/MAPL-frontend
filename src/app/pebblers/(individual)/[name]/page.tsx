import { Metadata } from "next";
import PebblerPage from "./client";

export const metadata: Metadata = {
  title: 'MAPL | Pebblers'
};

export default function Page({
    params,
}: {
    params: Promise<{ name: string }>
}){
  return(<PebblerPage params={params}/>)
};