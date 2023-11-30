import { useEffect, useState } from 'react'
import './App.css';



function App() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  
  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await fetch('http://37.228.116.165/api/advantages/')
      const data = await response.json()
      setItems(data)
    }
    fetchData()
  }, [])

  const handleSearch = ()=>{
    const filteredItems = items.filter(item => {
      return item.first_raw.toLowerCase().includes(search.toLowerCase())
   })

   setFiltered(filteredItems)
   setIsSubmit(true)
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    handleSearch()
  }
  return (
    <div className="App">
      <div className='container'>
        <form className='input-group mb-3' onSubmit={handleSubmit}>
           <input className='form-control' type='text' placeholder='search'
           onChange={(e)=> setSearch(e.target.value)} value={search}></input>
            <button className='btn btn-secondary' type='submit'>search</button>
        </form>
        
        
        <div className='raw d-flex justify-content-between'>
        {isSubmit ? filtered.map((item, index) => {
          return <div className='col-md-2' key={index}>
                  <h3 className='card-title'>{item.first_raw}</h3>
                  <p className='card-text'>{item.bold}</p>
                </div>
        }): items.map((item)=>{
          return <div className='col-mg-2' key={item.first_raw}>
            <h3 className='card-title'>{item.first_raw}</h3>
            <p className='card-text'>{item.bold}</p>
          </div>
        })}
        
        </div>
      </div>
     {isSubmit ? <h3 onClick={()=> {
      setIsSubmit(false)
      setSearch('')
      }}>show all</h3>: ""}
    </div>
  );
}

export default App;
