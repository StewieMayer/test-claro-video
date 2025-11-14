import { useEPGViewer } from "./hooks/useEPGViewer";

export const EPGViewer = () => {
  const { activeEvent, schedule } = useEPGViewer();

  return (
    <div className="flex w-full h-1/2 bg-white/10">
      {activeEvent && (
        <div className="flex">
          {activeEvent.ext_eventimage_name_base && (
            <img
              src={activeEvent.ext_eventimage_name_base}
              alt={activeEvent.name}
              className="w-full"
            />
          )}
          <div className="flex flex-col gap-8 bg-black/75 w-full h-1/2 text-white absolute z-40 pt-10 px-2">
            <h1 className="text-4xl">{activeEvent.name}</h1>
            <div className="flex flex-col gap-2 text-xl">
              <span>{schedule}</span>
              <span>{activeEvent.description}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
