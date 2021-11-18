export function Button({
  children,
  action = "submit",
  type = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = true,
  responsiveFull = false,
  space = false,
  onClick = () => {},
  ...props
}) {
  return (
    <button
      type={action}
      disabled={disabled}
      onClick={onClick}
      className={`relative ${space ? "m-1" : ""} ${
        fullWidth ? "w-full" : "px-4"
      } ${
        responsiveFull
          ? fullWidth
            ? "w-full sm:flex-1"
            : "w-full flex-1 sm:flex-none sm:w-max"
          : ""
      } ${
        BUTTON_SIZE[size]
      } rounded-md outline-none ring-green-200 focus:ring-2 ${
        Button_TYPE[type]
      } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black opacity-75 rounded-md">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-75"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-85"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {children}
    </button>
  );
}

const BUTTON_SIZE = {
  small: "py-2",
  medium: "py-4",
};

const Button_TYPE = {
  primary: "",
  secondary: "",
  update: "text-white",
  delete: "text-white bg-red-500 hover:bg-red-600",
};
