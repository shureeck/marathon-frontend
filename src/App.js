import './App.css';
import * as React from 'react';
import Marathon from './components/marathon/Marathon';
import AddRecipe from './components/recipe_form/AddRecipe';
import AddToMarathon from './components/marathon_form/AddToMarathon';
import { Routes, Route } from 'react-router-dom';
import Recipe from './components/recipe/Recipe';
import Menu from './components/menu/Menu';
import All from './components/all/All';
import { useEffect } from 'react';
import Login from './components/login/Login';
import jwt_decode from 'jwt-decode';
import useToken from './useToken';
import AssignMarathonToUser from './components/user_assidne_form/AssignMarathonToUser';
import Archive from './components/archive/Archive';
import NewMarathon from './components/new_marathon/NewMarathon';
import Users from './components/users/Users';
import Localization from './components/localization/Localization';

function App() {
  const [token, setToken] = useToken();
  const [loc, setLoc] = React.useState(localStorage.getItem('loc') || 'ua');

  useEffect(() => {
    document.title = "Bizzy Kitchen"
    let descMeta = document.querySelector("meta[name='description']")
    descMeta.setAttribute("content", 'Започніть свій шлях до ідеальної фігури з марофоном схуднення! Наш веб-сайт пропонує меню на кожен день, яке допоможе втратити вагу, корисні поради від експертів та спільноту для взаємної підтримки. Приєднуйтеся до нашого марафону схуднення прямо зараз та відкрийте для себе здоровий та активний спосіб життя!')
  }, []);

  const menu = [
    { name: 'Марафон', pl: "Maraton", en: "Marathon", path: '/' },
    { name: 'Всi рецепти', pl: "Wszystkie przepisy", en: "All recipes", path: '/all' },
    { name: 'Архів', pl:"Archiwa", en:"Archive", path: '/archive' }
  ];

  const routes = [<Route key='cooking' path='/cooking' element={<Recipe />} />,
  <Route key='login' path='/login' element={<Login setToken={setToken} />} />,
  <Route key='main' path='/' element={<Marathon />} />,
  <Route key='all' path='/all' element={<All />} />,
  <Route key='archive' path='/archive' element={<Archive />} />,
  ];

  let signInLink = <a className='a__login' href='/login'>Sign in</a>;

  if (typeof token !== 'undefined') {
    const tokenDecoded = jwt_decode(token);
    const user = `${tokenDecoded.firstname}, ${tokenDecoded.lastname}`;
    if (tokenDecoded.role === 'Admin') {
      menu.push({ name: 'Новий рецепт',pl:"Nowy przepis", en:"New recipe", path: '/recipe' });
      menu.push({ name: 'Додати до меню', pl:'Dodać do menu', en:'Add to menu', path: '/menu' });
      menu.push({ name: 'Новий марафон',pl:'Nowy maraton', en:'New marathon', path: '/newmarathon' });
      menu.push({ name: 'Користувачі', pl:'Użytkownicy', en:'Users', path: '/users' });

      routes.push(<Route key='meny' path="/menu" element={<AddToMarathon />} />);
      routes.push(<Route key='recipe' path="/recipe" element={<AddRecipe />} />);
      routes.push(<Route key='recipe' path="/recipe/edit" element={<AddRecipe />} />);
      routes.push(<Route key='newmarathon' path='/newmarathon' element={<NewMarathon />} />);
      routes.push(<Route key='users' path='/users' element={<Users />} />)
    }
    signInLink = <a className='a__login' href='/login'>{user}</a>;
  }

  return (
    <div className="App">
      <div className="header">
        {signInLink}
        <Localization loc={loc} setLoc={setLoc}></Localization>
        <h1><div>Bizzy</div><div><img src='logo.png'></img></div><div>Kitchen</div></h1>
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
