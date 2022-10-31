import { Route, Routes, BrowserRouter } from "react-router-dom";
import InfiniteScroll from "./pages/InfiniteScroll";
import Detail from "./pages/Detail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route InfiniteScroll path="/" element={<InfiniteScroll />} />
        <Route Detail path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
