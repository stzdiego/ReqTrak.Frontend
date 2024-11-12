import React, { useState, useEffect } from 'react';
import CharacterItem from './CharacterItem';  // Componente para mostrar cada personaje
import { getCharacters} from '../Helpers/getCharacters';  // Importamos la función que obtiene los personajes

const CharacterGrid = ({ name }) => {
    // Hook useState para manejar la lista de personajes
    const [characters, setCharacters] = useState([]);

    // Función para cargar los personajes desde la API
    const loadCharacters = async () => {
        const charactersList = await getCharacters(name);
        setCharacters(charactersList);
        console.log(charactersList);  // Imprimir los personajes en la consola
    };

    // useEffect para cargar los personajes cuando el componente se renderiza
    useEffect(() => {
        loadCharacters();
    }, [name]);

    return (
        <div>
            <h3>Resultados de búsqueda para: {name}</h3>
            <div className="character-grid">
                {characters.map(character => (
                    <CharacterItem key={character.id} {...character} />  // Pasamos las props al componente CharacterItem
                ))}
            </div>
        </div>
    );
};

export default CharacterGrid;
