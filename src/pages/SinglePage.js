import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SinglePage = () => {
  const params = useParams()
  const ID = params.id
  
  const [pokemonDetails, setPokemonDetails] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
      axios.get(`https://pokeapi.co/api/v2/pokemon/${ID}`)
      .then((res)=>{
        setPokemonDetails(res.data)
        setLoading(false)
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])
      console.log(pokemonDetails);
  return (
    <div className='container-main mt-5 border shadow'>
      {loading ? (
            <h1 className='text-center'>Loading...</h1>
      ) : (
          <>
           <div className='content-img text-center border my-5 '>
             <img src={pokemonDetails.sprites.front_default}  alt="..." />
             <img src={pokemonDetails.sprites.back_default}  alt="..." />
           </div>
           <div className='content-name d-flex gap-2 m-2'>
             <h5>Name:</h5>
             <p>{pokemonDetails.name}</p>
           </div>
           <div className='content-details d-flex gap-2 m-2'>
             <h5>Type:</h5>
              <p>{pokemonDetails.types[0].type.name}</p>
           </div>
           <div className='content-details d-flex gap-2 m-2'>
            <h5>Height:</h5>
              <p>{pokemonDetails.height} m</p>
           </div>
           <div className='content-details d-flex gap-2 m-2'>
            <h5>Weight:</h5>
              <p>{pokemonDetails.weight} kg</p>
           </div>
           <div className='content-details d-flex gap-2 m-2'>
            <h5>Base Experience:</h5>
              <p>{pokemonDetails.base_experience}</p>
           </div>
          </> 
      )}
         
         
    </div>
  )
}

export default SinglePage