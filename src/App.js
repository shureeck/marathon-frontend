import './App.css';
import './components/accordion/Accordion';
import Accordion from './components/accordion/Accordion';
import AddRecipe from './components/recipe_form/AddRecipe';
import AddToMarathon from './components/marathon_form/AddToMarathon';
import { Routes, Route } from 'react-router-dom';
import Recipe from './components/recipe/Recipe';
import Menu from './components/menu/Menu';
import All from './components/all/All';


function App() {
  const menu = [
    { name: 'Марафон', path: '/' },
    { name: 'Всi рецепти', path: '/all' },
    { name: 'Недоданi до меню', path: '/', disabled: true },
    // {name: 'Новий рецепт', path:'/recipe'},
    // {name: 'Додати до меню', path:'/menu'}

    //<Route path="/recipe" element={<AddRecipe />} />
    //          <Route path="/menu" element={<AddToMarathon />} />

  ];

  return (
    <div className="App">
      <div className="header">
        <h1>BIZZY KITCHEN</h1>
      </div>
      <div className='MenuBar'>
        <Menu items={menu}></Menu>
      </div>
      <div className="Appbody">
        <Routes>
          <Route path='/cooking' element={<Recipe />} />
          <Route path='/' element={<Accordion />} />
          <Route path='/all' element={<All />} />
        </Routes>
      </div>
      <div className="footer" hidden><p>Developed by GLANCE.CORP in 2023</p></div>
    </div>
  );
}

export default App;
