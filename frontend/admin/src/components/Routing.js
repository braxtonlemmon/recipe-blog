import React from 'react';
import LoginFormContainer from './LoginFormContainer';
import Recipes from './Recipes';
import RecipeFormContainer from './RecipeFormContainer';
import Home from './Home';
import NoMatch from './NoMatch';
import RecipePage from './RecipePage';

import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

function Routing(props) {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={() => (
      props.isLoggedIn === true ? <Component {...props} /> : <Redirect to='/login' />
    )} />
  )
  
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path='/recipes' component={Recipes} />
      <PrivateRoute path='/new' component={RecipeFormContainer} />
      <PrivateRoute path='/recipes/:id'>
        <RecipePage />
      </PrivateRoute>
      <Route path="/login">
        <LoginFormContainer
          handleLogin={props.handleLogin}
          isLoggedIn={props.isLoggedIn}
        />
      </Route>
      <Route path="*" component={NoMatch} />
    </Switch>
  )
}

export default Routing;

