import './App.css';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import PokemonList from './Pages/PokemonList';
import Pokemon from './Pages/Pokemon';

function App() {
  return (
    <div className="container">
      <nav>
        <NavLink to={'/'}><i className="fas fa-search"></i> Search</NavLink>
      </nav>
     <Switch>
       <Route path={'/'} exact component={PokemonList} />
       <Route path={'/pokemon/:pokemon'} exact component={Pokemon} />
       <Redirect to={'/'} />
     </Switch>
    </div>
  );
}

export default App;
