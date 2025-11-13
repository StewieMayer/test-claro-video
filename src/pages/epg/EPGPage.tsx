import { Button } from "@headlessui/react";
import { EPGModal } from "@/pages/epg/components/epgmodal/EPGModal";
import { useEPGPage } from "./hooks/useEPGPage";
import { Spinner } from "@/components/Spinner";

export const EPGPage = () => {
  const { handleCloseModal, handleOpenModal, isLoading, show } = useEPGPage();

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="flex gap-2 bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white text-xl font-bold py-4 px-6 rounded"
      >
        <Spinner show={isLoading} />
        Mostrar EPG
      </Button>
      <EPGModal show={show} handleClose={handleCloseModal} />
    </>
  );
};
