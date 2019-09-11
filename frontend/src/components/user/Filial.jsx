import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'shopping-cart text-danger',
  title: 'Filial',
  subtitle: 'Filial'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/filial';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  filial: { nomeFilial: '', local: '', dataFundacao: '' },
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
    const filial = this.state.filial;
    const method = filial.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = filial.id ? `${baseUrl}/${filial.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, filial).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ filial: inicialState.filial, list });
    });
  }
  //Atualizando a lista
  getUpdateList(filial) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== filial.id);
    list.unshift(filial);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const filial = { ...this.state.filial };
    //seta o que está em input e virá value
    filial[event.target.name] = event.target.value;
    //set insere
    this.setState({ filial });
  }
  //Jsx para renderizar o formulário.
  renderForm() {
    return (
      <div className="form">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Filial</label>
            <input
              type="text"
              className="form-control"
              name="nomeFilial"
              value={this.state.filial.nomeFilial}
              onChange={e => this.updateField(e)}
              placeholder="Nome da Filial"
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
              value={this.state.filial.local}
              onChange={e => this.updateField(e)}
              placeholder="Local"
            />
          </div>
        </div>
        <div className="form">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Data da Fundação</label>
              <input
                type="date"
                className="form-control"
                name="dataFundacao"
                value={this.state.filial.dataFundacap}
                onChange={e => this.updateField(e)}
                placeholder="Data da Fundação"
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
  load(filial) {
    this.setState({ filial });
  }

  remove(filial) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${filial.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== filial);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Nome da Filial</th>
          <th>Local</th>
          <th>Data Fundação</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(filial => {
      return (
        <tr key={filial.id}>
          <td>{filial.id}</td>
          <td>{filial.nomeFilial}</td>
          <td>{filial.nomeFilial}</td>
          <td>{filial.local}</td>
          <td>{filial.dataFundacao}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(filial)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(filial)} />
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
