import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

//Depois mudamos o #
export default props => (
  <aside className="menu-area">
    <nav className="menu">
      <Link to="/Home">
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
      <Link to="/vendas">
        <i className="fa fa-archive" />
        Vendas
      </Link>
      <Link to="/fornecedor">
        <i className="fa fa-dropbox" />
        Fornecedor
      </Link>
      <Link to="/empresa">
        <i className="fa fa-building" />
        Empresa
      </Link>
      <Link to="/filial">
        <i className="fa fa-tablet" />
        Filial
      </Link>
      <Link to="/estoque">
        <i className="fa fa-dropbox" />
        Estoque
      </Link>
      <Link to="/cliente">
        <i className="fa fa-user" />
        Cliente
      </Link>
      <Link to="/funcionarios">
        <i className="fa fa-address-card" />
        Funcionarios
      </Link>
      <Link to="/telemarketing">
        <i className="fa fa-phone" />
        Telemarketing
      </Link>
    </nav>
  </aside>
);
