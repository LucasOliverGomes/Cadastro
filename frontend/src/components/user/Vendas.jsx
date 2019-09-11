import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'shopping-cart text-danger',
  title: 'Vendas',
  subtitle: 'Vendas'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/vendas';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  vendas: { nomeCliente: '', produto: '', quantidade: '', dataVendas: '', valor: '' },
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
    const vendas = this.state.vendas;
    const method = vendas.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = vendas.id ? `${baseUrl}/${vendas.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, vendas).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ vendas: inicialState.vendas, list });
    });
  }
  //Atualizando a lista
  getUpdateList(vendas) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== vendas.id);
    list.unshift(vendas);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const vendas = { ...this.state.vendas };
    //seta o que está em input e virá value
    vendas[event.target.name] = event.target.value;
    //set insere
    this.setState({ vendas });
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
              name="nomeCliente"
              value={this.state.vendas.nomeCliente}
              onChange={e => this.updateField(e)}
              placeholder="Nome cliente"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Produtos</label>
            <input
              type="text"
              className="form-control"
              name="produto"
              value={this.state.vendas.produto}
              onChange={e => this.updateField(e)}
              placeholder="Produto"
            />
          </div>
        </div>
        <div className="form">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Quantidade</label>
              <input
                type="text"
                className="form-control"
                name="qtdProduto"
                value={this.state.vendas.qtdProduto}
                onChange={e => this.updateField(e)}
                placeholder="Quantidade do produto"
              />
            </div>
          </div>
        </div>
        <div className="dataVenda">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Data da venda</label>
              <input
                type="date"
                className="form-control"
                name="dataVendas"
                value={this.state.vendas.dataVendas}
                onChange={e => this.updateField(e)}
                placeholder="DD/MM/AA"
              />
            </div>
          </div>
        </div>
        <div className="valor">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Valor</label>
              <input
                type="text"
                className="form-control"
                name="valor"
                value={this.state.vendas.valor}
                onChange={e => this.updateField(e)}
                placeholder="Valor da venda"
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
  load(vendas) {
    this.setState({ vendas });
  }

  remove(vendas) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${vendas.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== vendas);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Nome do cliente</th>
          <th>Produto</th>
          <th>Quantidade do produto</th>
          <th>Data da venda</th>
          <th>Valor</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(vendas => {
      return (
        <tr key={vendas.id}>
          <td>{vendas.id}</td>
          <td>{vendas.nomeCliente}</td>
          <td>{vendas.produto}</td>
          <td>{vendas.qtdProduto}</td>
          <td>{vendas.dataVendas}</td>
          <td>{vendas.valor}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(vendas)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(vendas)} />
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
