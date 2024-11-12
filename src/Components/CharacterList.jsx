import React from 'react';
import useFetch from '../Helpers/useFetch'; // Importamos nuestro Custom Hook

const CharacterList = ({ name }) => {
    const { data, isLoading, error } = useFetch(`https://rickandmortyapi.com/api/character?name=${name}`); // Usamos el Custom Hook

    if (isLoading) {
        return <h2>Cargando...</h2>; // Mensaje de carga
    }

    if (error) {
        return <h2>Error: {error}</h2>; // Mensaje de error
    }

    return (
        <div>
            <h3>Resultados de búsqueda para: {name}</h3>
            <div className="character-grid">
                {data.results.map(character => (
                    <div key={character.id} className="character-item">
                        <img src={character.image} alt={character.name} />
                        <h4>{character.name}</h4>
                        <p>Status: {character.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterList;
