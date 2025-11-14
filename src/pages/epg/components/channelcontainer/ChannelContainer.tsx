import { Channel } from "@/types/channelTypes";

interface ChannelContainerProps {
  channel: Channel;
}

export const ChannelContainer = ({ channel }: ChannelContainerProps) => {
  const { image, number, name } = channel;
  return (
    <div className="flex items-center justify-center min-h-24 max-h-24 p-2">
      <div className="flex items-center p-4 gap-4 grow h-full bg-white/10 rounded-lg truncate">
        <span className="text-lg md:text-2xl text-white">{number}</span>
        <div className="flex grow justify-center p-2">
          <img src={image} alt={name} className="h-10 md:h-20" />
        </div>
      </div>
    </div>
  );
};
