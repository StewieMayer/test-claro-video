interface SpinnerProps {
  show: boolean;
}

export const Spinner = ({ show }: SpinnerProps) => {
  return show ? (
    <div role="status" className="flex justify-center items-center">
      <div className="w-5 h-5 border-4 rounded-full border-white border-t-gray-300 animate-spin"></div>
    </div>
  ) : (
    <></>
  );
};
