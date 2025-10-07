import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import GTMScript from "@/react-app/components/GTMScript";
import MetaPixelScript from "@/react-app/components/MetaPixelScript";

export default function App() {
  return (
    <>
      <GTMScript />
      <MetaPixelScript />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}
