import { Metadata } from "next";
import { NotFound } from "@/components/notfound";

export const metadata: Metadata = {
  title: 'MAPL | Not Found'
};

export default function PageNotFound() {
    return (
        <NotFound /> 
    )
}