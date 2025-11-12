import Layout from './components/Layout';
import React from 'react';

const App: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">
        Hello, CWBT App!
      </h1>
    </Layout>
  );
}

export default App;