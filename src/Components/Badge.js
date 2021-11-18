import PropTypes from "prop-types";
export const Badge = (props) => {
  const { children, status } = props;

  let statusStyle = "";

  switch (status) {
    case "new":
      statusStyle = "bg-blue-100 text-blue-800";
      break;
    case "success":
      statusStyle = "bg-green-100 text-green-800";
      break;
    case "danger":
      statusStyle = "bg-red-100 text-red-800";
      break;
    case "warning":
      statusStyle = "bg-yellow-100 text-yellow-800";
      break;

    default:
      statusStyle = "bg-gray-100 border border-gray-400 text-kio-500";
      break;
  }

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyle}`}
    >
      {/* <div className="progress-wrapper"></div> */}
      {children}
    </span>
  );
};

Badge.propTypes = {
  progress: PropTypes.oneOf([
    "completed",
    "partially completed",
    "uncompleted",
    "default",
  ]),
  status: PropTypes.oneOf(["new", "success", "danger", "warning", "default"]),
};
