import React from 'react';
import RecipeIndex from './RecipeIndex';
import About from './About';
import Contact from './Contact';
import RecipePage from './RecipePage';
import NoMatch from './NoMatch';

import {
  Switch,
  Route,
} from 'react-router-dom';

function Routing(props) {
  return (
    <Switch>
      <Route exact path='/'      component={RecipeIndex} />
      <Route path='/About'       component={About} />
      <Route path='/Contact'     component={Contact} />
      <Route path='/recipes/:id' component={RecipePage} />
      <Route path='*'            component={NoMatch} />
    </Switch>
  )
}

export default Routing;