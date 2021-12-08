export const PageTitle = ({ children, inverted = false, props }) => {
  return (
    <h1
      className={`text-2xl text-${
        inverted ? "textInverted" : "text"
      }-300 font-bold`}
    >
      {children}
    </h1>
  );
};

export const PageSubTitle = ({ children, inverted = false, props }) => {
  return (
    <h2 className={`text-5xl text-${inverted ? "textInverted" : "text"}-300`}>
      {children}
    </h2>
  );
};

export const Heading = ({ children, inverted = false, props }) => {
  return (
    <h3
      className={`text-sm text-${
        inverted ? "textInverted" : "text"
      }-300 font-bold`}
    >
      {children}
    </h3>
  );
};

export const Subheading = ({ children, inverted = false, props }) => {
  return (
    <h4
      className={`text-xs text-${
        inverted ? "textInverted" : "text"
      }-300 font-bold`}
    >
      {children}
    </h4>
  );
};

export const Title = ({ children, inverted = false, props }) => {
  return (
    <h3
      className={`text-base text-${
        inverted ? "textInverted" : "text"
      }-300 font-medium`}
    >
      {children}
    </h3>
  );
};

export const Body = ({ children, inverted = false, props }) => {
  return (
    <p className={`text-base text-${inverted ? "textInverted" : "text"}-300`}>
      {children}
    </p>
  );
};

export const Caption = ({ children, inverted = false, props }) => {
  return (
    <caption
      className={`text-xs text-${inverted ? "textInverted" : "text"}-300`}
    >
      {children}
    </caption>
  );
};
