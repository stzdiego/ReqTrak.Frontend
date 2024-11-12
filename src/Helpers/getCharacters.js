export const getCharacters = async (name) => {
    const url = `https://rickandmortyapi.com/api/character?name=${name}`;
    const response = await fetch(url);
    const { results } = await response.json();

    // Retornamos un arreglo con los datos que necesitamos de los personajes
    return results.map(character => ({
        id: character.id,
        name: character.name,
        image: character.image,
        status: character.status
    }));
};
