import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {

    const getRepositories = async () => {
      const { data } = await api.get('repositories');
      setRepository(data);
    }

    getRepositories();
  },[]);

  async function handleAddRepository() {
    const repository = {
      title: `Project - ${Date.now()}`,
      url: `https://github.com/maikbroisler/${Date.now()}`,
      techs:['JavaScript', 'ReactJS', 'React Native']
    }
    
    const { data } = await api.post('repositories', repository);

    setRepository([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(rep => rep.id !== id);

    setRepository(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(({title, id}) => {
          return (
            <li key={id}>
              {title}

              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          );
        })}
 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
