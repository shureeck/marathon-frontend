import './App.css';
import './components/accordion/Accordion';
import Accordion from './components/accordion/Accordion';
import AddRecipe from './components/recipe_form/AddRecipe';
import AddToMarathon from './components/marathon_form/AddToMarathon';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Recipe from './components/recipe/Recipe';


function App() {
return (
  <div className="App">
    <div className="header">
      <h1>МАРАФОН СХУДНЕННЯ</h1>
    </div>
    <div className="Appbody">
      <BrowserRouter>
        <Routes>
          <Route path='/cooking' element={<Recipe />}/>
          <Route path="/recipe" element={<AddRecipe />} />
          <Route path="/menu" element={<AddToMarathon />} />
          <Route path="/" element={<Accordion />} />
        </Routes>

      </BrowserRouter>
    </div>
    <div className="footer" hidden><p>Developed by GLANCE.CORP in 2023</p></div>
  </div>
);
}

export default App;
