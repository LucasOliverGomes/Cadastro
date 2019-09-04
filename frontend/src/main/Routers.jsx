import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
//escolha, rota, redirecionar
import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import Produtos from '../components/user/Produtos';

export default props => (
  <Switch>
    <Route exact path="/Home" component={Home} />
    <Route path="/User" component={UserCrud} />
    <Route path="/Produtos" component={Produtos} />
    <Redirect from="*" to="/" />
  </Switch>
);
