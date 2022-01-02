export const Checkbox = ({
  name,
  register = () => {},
  checked,
  error,
  className,
}) => {
  return (
    <input
      type="checkbox"
      name={name}
      defaultChecked={checked}
      className={`outline-none rounded-md shadow-sm border focus:outline-none focus:ring-2 h-11 w-11 checked:bg-primary-300 text-primary-300 ${
        !error
          ? "focus:border-primary-300 border-gray-300 ring-primary-200"
          : "border-red-500 ring-red-200 focus:border-red-300"
      } ${className}`}
      {...register(name, {})}
    />
  );
};
