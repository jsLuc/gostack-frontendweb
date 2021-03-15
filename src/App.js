import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import "./styles.css";
import api from './services/api'



function App() {
  const [repositories, setRepo] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
        setRepo(res.data)
    })
}, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New repository ${Date.now()}`,
      url: `https://github/${uuidv4()}`,
      techs: ['Adamantinum', 'Gitglitch', "Noude"]
    })
    setRepo([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepo(repositories.filter(
      repo => repo.id !== id
    ))

  }

  return (
    <>
      <ul data-testid="repository-list">
          {repositories.map(repo => {
            return (
              <li key={repo.id}>
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
                </li>
            )
          })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
