import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import GTMScript from "@/react-app/components/GTMScript";
import MetaPixelScript from "@/react-app/components/MetaPixelScript";
import OptimizedScripts from "@/react-app/components/OptimizedScripts";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      <OptimizedScripts>
        <GTMScript />
        <MetaPixelScript />
      </OptimizedScripts>
    </>
  );
}
