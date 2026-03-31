const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-pending text-textColor font-medium  text-xs",
    completed: "bg-iconGreen text-white font-medium text-xs",
  };

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;