import React, {useState, useEffect} from 'react';
import './App.css';
import Character from './components/Character';
import useFetch from './useFetch';


export default function App() {

  const { data, isPending, error } = useFetch('http://localhost:3002/char');

  const [title, setTitle] = useState('Player HUD')
  useEffect(()=>{
    document.title = title
  })
  
  return (
    <div className="App">
      <label htmlFor='titleChange'>Change Page Title</label><br />
            <input
                type="text"
                id="titleChange"
                onChange={e => setTitle(e.target.value)}
            />
            <hr />
      <header className="App-header">
        {isPending && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {data && data.map((item, i) => (
        <Character
          key={item.id}
          id={item.id}
          name={item.name}
          race={item.race}
          status={item.status}
          comment={item.comment}
          health={item.health}
          stamina={item.stamina}
          gold={item.gold}
          location={item.location}
        />
      ))}
      </header>
    </div>
  );
}