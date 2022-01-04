import { Layout, Home, Quizzes, NotFound } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/*
           * Home (done)
           * All Quizzes (List and Grid views)
           * Quiz By ID (description and infos) if quiz is still draft, navigate again to all
           * Quiz By ID (questions and answers)
           * Creation is just a modal
           * update is just a modal
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
