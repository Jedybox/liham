interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const Switch = ({ isOn, handleToggle }: SwitchProps) => {
  return (
    <label className="flex flex-row justify-between items-center w-fit h-fit">
      {/* <input type="checkbox" className="appearance-none peer" checked={isOnline}/> */}
      <input
        type="checkbox"
        className="appearance-none peer"
        checked={isOn}
        onClick={() => handleToggle()}
      />
      <span className="w-14 h-8 flex items-center flex-shrink-0 ml-4 p-1 bg-isOffline rounded-full duration-300 ease-in-out peer-checked:bg-isOnline after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
    </label>
  );
};

export default Switch;
