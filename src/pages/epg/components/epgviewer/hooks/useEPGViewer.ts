import { selectChannels } from "@/app/features/channelSlice";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";

export const useEPGViewer = () => {

  //State
  const { activeEvent } = useAppSelector((state: RootState) =>
    selectChannels(state)
  );

  //Utils
  const parseDate = useCallback(
    (date: string): string => dayjs(date).format("HH.mm"),
    []
  );
  const parseduration = useCallback((duration: string) => {
    const arrDuration = duration.split(":").map((item) => parseInt(item));
    return `${arrDuration[0]}h ${arrDuration[1]}min`;
  }, []);

  //Variables de utilidad
  const schedule = useMemo(
    () =>
      activeEvent
        ? `${parseDate(activeEvent.date_begin)}hrs a ${parseDate(
            activeEvent.date_end
          )}hrs ${parseduration(activeEvent.duration)}`
        : "",
    [activeEvent, parseDate, parseduration]
  );

  return {
    activeEvent,
    schedule,
  };
};
