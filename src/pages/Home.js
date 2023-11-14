import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {
  const [pokemon, setPokemon] = useState([]); 
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // จำนวน Pokemon ต่อหน้า

  const getPokemonList = async () => {
    let pokemonArray = [];
    // กำหนดจำนวน data ก่อน get api มาเก็บไว้ใน array เอามา400
    for (let i = 1; i <= 400; i++) {
      pokemonArray.push(await getPokemonData(i));
    }
    setPokemon(pokemonArray);
    setLoading(false);
  }

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  }

  useEffect(() => {
    getPokemonList();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      // กรอง Pokemon โดยใช้ชื่อ
      const filtered = pokemon.filter(pokemon => {
        return pokemon.data.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredPokemon(filtered);
    } else {
      // ถ้าไม่มีค้นหาให้ใช้ Pokemon ทั้งหมด
      setFilteredPokemon(pokemon);
    }
  }, [searchQuery, pokemon]);


  // คำนวณหน้าสำหรับ Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);

  // การเปลี่ยนหน้า
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className='container-xl border text-center'>
      <h1 className='text-center my-3'>Pokemon List</h1>
      <div className="Search text-center my-3">
        <input
          type="text"
          placeholder='Search Pokemon'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid ">
        {loading ? (
          <h1 className='text-center'>Loading...</h1>
        ) : (
         
          currentItems.map((item, index) => (
              <Link to={`/card/${item.data.id}`} key={index} className="card m-3 shadow" >
                <img src={item.data.sprites.front_default} className="card-img" alt="..."/>
                <div className="card-body ">
                  <h5 className="card-title">{item.data.name}</h5>
                  <p className="card-text text-primary">More details...</p>
                </div>
              </Link>
          ))
          
        )}
      </div>
      <div className="pagination d-flex justify-content-center gap-3 my-3">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className='btn btn-primary'
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= filteredPokemon.length}
          className='btn btn-primary'
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
