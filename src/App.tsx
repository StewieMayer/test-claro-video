import Layout from "./components/Layout";
import React, { useEffect, useState } from "react";
import { Channel } from "./types/channelTypes";
import { useLazyGetChannelsQuery } from "./app/features/channelsApi";

const App: React.FC = () => {

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Claro Video EPG</h1>
    </Layout>
  );
};

export default App;
