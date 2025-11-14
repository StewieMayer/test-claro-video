import { selectChannels, setActiveEvent } from "@/app/features/channelSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useEffect, useRef } from "react";

export const useEPGModal = () => {
  const { channels, activeEvent } = useAppSelector((state: RootState) =>
    selectChannels(state)
  );

  const dispatch = useAppDispatch()

  const timerRef = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = timerRef.current;
    const channels = channelsRef.current;
    const events = eventsRef.current;

    const handleSync = () => {
      if (events) {
        if (timer) timer.scrollLeft = events.scrollLeft;
        if (channels) channels.scrollTop = events.scrollTop;
      }
    };

    const handleSyncEventsLeft = () => {
      if (events && timer) events.scrollLeft = timer.scrollLeft;
    };

    const handleSyncEventsTop = () => {
      if (events && channels) events.scrollTop = channels.scrollTop;
    };

    timer?.addEventListener("scroll", handleSyncEventsLeft, { passive: true });
    channels?.addEventListener("scroll", handleSyncEventsTop, {
      passive: true,
    });
    events?.addEventListener("scroll", handleSync, { passive: true });

    return () => {
      timer?.removeEventListener("scroll", handleSyncEventsLeft);
      channels?.removeEventListener("scroll", handleSyncEventsTop);
      events?.removeEventListener("scroll", handleSync);
      dispatch(setActiveEvent(undefined))
    };
  }, [timerRef.current, eventsRef.current, channelsRef.current]);

  return {
    channels,
    activeEvent,
    timerRef,
    channelsRef,
    eventsRef,
  };
};
