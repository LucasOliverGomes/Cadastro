import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'user text-danger',
  title: 'Cliente',
  subtitle: 'Cadastro: Incluir, Lista, Alterar e Excluir!'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/cliente';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  Cliente: { name: '', email: '', telefone: '', cpf: '', estado: '', cidade: '', endereco: '' },
  list: []
};

export default class CliCrud extends Component {
  state = { ...inicialState };

  //Será chamado antes do componente na tela
  //farei uma chamada no backEnd da lista
  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ Cliente: inicialState.Cliente });
  }
  //Para incluir e alterar
  save() {
    const Cliente = this.state.Cliente;
    const method = Cliente.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = Cliente.id ? `${baseUrl}/${Cliente.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, Cliente).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ Cliente: inicialState.Cliente, list });
    });
  }
  //Atualizando a lista
  getUpdateList(Cliente) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== Cliente.id);
    list.unshift(Cliente);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const Cliente = { ...this.state.Cliente };
    //seta o que está em input e virá value
    Cliente[event.target.name] = event.target.value;
    //set insere
    this.setState({ Cliente });
  }
  //Jsx para renderizar o formulário.
  renderForm() {
    return (
      <div className="form">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Nome do cliente</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.Cliente.name}
              onChange={e => this.updateField(e)}
              placeholder="Digite o nome do cliente"
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
              value={this.state.Cliente.email}
              onChange={e => this.updateField(e)}
              placeholder="Digite seu Email"
            />
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Telefone</label>
              <input
                type="text"
                className="form-control"
                name="telefone"
                value={this.state.Cliente.telefone}
                onChange={e => this.updateField(e)}
                placeholder="Telefone do cliente"
              />
            </div>
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>CPF</label>
              <input
                type="text"
                className="form-control"
                name="cpf"
                value={this.state.Cliente.cpf}
                onChange={e => this.updateField(e)}
                placeholder="CPF do cliente"
              />
            </div>
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Estado</label>
              <input
                type="text"
                className="form-control"
                name="estado"
                value={this.state.Cliente.estado}
                onChange={e => this.updateField(e)}
                placeholder="Estado do cliente (Ex: MG)"
              />
            </div>
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Cidade</label>
              <input
                type="text"
                className="form-control"
                name="cidade"
                value={this.state.Cliente.cidade}
                onChange={e => this.updateField(e)}
                placeholder="Cidade do cliente (Ex: Coritiba)"
              />
            </div>
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Endereço</label>
              <input
                type="text"
                className="form-control"
                name="endereco"
                value={this.state.Cliente.endereco}
                onChange={e => this.updateField(e)}
                placeholder="Endereço do cliente"
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
  load(Cliente) {
    this.setState({ Cliente });
  }

  remove(Cliente) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${Cliente.id}`).then(Cliente => {
      const list = this.state.list.filter(u => u !== Cliente);
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
          <th>Telefone</th>
          <th>Estado</th>
          <th>Cidade</th>
          <th>Endereço</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(Cliente => {
      return (
        <tr key={Cliente.id}>
          <td>{Cliente.id}</td>
          <td>{Cliente.name}</td>
          <td>{Cliente.email}</td>
          <td>{Cliente.telefone}</td>
          <td>{Cliente.estado}</td>
          <td>{Cliente.cidade}</td>
          <td>{Cliente.endereco}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(Cliente)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(Cliente)} />
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
