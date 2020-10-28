import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState()
  const [cont, setCont] = useState(0)
  useEffect(()=>{
    async function ListRepository() {
      const response = await api.get('/repositories')
      setRepositories(response.data)
    }
    ListRepository()
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `teste ${cont}`,
      url: "url",
      techs: "node"
    } )
    setCont(cont+ 1)
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const repositoryIndex = repositories.findIndex(repo => repo.id === id)
    const aux = repositories
    aux.splice(repositoryIndex,1)
    console.log( aux)
    setRepositories([...aux])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
