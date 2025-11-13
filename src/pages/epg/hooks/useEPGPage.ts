import { useLazyGetChannelsQuery } from "@/app/features/channelsApi";
import { setChannels } from "@/app/features/channelSlice";
import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";

export const useEPGPage = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const [getChannels] = useLazyGetChannelsQuery();
  const dispatch = useAppDispatch();

  const handleCloseModal = () => setShow(false);
  const handleOpenModal = () => {
    setIsloading(true);
    getChannels()
      .unwrap()
      .then((response) => {
        if (response.length > 0) {
          dispatch(setChannels(response));
          setShow(true);
        }
      })
      .catch(() => {
        setShow(false);
      })
      .finally(() => setIsloading(false));
  };

  return {
    show,
    isLoading,
    handleOpenModal,
    handleCloseModal,
  };
};
