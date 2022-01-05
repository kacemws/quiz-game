import { OutlinedButton, PageTitle } from "..";
import illustration from "../../assets/images/illustrations/204.png";
const Wrapper = ({ children }) => {
  return <div className="my-4">{children}</div>;
};
export const NoContent = ({
  clickEvent = () => {},
  buttonTitle,
  title,
  message,
  highlight,
}) => {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center">
      <img src={illustration} alt="ressource not found" className="h-80 my-4" />
      <PageTitle color="text-primary-300">{title}</PageTitle>
      <aside className="flex flex-col items-center">
        <Wrapper>
          <PageTitle>
            {message}{" "}
            <span className="text-primary-300 text-2xl">{highlight}</span> !
          </PageTitle>
        </Wrapper>
        <div className="w-fit">
          <OutlinedButton
            title={buttonTitle}
            onClick={(_) => {
              clickEvent();
            }}
          />
        </div>
      </aside>
    </div>
  );
};
