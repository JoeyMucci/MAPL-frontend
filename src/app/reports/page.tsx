import { Metadata } from "next";
import ReportsPage from "./client";

export const metadata: Metadata = {
  title: 'MAPL | Reports'
};

export default function Page(){
  return(<ReportsPage />)
};