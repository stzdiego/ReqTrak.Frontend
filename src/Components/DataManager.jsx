// src/Components/DataManager.jsx
import React, { useEffect, useState } from 'react';
import { database } from '../firebaseConfig'; // Importa la base de datos en tiempo real
import { ref, push, set, remove, onValue } from 'firebase/database'; // Importar funciones necesarias

const DataManager = () => {
    const [text, setText] = useState(''); // Estado para el texto del formulario
    const [data, setData] = useState([]); // Estado para almacenar los registros
    const [editingKey, setEditingKey] = useState(null); // Estado para controlar qué elemento se está editando
    const [editText, setEditText] = useState(''); // Estado para almacenar el nuevo texto durante la edición

    // Cargar datos desde Firebase en tiempo real
    useEffect(() => {
        const dataRef = ref(database, 'textEntries/');

        onValue(dataRef, (snapshot) => {
            const value = snapshot.val();
            const parsedData = value ? Object.entries(value).map(([key, val]) => ({ key, ...val })) : [];
            setData(parsedData); // Almacenar los datos en el estado
        });

        return () => {
            setData([]); // Limpia los datos cuando el componente se desmonta
        };
    }, []);

    // Agregar nuevo texto a la base de datos
    const handleAdd = async (e) => {
        e.preventDefault();
        if (text.trim()) {
            const newDataRef = push(ref(database, 'textEntries/')); // Crear una nueva entrada en la base de datos
            await set(newDataRef, { content: text }); // Guardar el texto
            setText(''); // Limpiar el campo de texto
        }
    };

    // Actualizar un registro existente
    const handleUpdate = async (key) => {
        const dataRef = ref(database, `textEntries/${key}`); // Referencia al registro que se está editando
        await set(dataRef, { content: editText }); // Actualizar el contenido con el nuevo texto
        setEditingKey(null); // Salir del modo de edición
        setEditText(''); // Limpiar el campo de edición
    };

    // Eliminar un registro de la base de datos
    const handleDelete = async (key) => {
        const dataRef = ref(database, `textEntries/${key}`); // Referencia al registro que se va a eliminar
        await remove(dataRef); // Eliminar el registro
    };

    return (
        <div>
            <h2>Gestor de Datos</h2>
            {/* Formulario para agregar nuevo texto */}
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Escribe algo"
                    required
                />
                <button type="submit">Agregar</button>
            </form>

            <div>
                {/* Mostrar los datos almacenados */}
                {data.length > 0 ? (
                    data.map((item) => (
                        <div key={item.key}>
                            {/* Si está en modo de edición, muestra el formulario de edición */}
                            {editingKey === item.key ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        placeholder="Editar texto"
                                    />
                                    <button onClick={() => handleUpdate(item.key)}>Guardar</button>
                                    <button onClick={() => setEditingKey(null)}>Cancelar</button>
                                </div>
                            ) : (
                                <div>
                                    <p>{item.content}</p>
                                    <button onClick={() => { setEditingKey(item.key); setEditText(item.content); }}>Editar</button>
                                    <button onClick={() => handleDelete(item.key)}>Eliminar</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No hay datos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default DataManager;
