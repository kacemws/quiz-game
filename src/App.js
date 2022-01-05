import { Layout, Home, Quizzes, NotFound } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/*
           * Home (done)
           * All Quizzes (Grid view ----> done)
           * Quiz By ID (description and infos) if quiz is still draft, navigate again to all *******
           * Quiz By ID (questions and answers)
           * Creation is just a modal (done)
           * update is just a modal (TODO) ************************************
           * 404 page (done)
           */}
          <Route path="/" element={<Home />} />
          <Route path="/quizzes/all" element={<Quizzes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
