import React, { Component, Fragment } from "react";
import axios from "axios";
import { Header, Repositories, GlobalStyle, Offline } from "./styles";

export default class App extends Component {
  state = {
    online: navigator.onLine,
    newRepoInput: "",
    repositories: JSON.parse(localStorage.getItem("repositories")) || []
  };

  handleNetworkChange = () => {
    this.setState({ online: navigator.onLine });
  };

  componentDidMount() {
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleNetworkChange);
    window.removeEventListener("offline", this.handleNetworkChange);
  }
  addRepository = async () => {
    if (!this.state.newRepoInput) return;

    if (!this.state.online)
      alert("You are not online, connect to do this action");

    const response = await axios.get(
      `https://api.github.com/repos/${this.state.newRepoInput}`
    );

    this.setState({
      newRepoInput: "",
      repositories: [...this.state.repositories, response.data]
    });

    localStorage.setItem(
      "repositories",
      JSON.stringify(this.state.repositories)
    );
  };
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <Header>
        <label for="input"></label>
          <input id="input"
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

        {!this.state.online && <Offline>You are offline!</Offline>}
      </Fragment>
    );
  }
}
