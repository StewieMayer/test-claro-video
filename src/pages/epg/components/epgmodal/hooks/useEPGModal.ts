import { selectChannels, setActiveEvent } from "@/app/features/channelSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useEffect, useRef, useCallback } from "react";

export const useEPGModal = () => {
  //State
  const { channels } = useAppSelector((state: RootState) =>
    selectChannels(state)
  );

  //Refs
  const timerRef = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  //Utils
  const dispatch = useAppDispatch();

  const scrollLeft = useCallback(() => {
    if (timerRef.current && timerRef.current.scrollLeft >= 100) {
      timerRef.current.scrollLeft -= 100;
    }
  }, [timerRef.current]);
  const scrollRight = useCallback(() => {
    if (timerRef.current) {
      timerRef.current.scrollLeft += 100;
    }
  }, [timerRef.current]);

  //CLC
  useEffect(() => {
    const timer = timerRef.current;
    const channels = channelsRef.current;
    const events = eventsRef.current;

    //Sincroniza el scrollleft de la linea del tiempo y el scrolltop del contenedor de canales
    const handleSync = () => {
      if (events) {
        if (timer) timer.scrollLeft = events.scrollLeft;
        if (channels) channels.scrollTop = events.scrollTop;
      }
    };

    //Sincroniza el scrollleft de la grilla de eventos
    const handleSyncEventsLeft = () => {
      if (events && timer) events.scrollLeft = timer.scrollLeft;
    };

    //Sincroniza el scrolltop de la grilla de eventos
    const handleSyncEventsTop = () => {
      if (events && channels) events.scrollTop = channels.scrollTop;
    };

    //Se añaden los listeners para los scrolls
    timer?.addEventListener("scroll", handleSyncEventsLeft, { passive: true });
    channels?.addEventListener("scroll", handleSyncEventsTop, {
      passive: true,
    });
    events?.addEventListener("scroll", handleSync, { passive: true });

    //Unmount: Limpia los listeners y el activeEvent
    return () => {
      timer?.removeEventListener("scroll", handleSyncEventsLeft);
      channels?.removeEventListener("scroll", handleSyncEventsTop);
      events?.removeEventListener("scroll", handleSync);
      dispatch(setActiveEvent(undefined));
    };
  }, [timerRef.current, eventsRef.current, channelsRef.current]);

  return {
    channels,
    timerRef,
    channelsRef,
    eventsRef,
    scrollLeft,
    scrollRight,
  };
};
