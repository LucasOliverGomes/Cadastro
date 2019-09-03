import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'users text-danger',
  title: 'Usuários',
  subtitle: 'Cadastro: Incluir, Lista, Alterar e Excluir!'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/user';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  user: { name: '', email: '' },
  list: []
};

export default class UserCrud extends Component {
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
    const user = this.state.user;
    const method = user.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, user).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ user: inicialState.user, list });
    });
  }
  //Atualizando a lista
  getUpdateList(user) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== user.id);
    list.unshift(user);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const user = { ...this.state.user };
    //seta o que está em input e virá value
    user[event.target.name] = event.target.value;
    //set insere
    this.setState({ user });
  }
  //Jsx para renderizar o formulário.
  renderForm() {
    return (
      <div className="form">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.user.name}
              onChange={e => this.updateField(e)}
              placeholder="Digite Seu Nome"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={this.state.user.email}
              onChange={e => this.updateField(e)}
              placeholder="Digite seu Email"
            />
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Endereco</label>
              <input
                type="text"
                className="form-control"
                name="endereco"
                value={this.state.user.endereco}
                onChange={e => this.updateField(e)}
                placeholder="Digite seu Enredeço"
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
  load(user) {
    this.setState({ user });
  }

  remove(user) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== user);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Endereço</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.endereco}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(user)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(user)} />
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
