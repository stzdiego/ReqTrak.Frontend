import React from 'react';

const CharacterItem = ({ name, image, status }) => {
    return (
        <div className="character-item">
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <p>Status: {status}</p>
        </div>
    );
};

export default CharacterItem;
