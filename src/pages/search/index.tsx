import { Content } from "@/components/Content";
import { MainLayout } from "@/layouts/MainLayout";
import Head from "next/head";
import React from "react";

const index = () => {
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
};

export default index;
