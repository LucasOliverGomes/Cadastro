import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'shopping-cart text-danger',
  title: 'Empresa',
  subtitle: 'Empresa'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/empresa';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  empresa: { nomeEmpresa: '', local: '', nomeFantasia: '', date: '' },
  list: []
};

export default class VendasCrud extends Component {
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
    const empresa = this.state.empresa;
    const method = empresa.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = empresa.id ? `${baseUrl}/${empresa.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, empresa).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ empresa: inicialState.empresa, list });
    });
  }
  //Atualizando a lista
  getUpdateList(empresa) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== empresa.id);
    list.unshift(empresa);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const empresa = { ...this.state.empresa };
    //seta o que está em input e virá value
    empresa[event.target.name] = event.target.value;
    //set insere
    this.setState({ empresa });
  }
  //Jsx para renderizar o formulário.
  renderForm() {
    return (
      <div className="form">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Nome da Empresa</label>
            <input
              type="text"
              className="form-control"
              name="nomeEmpresa"
              value={this.state.empresa.nomeEmpresa}
              onChange={e => this.updateField(e)}
              placeholder="Nome da empresa"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Local</label>
            <input
              type="text"
              className="form-control"
              name="local"
              value={this.state.empresa.local}
              onChange={e => this.updateField(e)}
              placeholder="local"
            />
          </div>
        </div>
        <div className="form">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome da Fanstasia</label>
              <input
                type="text"
                className="form-control"
                name="nomeFantasia"
                value={this.state.empresa.nomeFantasia}
                onChange={e => this.updateField(e)}
                placeholder="Nome Fantasia da Empresa"
              />
            </div>
          </div>
        </div>
        <div className="dataVenda">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Data da Fundação</label>
              <input
                type="date"
                className="form-control"
                name="dataFundacao"
                value={this.state.empresa.dataFundacao}
                onChange={e => this.updateField(e)}
                placeholder="DD/MM/AA"
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
  load(empresa) {
    this.setState({ empresa });
  }

  remove(empresa) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${empresa.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== empresa);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Nome da Empresa</th>
          <th>Local</th>
          <th>Nome Fantasia</th>
          <th>Data da Fundação</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(empresa => {
      return (
        <tr key={empresa.id}>
          <td>{empresa.id}</td>
          <td>{empresa.nomeEmpresa}</td>
          <td>{empresa.local}</td>
          <td>{empresa.nomeFantasia}</td>
          <td>{empresa.dataFundacao}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(empresa)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(empresa)} />
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
