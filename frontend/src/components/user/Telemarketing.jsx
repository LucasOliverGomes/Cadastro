import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'user text-danger',
  title: 'Telemarketing',
  subtitle: 'Cadastro: Incluir, Lista, Alterar e Excluir!'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/cliente';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  telemarketing: {
    name: '',
    telefone: '',
    data: '',
    horadaVenda: '',
    estado: '',
    cidade: '',
    endereco: '',
    motivo: ''
  },
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
    this.setState({ telemarketing: inicialState.telemarketing });
  }
  //Para incluir e alterar
  save() {
    const telemarketing = this.state.telemarketing;
    const method = telemarketing.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = telemarketing.id ? `${baseUrl}/${telemarketing.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, telemarketing).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ telemarketing: inicialState.telemarketing, list });
    });
  }
  //Atualizando a lista
  getUpdateList(telemarketing) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== telemarketing.id);
    list.unshift(telemarketing);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const telemarketing = { ...this.state.telemarketing };
    //seta o que está em input e virá value
    telemarketing[event.target.name] = event.target.value;
    //set insere
    this.setState({ telemarketing });
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
              value={this.state.telemarketing.name}
              onChange={e => this.updateField(e)}
              placeholder="Digite o nome do cliente"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Telefone</label>
            <input
              type="text"
              className="form-control"
              name="telefone"
              value={this.state.telemarketing.telefone}
              onChange={e => this.updateField(e)}
              placeholder="Digite o telefone"
            />
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Data da ligação</label>
              <input
                type="date"
                className="form-control"
                name="data"
                value={this.state.telemarketing.data}
                onChange={e => this.updateField(e)}
                placeholder="Digite a data da Ligação"
              />
            </div>
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Hora da Venda</label>
              <input
                type="integer"
                className="form-control"
                name="horadaVenda"
                value={this.state.telemarketing.horadaVenda}
                onChange={e => this.updateField(e)}
                placeholder="Digite a hora da venda"
              />
            </div>
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Protocolo da ligação</label>
              <input
                type="number"
                className="form-control"
                name="protocolo"
                value={this.state.telemarketing.protocolo}
                onChange={e => this.updateField(e)}
                placeholder="Protocolo da ligação"
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
                value={this.state.telemarketing.cidade}
                onChange={e => this.updateField(e)}
                placeholder="Cidade do cliente"
              />
            </div>
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Motivo da Ligação</label>
              <input
                type="text"
                className="form-control"
                name="motivo"
                value={this.state.telemarketing.motivo}
                onChange={e => this.updateField(e)}
                placeholder="Qual o motivo da ligação?"
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
  load(telemarketing) {
    this.setState({ telemarketing });
  }

  remove(telemarketing) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${telemarketing.id}`).then(telemarketing => {
      const list = this.state.list.filter(u => u !== telemarketing);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Data</th>
          <th>Hora da Venda</th>
          <th>Protocolo</th>
          <th>Cidade</th>
          <th>Motivo da ligação</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(telemarketing => {
      return (
        <tr key={telemarketing.id}>
          <td>{telemarketing.id}</td>
          <td>{telemarketing.name}</td>
          <td>{telemarketing.telefone}</td>
          <td>{telemarketing.data}</td>
          <td>{telemarketing.horadaVenda}</td>
          <td>{telemarketing.protocolo}</td>
          <td>{telemarketing.cidade}</td>
          <td>{telemarketing.motivo}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(telemarketing)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(telemarketing)} />
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
