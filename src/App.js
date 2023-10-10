import './App.css';
import './components/accordion/Accordion';
import Accordion from './components/accordion/Accordion';
import AddRecipe from './components/recipe_form/AddRecipe';
import AddToMarathon from './components/marathon_form/AddToMarathon';
import { Routes, Route } from 'react-router-dom';
import Recipe from './components/recipe/Recipe';
import Menu from './components/menu/Menu';
import All from './components/all/All';
import { useEffect, useState } from 'react';
import Login from './components/login/Login';
import jwt_decode from 'jwt-decode';

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    document.title = "Bizzi Kitchen"
    let descMeta = document.querySelector("meta[name='description']")
    descMeta.setAttribute("content", 'Започніть свій шлях до ідеальної фігури з марофоном схуднення! Наш веб-сайт пропонує меню на кожен день, яке допоможе втратити вагу, корисні поради від експертів та спільноту для взаємної підтримки. Приєднуйтеся до нашого марафону схуднення прямо зараз та відкрийте для себе здоровий та активний спосіб життя!')
  }, []);

  const menu = [
    { name: 'Марафон', path: '/' },
    { name: 'Всi рецепти', path: '/all' },
    { name: 'Недоданi до меню', path: '/', disabled: true },
  ];

  const routes = [<Route path='/cooking' element={<Recipe />} />,
  <Route path='/login' element={<Login setToken={setToken} />} />,
  <Route path='/' element={<Accordion />} />,
  <Route path='/all' element={<All />} />,
  ];

  let signInLink =    <a className='a__login' href='/login'>Sign in</a>;

  if (typeof token !== 'undefined') {
    const tokenDecoded = jwt_decode(token.token);
    const user = `${tokenDecoded.firstname}, ${tokenDecoded.lastname}`;
    console.log(tokenDecoded);

    menu.push({ name: 'Новий рецепт', path: '/recipe' });
    menu.push({ name: 'Додати до меню', path: '/menu' });
    routes.push(<Route path="/menu" element={<AddToMarathon />} />);
    routes.push(<Route path="/recipe" element={<AddRecipe />} />);
    signInLink = <a className='a__login' href='/login'>{user}</a>;
  }

  return (
    <div className="App">
      <div className="header">
        {signInLink}
        <h1>BIZZY KITCHEN</h1>
      </div>
      <div className='MenuBar'>
        <Menu items={menu}></Menu>
      </div>
      <div className="Appbody">
        <Routes>
          {routes}
        </Routes>
      </div>
      <div className="footer" hidden><p>Developed by GLANCE.CORP in 2023</p></div>
    </div>
  );
}

export default App;
