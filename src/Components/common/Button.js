import { Button } from "antd";
import { Title } from ".";

const basicShape = "m-0 rounded h-10 px-6";

export const PrimaryButton = ({ title, ...props }) => {
  const style = () => {
    let background =
      "bg-primary-300 hover:bg-primary-200 active:bg-primary-400";
    const focus = "focus:ring-2 focus:ring-primary-100";
    return `${basicShape} ${background} ${focus}`;
  };

  return (
    <Button className={style()} type="primary" {...props}>
      <Title inverted>{title}</Title>
    </Button>
  );
};

export const OutlinedButton = ({ title, ...props }) => {
  const style = () => {
    const focus = "focus:ring-2 focus:ring-primary-100";
    let background = "border border-primary-300 hover:bg-neutral-100";
    return `${basicShape} ${background} ${focus}`;
  };

  return (
    <Button className={style()} type="ghost" {...props}>
      <Title inverted color="text-primary-300">
        {title}
      </Title>
    </Button>
  );
};

export const TertiaryButton = ({ title, ...props }) => {
  const style = () => {
    const focus = "focus:ring-2 focus:ring-neutral-600";
    let background = "border border-blackText-300 hover:bg-neutral-100";
    return `${basicShape} ${background} ${focus}`;
  };

  return (
    <Button className={style()} {...props}>
      <Title>{title}</Title>
    </Button>
  );
};
export const DangerButton = ({ title, ...props }) => {
  const style = () => {
    let background = "bg-rose-600 hover:bg-rose-500 active:bg-rose-700";
    const focus = "focus:ring-2 focus:ring-rose-400";
    return `${basicShape} ${background} ${focus}`;
  };

  return (
    <Button className={style()} {...props}>
      <Title inverted>{title}</Title>
    </Button>
  );
};
