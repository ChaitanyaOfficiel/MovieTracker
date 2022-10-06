import React,{useState, useEffect, useRef} from 'react'
function Home() {
  let appId = "Place your API"
  const ref = useRef
  const [name, setName] = useState("")
  const [movies, setMovies] = useState([])
useEffect(() => {
 const interval = setInterval(() => {
    const fetchMovies = async () => {
      const res = await fetch(`https://www.omdbapi.com/?s=${name}&plot=full&apikey=${appId}`)
      const data = await res.json()
      setMovies(data.Search)
    }  
    fetchMovies()
  },3000)
  return () => clearInterval(interval)
},[name])
const onChange = (e) => {
    e.preventDefault()
  setName(e.target.value)
  }
const onClear = (e) => {
  e.preventDefault()
    setName(" ") 
    ref.current.value = " "
}
  return (
    <>
    <form className='moviesearch' >
    <label className='formlabel'>Search Movie name</label>
    <input 
    className='formInput'
    type='text' id="name" value={name}
    placeholder='Enter the movie' onChange={onChange} />
  <button className='clearBtn' onClick={onClear}>Clear</button>
    </form>
    <div className='SearchItem'>
        {movies.map((movie) => (
          <div className='MovieItems' key={movie.imdbId}>
          <img src={movie.Poster} alt="movieImg"/>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          </div>
        ))}
   </div>
    </>
  )
}

export default Home
