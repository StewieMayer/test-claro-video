import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface EPGModalProps {
  show: boolean;
  handleClose: VoidFunction;
}

export const EPGModal = ({ show, handleClose }: EPGModalProps) => {
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
                <Button onClick={handleClose} className='p-2 hover:cursor-pointer hover:bg-gray-500/10 rounded-lg'>X</Button>
              </div>
              {/* Viewer */}
              <div className="flex w-full h-1/2 bg-gray-900"></div>
              {/* EPG Container */}
              <div className="flex flex-col h-1/2">
                {/* Track */}
                <div className="flex h-10 text-white">
                  <div className="flex w-1/4 justify-center font-bold">HOY</div>
                  <div className="flex grow"></div>
                  <div className="flex"></div>
                </div>
                {/* Chanels */}
                <div className="flex grow">
                  <div className="flex w-1/4"></div>
                  <div className="flex grow"></div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
