import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
//escolha, rota, redirecionar
import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import Produtos from '../components/user/Produtos';
import Vendas from '../components/user/Vendas';
import Fornecedor from '../components/user/Fornecedor';
import Empresa from '../components/user/Empresa';
import Filial from '../components/user/Filial';
import Estoque from '../components/user/Estoque';
import Cliente from '../components/user/Cliente';
import Funcionarios from '../components/user/Funcionarios';
import Telemarketing from '../components/user/Telemarketing'

export default props => (
  <Switch>
    <Route exact path="/Home" component={Home} />
    <Route path="/User" component={UserCrud} />
    <Route path="/Produtos" component={Produtos} />
    <Route path="/Vendas" component={Vendas} />
    <Route path="/Fornecedor" component={Fornecedor} />
    <Route path="/Empresa" component={Empresa} />
    <Route path="/Filial" component={Filial} />
    <Route path="/Estoque" component={Estoque} />
    <Route path="/Cliente" component={Cliente} />
    <Route path="/Funcionarios" component={Funcionarios} />
    <Route path="/Telemarketing" component={Telemarketing} />
    <Redirect from="*" to="/" />
  </Switch>
);
