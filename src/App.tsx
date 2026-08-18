import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Search from "./pages/search";
import MovieDetails from "./pages/moviedetails";
import SearchBar from "./components/searchbar";

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <Link to="/" className="logo">
          🎬 <span>Movie</span>DB
        </Link>

        <SearchBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;