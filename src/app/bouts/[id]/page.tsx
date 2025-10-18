import { Metadata } from "next";
import BoutPage from "./client";

export const metadata: Metadata = {
  title: 'MAPL | Bouts'
};

export default function Page({
    params,
}: {
    params: Promise<{ id: number }>
}){
  return(<BoutPage params={params}/>)
};