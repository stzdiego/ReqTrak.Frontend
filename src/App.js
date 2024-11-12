import React from 'react';
import DataManager from './Components/DataManager'; // Importa el gestor de datos

const App = () => {
    return (
        <div>
            <h1>Gestión de Texto</h1>
            <DataManager /> {/* Renderiza el gestor de datos */}
        </div>
    );
};

export default App;
