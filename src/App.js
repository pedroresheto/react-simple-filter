import { useEffect, useState } from 'react'
import './App.css';



function App() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')

  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await fetch('http://37.228.116.165/api/advantages/?format=json')
      const data = await response.json()
      setItems(data)
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      <div className='container'>
        <input className='form-control' type='text' placeholder='search'
        onChange={(e)=> setSearch(e.target.value)}></input>
        
        <div className='raw d-flex'>
        {items.filter((item => {
          return search.toLowerCase() === '' ? item : item.first_raw.toLowerCase().includes(search)
        })).map((item, index) => {
          return <div className='col-md-2' key={index}>
                  <p className='card-title'>{item.first_raw}</p>
                  <a href='#' className='btn primary'>{item.bold}</a>
                  <p className='card-text'>{item.second_raw}</p>
                </div>
        })}
        
      </div>
      </div>
     
    </div>
  );
}

export default App;
