import { Metadata } from "next";
import PebblerPage from "./page";

export const metadata: Metadata = {
  title: 'MAPL | Pebblers'
};

export default async function PageLayout({
    params,
}: {
    params: Promise<{ name: string }>
}){
  return(<PebblerPage params={params}/>)
};