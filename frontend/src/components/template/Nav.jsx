import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

//Depois mudamos o #
export default props => (
  <aside className="menu-area">
    <nav className="menu">
      <Link to="/">
        <i className="fa fa-home" />
        Início
      </Link>
      <Link to="/user">
        <i className="fa fa-user" />
        Usuários
      </Link>
      <Link to="/produtos">
        <i className="fa fa-product-hunt" />
        Produtos
      </Link>
    </nav>
  </aside>
);
