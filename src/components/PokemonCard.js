import React from 'react';

const PokemonCard = ({ pokemon, loading, infoPokemon }) => {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-72 my-20'>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <>
              <div key={item.id} onClick={() => infoPokemon(item)} className='card w-96 bg-base-100 shadow-xl'>
                <figure className='px-10 pt-10'>
                  <img src={item.sprites.front_default} alt='' className='rounded-xl w-48' />
                </figure>
                <div className='card-body items-center text-center'>
                  <h2 className='card-title'>{item.name}</h2>
                  <h2>{item.id}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className='card-actions'>
                    <button className='btn btn-primary'>Buy Now</button>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
};

export default PokemonCard;
