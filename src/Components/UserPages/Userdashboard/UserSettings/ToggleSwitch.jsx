const ToggleSwitch = ({ enabled, setEnabled }) => {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
        enabled ? "bg-textColor" : "bg-textGray"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;