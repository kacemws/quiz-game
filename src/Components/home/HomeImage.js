export const HomeImage = ({ img, title }) => {
  return (
    <div className="w-1/2 h-fit">
      <img src={img} className="w-full" alt={title} />
    </div>
  );
};
