export const HomeImage = ({ img, title }) => {
  return (
    <div className="z-20 w-1/2 h-fit">
      <img src={img} className="w-full" alt={title} />
    </div>
  );
};
