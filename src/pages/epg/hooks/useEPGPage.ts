import { useLazyGetChannelsQuery } from "@/app/features/channelsApi";
import {
  setChannels,
  setDateFrom,
  setDateTo,
} from "@/app/features/channelSlice";
import { useAppDispatch } from "@/app/hooks";
import dayjs from "dayjs";
import { useState } from "react";

export const useEPGPage = () => {
  //State
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);

  //Utils
  const [getChannels] = useLazyGetChannelsQuery();
  const dispatch = useAppDispatch();

  const handleCloseModal = () => setShow(false);
  /* 
    Al abrir el modal consume la api de channels usando la fecha y hora actual.
    Setea el arreglo y los limites de programación en el Slice.
  */ 
  const handleOpenModal = () => {
    const today = dayjs().format("YYYYMMDDHHmmss");
    const tomorrow= dayjs(today).add(1, "day").format("YYYYMMDDHHmmss");

    setIsloading(true);

    getChannels({
      dateFrom: today,
      dateTo: tomorrow,
    })
      .unwrap()
      .then((response) => {
        if (response.length > 0) {
          dispatch(setChannels(response));
          dispatch(setDateFrom(today));
          dispatch(setDateTo(tomorrow));
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
