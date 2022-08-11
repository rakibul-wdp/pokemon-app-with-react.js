import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const Navbar = () => {
  const [message, setMessage] = useState('');
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${message}`);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      // 👇️ access input value from state
      console.log(message);

      event.target.value = '';
    }
  };
  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <>
      <div className='navbar bg-primary px-72'>
        <div className='flex-1'>
          <a className='btn btn-accent normal-case text-xl'>Pokemon</a>
        </div>
        <div className='flex-none gap-2'>
          <div className='form-control'>
            <input
              type='text'
              id='message'
              name='message'
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Search Pokemon'
              className='input input-bordered md:w-60 lg:w-96'
            />
          </div>
          <div className='dropdown dropdown-end'>
            <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img src='https://placeimg.com/80/80/people' alt='' />
              </div>
            </label>
          </div>
        </div>
      </div>
      <PokemonCard pokemon={pokeData} loading={loading} infoPokemon={(poke) => setPokeDex(poke)} />
      <div className=''>
        {prevUrl && (
          <button
            className='btn'
            onClick={() => {
              setPokeData([]);
              setUrl(prevUrl);
            }}
          >
            Previous
          </button>
        )}

        {nextUrl && (
          <button
            className='btn'
            onClick={() => {
              setPokeData([]);
              setUrl(nextUrl);
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
