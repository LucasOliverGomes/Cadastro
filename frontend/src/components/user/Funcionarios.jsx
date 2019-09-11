import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'address-card text-danger',
  title: 'Funcionários',
  subtitle: 'Cadastro: Incluir, Lista, Alterar e Excluir!'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/funcionarios';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  Funcionarios: { name: '', email: '', cargo: '', salario: '', dataContratacao: '', telefone: '' },
  list: []
};

export default class FunCrud extends Component {
  state = { ...inicialState };

  //Será chamado antes do componente na tela
  //farei uma chamada no backEnd da lista
  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ Funcionarios: inicialState.Funcionarios });
  }
  //Para incluir e alterar
  save() {
    const Funcionarios = this.state.Funcionarios;
    const method = Funcionarios.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = Funcionarios.id ? `${baseUrl}/${Funcionarios.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, Funcionarios).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ Funcionarios: inicialState.Funcionarios, list });
    });
  }
  //Atualizando a lista
  getUpdateList(Funcionarios) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== Funcionarios.id);
    list.unshift(Funcionarios);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const Funcionarios = { ...this.state.Funcionarios };
    //seta o que está em input e virá value
    Funcionarios[event.target.name] = event.target.value;
    //set insere
    this.setState({ Funcionarios });
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
              value={this.state.Funcionarios.name}
              onChange={e => this.updateField(e)}
              placeholder="Digite o nome do funcionario"
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
              value={this.state.Funcionarios.email}
              onChange={e => this.updateField(e)}
              placeholder="Digite o Email do funcionário"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Cargo do funcionário</label>
            <input
              type="text"
              className="form-control"
              name="cargo"
              value={this.state.Funcionarios.cargo}
              onChange={e => this.updateField(e)}
              placeholder="Cargo do funcionário"
            />
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Salário</label>
              <input
                type="text"
                className="form-control"
                name="salario"
                value={this.state.Funcionarios.salario}
                onChange={e => this.updateField(e)}
                placeholder="Salário do funcionário"
              />
            </div>
          </div>
        </div>
        <div className="adress">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Data da contração</label>
              <input
                type="date"
                className="form-control"
                name="dataContratacao"
                value={this.state.Funcionarios.dataContratacao}
                onChange={e => this.updateField(e)}
                placeholder="Dia que o funcionário foi contratado"
              />
            </div>
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
                value={this.state.Funcionarios.telefone}
                onChange={e => this.updateField(e)}
                placeholder="Telefone do funcionário"
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
  load(Funcionarios) {
    this.setState({ Funcionarios });
  }

  remove(Funcionarios) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${Funcionarios.id}`).then(Funcionarios => {
      const list = this.state.list.filter(u => u !== Funcionarios);
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
          <th>Cargo</th>
          <th>Salário</th>
          <th>Data da contratação</th>
          <th>Telefone</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(Funcionarios => {
      return (
        <tr key={Funcionarios.id}>
          <td>{Funcionarios.id}</td>
          <td>{Funcionarios.name}</td>
          <td>{Funcionarios.email}</td>
          <td>{Funcionarios.cargo}</td>
          <td>{Funcionarios.salario}</td>
          <td>{Funcionarios.dataContratacao}</td>
          <td>{Funcionarios.telefone}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(Funcionarios)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(Funcionarios)} />
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