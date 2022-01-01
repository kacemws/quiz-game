import { Title } from ".";

const basicShape = "m-0 rounded h-10 px-6";

export const PrimaryButton = ({ title, ...props }) => {
  const style = () => {
    let background =
      "bg-primary-300 hover:bg-primary-200 active:bg-primary-400";
    const focus = "focus:ring-2 focus:ring-primary-100 outline-none";
    return `${basicShape} ${background} ${focus}`;
  };

  return (
    <button className={style()} {...props}>
      <Title inverted>{title}</Title>
    </button>
  );
};

export const OutlinedButton = ({ title, ...props }) => {
  const style = () => {
    const focus = "focus:ring-2 focus:ring-primary-100 outline-none";
    let background = "border border-primary-300 hover:bg-neutral-100";
    return `${basicShape} ${background} ${focus}`;
  };

  return (
    <button className={style()} type="ghost" {...props}>
      <Title inverted color="text-primary-300">
        {title}
      </Title>
    </button>
  );
};

export const TertiaryButton = ({ title, ...props }) => {
  const style = () => {
    const focus = "focus:ring-2 focus:ring-neutral-600 outline-none";
    let background = "border border-blackText-300 hover:bg-neutral-100";
    return `${basicShape} ${background} ${focus}`;
  };

  return (
    <button className={style()} {...props}>
      <Title>{title}</Title>
    </button>
  );
};
export const DangerButton = ({ title, ...props }) => {
  const style = () => {
    let background = "bg-rose-600 hover:bg-rose-500 active:bg-rose-700";
    const focus = "focus:ring-2 focus:ring-rose-400 outline-none";
    return `${basicShape} ${background} ${focus}`;
  };

  return (
    <button className={style()} {...props}>
      <Title inverted>{title}</Title>
    </button>
  );
};
