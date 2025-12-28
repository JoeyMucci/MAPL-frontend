import { Metadata } from "next";
import FormatPage from "./page";

export const metadata: Metadata = {
  title: 'MAPL | Format'
};
export default function PageLayout(){
  return(<FormatPage />)
};