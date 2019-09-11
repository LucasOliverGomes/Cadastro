import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'shopping-cart text-danger',
  title: 'Estoque',
  subtitle: 'Estoque'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/estoque';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  estoque: { filial: '', produto: '', quantidadeProdutos: '' },
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
    const estoque = this.state.estoque;
    const method = estoque.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = estoque.id ? `${baseUrl}/${estoque.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, estoque).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ estoque: inicialState.estoque, list });
    });
  }
  //Atualizando a lista
  getUpdateList(estoque) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== estoque.id);
    list.unshift(estoque);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const estoque = { ...this.state.estoque };
    //seta o que está em input e virá value
    estoque[event.target.name] = event.target.value;
    //set insere
    this.setState({ estoque });
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
              name="filial"
              value={this.state.estoque.nomeFilial}
              onChange={e => this.updateField(e)}
              placeholder="Nome da Filial"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Produto</label>
            <input
              type="text"
              className="form-control"
              name="produto"
              value={this.state.estoque.produto}
              onChange={e => this.updateField(e)}
              placeholder="Nome do Produto"
            />
          </div>
        </div>
        <div className="form">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Quantidade de Produtos</label>
              <input
                type="integer"
                className="form-control"
                name="quantidadeProdutos"
                value={this.state.estoque.quantidadeProdutos}
                onChange={e => this.updateField(e)}
                placeholder="Quantidade de produtos"
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
  load(estoque) {
    this.setState({ estoque });
  }

  remove(estoque) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${estoque.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== estoque);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Nome da Filial</th>
          <th>Produto</th>
          <th>Quantidade de Produtos</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(estoque => {
      return (
        <tr key={estoque.id}>
          <td>{estoque.id}</td>
          <td>{estoque.filial}</td>
          <td>{estoque.produto}</td>
          <td>{estoque.quantidadeProdutos}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(estoque)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(estoque)} />
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
