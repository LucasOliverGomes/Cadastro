import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'people-carry',
  title: 'Fornecedores',
  subtitle: 'Fornecedores'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/vendas';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  fornecedor: {
    nomeFornecedor: '',
    dataFundacao: '',
    nomeFantasia: '',
    socio1Nome: '',
    socio2Nome: '',
    cnpj: ''
  },
  list: []
};

export default class FornecedoresCrud extends Component {
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
    const fornecedor = this.state.fornecedor;
    const method = fornecedor.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = fornecedor.id ? `${baseUrl}/${fornecedor.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, fornecedor).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ vendas: inicialState.fornecedor, list });
    });
  }
  //Atualizando a lista
  getUpdateList(fornecedor) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== fornecedor.id);
    list.unshift(fornecedor);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const fornecedor = { ...this.state.fornecedor };
    //seta o que está em input e virá value
    fornecedor[event.target.name] = event.target.value;
    //set insere
    this.setState({ fornecedor });
  }
  //Jsx para renderizar o formulário.
  renderForm() {
    return (
      <div className="form">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Nome do fornecedor</label>
            <input
              type="text"
              className="form-control"
              name="nomeFornecedor"
              value={this.state.fornecedor.nomeFornecedor}
              onChange={e => this.updateField(e)}
              placeholder="Nome do fornecedor"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Data da fundação</label>
            <input
              type="date"
              className="form-control"
              name="dataFundacao"
              value={this.state.fornecedor.dataFundacao}
              onChange={e => this.updateField(e)}
              placeholder="DD/MM/AAAA"
            />
          </div>
        </div>
        <div className="form">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome fantasia</label>
              <input
                type="text"
                className="form-control"
                name="nomeFantasia"
                value={this.state.fornecedor.nomeFantasia}
                onChange={e => this.updateField(e)}
                placeholder="Nome fantasia"
              />
            </div>
          </div>
        </div>
        <div className="dataVenda">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Sócio 1 (Nome)</label>
              <input
                type="text"
                className="form-control"
                name="socio1Nome"
                value={this.state.fornecedor.sociolNome}
                onChange={e => this.updateField(e)}
                placeholder="Sócio 1 (Nome)"
              />
            </div>
          </div>
        </div>
        <div className="valor">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Sócio 2 nome</label>
              <input
                type="text"
                className="form-control"
                name="socio2Nome"
                value={this.state.fornecedor.socio2Nome}
                onChange={e => this.updateField(e)}
                placeholder="Sócio 2 (Nome)"
              />
            </div>
          </div>
        </div>
        <div className="valor">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>CNPJ</label>
              <input
                type="integer"
                className="form-control"
                name="cnpj"
                value={this.state.fornecedor.cnpj}
                onChange={e => this.updateField(e)}
                placeholder="CNPJ"
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
  load(fornecedor) {
    this.setState({ fornecedor });
  }

  remove(fornecedor) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${fornecedor.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== fornecedor);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Nome do fornecedor</th>
          <th>Data da fundação</th>
          <th>Nome fantasia</th>
          <th>Sócio 1 (Nome)</th>
          <th>Sócio 2 (Nome)</th>
          <th>CNPJ</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(fornecedor => {
      return (
        <tr key={fornecedor.id}>
          <td>{fornecedor.id}</td>
          <td>{fornecedor.nomeFornecedor}</td>
          <td>{fornecedor.nomeFantasia}</td>
          <td>{fornecedor.dataFundacao}</td>
          <td>{fornecedor.sociolNome}</td>
          <td>{fornecedor.socio2Nome}</td>
          <td>{fornecedor.cnpj}</td>

          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(fornecedor)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(fornecedor)} />
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
