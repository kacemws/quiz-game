const getTextColor = (color, inverted) => {
  if (color) return color;
  if (inverted) return "text-whiteText-300";
  return "text-blackText-300";
};

export const PageTitle = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return (
    <h1 className={`text-2xl ${textColor} font-bold text-center md:text-left`}>
      {children}
    </h1>
  );
};

export const PageSubTitle = ({
  children,
  inverted = false,
  color,
  ...props
}) => {
  const textColor = getTextColor(color, inverted);
  return (
    <h2 className={`text-5xl ${textColor} text-center md:text-left`}>
      {children}
    </h2>
  );
};

export const Heading = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return (
    <h3 className={`text-sm ${textColor} font-bold text-center md:text-left`}>
      {children}
    </h3>
  );
};

export const Subheading = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return (
    <h4 className={`text-xs ${textColor} font-bold text-center md:text-left`}>
      {children}
    </h4>
  );
};

export const Title = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return (
    <h3
      className={`text-base ${textColor} font-medium text-center md:text-left`}
    >
      {children}
    </h3>
  );
};

export const Body = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return (
    <p className={`text-base ${textColor} text-center md:text-left`}>
      {children}
    </p>
  );
};

export const Caption = ({ children, inverted = false, color, ...props }) => {
  const textColor = getTextColor(color, inverted);
  return (
    <caption className={`text-xs ${textColor} text-center md:text-left`}>
      {children}
    </caption>
  );
};
