export const Progress = ({ current, total }) => {
  return (
    <div className="h-6 w-full flex items-center justify-center">
      {Array.from(new Array(total)).map((_, index) => {
        return (
          <div
            className={`flex-1 h-2 mx-2 first:ml-0 last:mr-0 rounded-full ${
              index <= current ? "bg-primary-300" : "bg-gray-200"
            }`}
          />
        );
      })}
    </div>
  );
};
