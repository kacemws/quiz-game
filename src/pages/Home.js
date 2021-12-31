import { HomeDescription, HomeImage, PageTitle } from "../Components";
import ready from "../assets/images/illustrations/ready.png";
import topOfBooks from "../assets/images/illustrations/top-of-books.png";
import universe from "../assets/images/illustrations/universe.png";

export const Home = ({ ...props }) => {
  return (
    <div className="min-h-full w-full">
      <section className="flex justify-between items-center my-4">
        <HomeDescription
          title="Les quizs n'ont jamais était si fun !"
          description="Défiez vos ami(e)s, entrenez vous, vous décidez ! DOTNET vous offre la possibilité de jouer à des quizs fais par notre communauté, ou même les votres !"
          buttonContent="Commencer dès maintenant !"
        />
        <HomeImage img={ready} title="Les quizs n'ont jamais était si fun !" />
      </section>
      <section className="flex justify-between items-center my-12">
        <HomeImage
          img={topOfBooks}
          title="Les quizs n'ont jamais était si fun !"
        />
        <HomeDescription
          title="Mettez vos amis à l'épreuve !"
          description={
            "DOTQUIZ vous offre la possibilité de créer vos propre quizs ! Mettez vos amis à l'épreuve que sa soit dans de la culture générale Ou sur votre relation !"
          }
          buttonContent="Créer un quiz"
        />
      </section>
      <section className="flex flex-col justify-center items-center my-4">
        <HomeImage
          img={universe}
          title="Les quizs n'ont jamais était si fun !"
        />
        <PageTitle>Plonger dans un monde rempli de nouveaux défis</PageTitle>
      </section>
    </div>
  );
};
