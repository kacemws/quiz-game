import { useNavigate } from "react-router-dom";
import { OutlinedButton, PageTitle } from "../Components";
import illustration from "../assets/images/illustrations/404.svg";
const Wrapper = ({ children }) => {
  return <div className="my-4">{children}</div>;
};
export const NotFound = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 w-ful flex flex-col md:flex-row items-center justify-center">
      <img
        src={illustration}
        alt="ressource not found"
        className="w-full md:w-2/3"
      />
      <aside className="w-full md:w-1/3 flex flex-col md:block">
        <PageTitle color="text-primary-300">Oooooops !</PageTitle>
        <Wrapper>
          <PageTitle>
            Tu as perdu ton{" "}
            <span className="text-primary-300 text-2xl">chemin</span> !
          </PageTitle>
        </Wrapper>
        <OutlinedButton
          title="Revenir en arrière"
          onClick={(_) => {
            navigate(-1);
          }}
        />
      </aside>
    </div>
  );
};
