import Layout from "./components/Layout";
import { EPGPage } from "./pages/epg/EPGPage";

const App: React.FC = () => {
  return (
    <Layout>
      <EPGPage />
    </Layout>
  );
};

export default App;
