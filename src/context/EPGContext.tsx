import { Channel, Event } from "@/types/channelTypes";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type EPGContextType = {
  channels: Array<Channel>;
  setChannels: Dispatch<SetStateAction<Array<Channel>>>;
  activeEvent: Event | undefined;
  setActiveEvent: Dispatch<SetStateAction<Event | undefined>>;
};

export const EPGContext = createContext<EPGContextType | undefined>(undefined);

export const EPGProvider = ({ children }: { children: ReactNode }) => {
  const [channels, setChannels] = useState<Array<Channel>>([]);
  const [activeEvent, setActiveEvent] = useState<Event | undefined>(undefined);

  return (
    <EPGContext.Provider
      value={{ channels, setChannels, activeEvent, setActiveEvent }}
    >
      {children}
    </EPGContext.Provider>
  );
};
