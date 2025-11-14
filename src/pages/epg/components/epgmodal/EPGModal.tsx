import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEPGModal } from "./hooks/useEPGModal";
import { EventContainer } from "../eventcontainer/EventContainer";
import { ChannelContainer } from "../channelcontainer/ChannelContainer";
import { EPGViewer } from "../epgviewer/EPGViewer";
import { TimeLine } from "../timeline/TimeLine";

interface EPGModalProps {
  show: boolean;
  handleClose: VoidFunction;
}

export const EPGModal = ({ show, handleClose }: EPGModalProps) => {
  const {
    channels,
    timerRef,
    channelsRef,
    eventsRef,
    scrollLeft,
    scrollRight,
  } = useEPGModal();
  return (
    <Dialog
      transition
      as="div"
      open={show}
      className="relative z-50"
      onClose={handleClose}
    >
      {/* Fondo semitransparente */}
      <DialogBackdrop
        transition
        className={`
            fixed 
            inset-0
            bg-black/50 
            transition-opacity 
            data-closed:opacity-0 
            data-enter:duration-300 
            data-enter:ease-out 
            data-leave:duration-200 
            data-leave:ease-in`}
      ></DialogBackdrop>

      {/* Contenedor del modal */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="flex h-full">
          <DialogPanel className="w-full h-full transform overflow-hidden bg-black transition-all">
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex fixed w-full z-50 text-white text-xl font-bold py-4 px-2 justify-end">
                <Button
                  onClick={handleClose}
                  className="p-2 hover:cursor-pointer hover:bg-gray-500/10 rounded-lg"
                >
                  X
                </Button>
              </div>
              <EPGViewer />
              {/* EPG Container */}
              <div className="flex h-1/2">
                {/* left */}
                <div className="flex w-1/5 flex-col text-white">
                  <div className="flex min-h-10 grow justify-center items-center font-bold">
                    HOY
                  </div>
                  <div
                    ref={channelsRef}
                    className="flex grow flex-col overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {channels.map((channel) => (
                      <ChannelContainer channel={channel} key={channel.name} />
                    ))}
                  </div>
                </div>
                {/* right */}
                <div className="flex w-4/5 flex-col">
                  <TimeLine
                    ref={timerRef}
                    scrollLeft={scrollLeft}
                    scrollRight={scrollRight}
                  />
                  <div
                    ref={eventsRef}
                    className="flex flex-col overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-white"
                  >
                    {channels.map((channel, index) => (
                      <div
                        className="flex min-h-24 max-h-24"
                        key={`${index}-${channel.name}`}
                      >
                        {channel.events.map((event, index) => (
                          <EventContainer
                            event={event}
                            key={`${index}-${event.id}-${event.date_begin}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
