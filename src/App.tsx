import { Button } from "@headlessui/react";
import Layout from "./components/Layout";
import { useApp } from "./hooks/useApp";
import { EPGModal } from "./components/epgmodal/EPGModal";

const App: React.FC = () => {

    const {show,handleShow} = useApp()

  return (
    <Layout>
      <Button onClick={handleShow} className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white text-xl font-bold py-4 px-6 rounded">
        Mostrar EPG
      </Button>
      <EPGModal show={show} handleClose={handleShow} />
    </Layout>
  );
};

export default App;
