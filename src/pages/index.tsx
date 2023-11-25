import Head from "next/head";
import { Inter } from "next/font/google";
import { MainLayout } from "@/layouts/MainLayout";
import { Content } from "@/compononts/Content";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Starwars characters</title>
        <meta name="description" content="Starwars characters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Content />
      </MainLayout>
    </>
  );
}
