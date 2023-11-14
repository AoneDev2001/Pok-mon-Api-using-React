import {  Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import SinglePage from "./pages/SinglePage";


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/card/:id"  element={<SinglePage/>}/>
    </Routes>
    </>
  );
}

export default App;
