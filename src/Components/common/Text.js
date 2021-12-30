export const PageTitle = ({ children, inverted = false, props }) => {
  const textColor = inverted ? "text-whiteText-300" : "text-blackText-300";
  return <h1 className={`text-2xl ${textColor} font-bold`}>{children}</h1>;
};

export const PageSubTitle = ({ children, inverted = false, props }) => {
  const textColor = inverted ? "text-whiteText-300" : "text-blackText-300";
  return <h2 className={`text-5xl ${textColor}`}>{children}</h2>;
};

export const Heading = ({ children, inverted = false, props }) => {
  const textColor = inverted ? "text-whiteText-300" : "text-blackText-300";
  return <h3 className={`text-sm ${textColor} font-bold`}>{children}</h3>;
};

export const Subheading = ({ children, inverted = false, props }) => {
  const textColor = inverted ? "text-whiteText-300" : "text-blackText-300";
  return <h4 className={`text-xs ${textColor} font-bold`}>{children}</h4>;
};

export const Title = ({ children, inverted = false, props }) => {
  const textColor = inverted ? "text-whiteText-300" : "text-blackText-300";
  return <h3 className={`text-base ${textColor} font-medium`}>{children}</h3>;
};

export const Body = ({ children, inverted = false, props }) => {
  const textColor = inverted ? "text-whiteText-300" : "text-blackText-300";
  return <p className={`text-base ${textColor}`}>{children}</p>;
};

export const Caption = ({ children, inverted = false, props }) => {
  const textColor = inverted ? "text-whiteText-300" : "text-blackText-300";
  return <caption className={`text-xs ${textColor}`}>{children}</caption>;
};
