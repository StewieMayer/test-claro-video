import { selectChannels } from "@/app/features/channelSlice";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";

export const useEPGModal = () => {
  const { channels } = useAppSelector((state: RootState) =>
    selectChannels(state)
  );

  return {
    channels,
  };
};
