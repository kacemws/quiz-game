const getTextColor = (color, inverted) => {
  if (color) return color;
  if (inverted) return "text-whiteText-300";
  return "text-blackText-300";
};

export const PageTitle = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return <h1 className={`text-2xl ${textColor} font-bold`}>{children}</h1>;
};

export const PageSubTitle = ({
  children,
  inverted = false,
  color,
  ...props
}) => {
  const textColor = getTextColor(color, inverted);
  return <h2 className={`text-5xl ${textColor}`}>{children}</h2>;
};

export const Heading = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return <h3 className={`text-sm ${textColor} font-bold`}>{children}</h3>;
};

export const Subheading = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return <h4 className={`text-xs ${textColor} font-bold`}>{children}</h4>;
};

export const Title = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return <h3 className={`text-base ${textColor} font-medium`}>{children}</h3>;
};

export const Body = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return <p className={`text-base ${textColor}`}>{children}</p>;
};

export const Caption = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return <caption className={`text-xs ${textColor}`}>{children}</caption>;
};
