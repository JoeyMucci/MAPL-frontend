import { Metadata } from "next";
import GlossaryPage from "./client";

export const metadata: Metadata = {
  title: 'MAPL | Glossary'
};

export default function Page(){
  return(<GlossaryPage />)
};