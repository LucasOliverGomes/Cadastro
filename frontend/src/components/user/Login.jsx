import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'login-hunt',
  title: 'Login',
  subtitle: 'Cadastro: Incluir, Lista, Alterar e Excluir!'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/produto';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  login: { produto: '', quantidade: '', valor: '' },
  list: []
};

export default class Login extends Component {
  state = { ...inicialState };

  //Será chamado antes do componente na tela
  //farei uma chamada no backEnd da lista
  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ user: inicialState.user });
  }
  //Para incluir e alterar
  save() {
    const login = this.state.produto;
    const method = login.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = login.id ? `${baseUrl}/${login.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, login).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ login: inicialState.login, list });
    });
  }
  //Atualizando a lista
  getUpdateList(login) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== login.id);
    list.unshift(login);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const login = { ...this.state.login };
    //seta o que está em input e virá value
    login[event.target.name] = event.target.value;
    //set insere
    this.setState({ login });
  }
  //Jsx para renderizar o formulário.
  renderForm() {
    return (
      <div className="form">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Produto</label>
            <input
              type="text"
              className="form-control"
              name="produto"
              value={this.state.produto.name}
              onChange={e => this.updateField(e)}
              placeholder="Nome produto"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Quantidade</label>
            <input
              type="text"
              className="form-control"
              name="quantidade"
              value={this.state.produto.email}
              onChange={e => this.updateField(e)}
              placeholder="Quantidade"
            />
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Valor</label>
              <input
                type="integer"
                className="form-control"
                name="valor"
                value={this.state.produto.endereco}
                onChange={e => this.updateField(e)}
                placeholder="Valor unitário"
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>
              salvar
            </button>
            <button className="btn btn-secundary ml-2" onClick={e => this.clear(e)}>
              cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  //Atualizar o estado do objeto
  load(login) {
    this.setState({ login });
  }

  remove(login) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${login.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== login);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Nome do Produto</th>
          <th>Quantidade</th>
          <th>Valor(R$)</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(produto => {
      return (
        <tr key={produto.id}>
          <td>{produto.id}</td>
          <td>{produto.produto}</td>
          <td>{produto.quantidade}</td>
          <td>{produto.valor}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(produto)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(produto)} />
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...heardProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
