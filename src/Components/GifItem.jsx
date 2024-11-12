import React from 'react';

const GifItem = React.memo(({ title, url }) => {
    console.log(`Renderizando: ${title}`); // Para ver cuándo se renderiza
    return (
        <div className="gif-item">
            <img src={url} alt={title} />
            <p>{title}</p>
        </div>
    );
});

export default GifItem;
