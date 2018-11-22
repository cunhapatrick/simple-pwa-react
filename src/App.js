import React, { Component, Fragment } from "react";
import axios from "axios";
import { Header, Repositories, GlobalStyle } from "./styles";

export default class App extends Component {
  state = {
    newRepoInput: "",
    repositories: []
  };

  addRepository = async () => {
    if (!this.state.newRepoInput) return;
    const response = await axios.get(
      `https://api.github.com/repos/${this.state.newRepoInput}`
    );

    this.setState({
      newRepoInput: "",
      repositories: [...this.state.repositories, response.data]
    });
  };
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <Header>
          <input
            value={this.state.newRepoInput}
            onChange={e => this.setState({ newRepoInput: e.target.value })}
            placeholder="Adicionar repositório"
          />
          <button onClick={this.addRepository}>Adicionar</button>
        </Header>

        <Repositories>
          {this.state.repositories.map(repository => (
            <li key={repository.id}>
              <img alt="avatar repository" src={repository.owner.avatar_url} />
              <div>
                <strong> {repository.name} </strong>
                <p>{repository.description}</p>
                <a href={repository.html_url}>Acessar</a>
              </div>
            </li>
          ))}
        </Repositories>
      </Fragment>
    );
  }
}
