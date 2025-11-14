import { selectChannels, setActiveEvent } from "@/app/features/channelSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Event } from "@/types/channelTypes";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";

export const useEventContainer = (event:Event) => {
  //State
  const { dateFrom, dateTo } = useAppSelector((state: RootState) =>
    selectChannels(state)
  );

  //Utils
  const dispatch = useAppDispatch();
  
  const parseDate = useCallback(
    (date: string): string => dayjs(date).format("HH:mm"),
    []
  );

  const handleSetEvent = () => dispatch(setActiveEvent(event));

  //Variables de utilidad
  /*
    Calcula el width del div en base a los minutos que le quedan de transmision al evento.
    1 min= 4px
  */
  const width = useMemo(() => {
    const durationArr = event.duration.split(":").map((item) => parseInt(item));
    let minutesDuration =
      durationArr[0] * 240 + durationArr[1] * 4 + durationArr[2] / 15;

    const dateBegin = dayjs(event.date_begin);
    const dateEnd = dayjs(event.date_end);

    if (dateBegin.isBefore(dateFrom)) {
      minutesDuration += dateBegin.diff(dateFrom, "minutes") * 4;
    }

    if (dateEnd.isAfter(dateTo)) {
      minutesDuration -= dateEnd.diff(dateTo, "minutes") * 4;
    }

    return `${minutesDuration}px`;
  }, [event]);

  const schedule = useMemo(
    () => `${parseDate(event.date_begin)}-${parseDate(event.date_end)}`,
    [event]
  );

  return {
    width,
    schedule,
    handleSetEvent,
  };
};
