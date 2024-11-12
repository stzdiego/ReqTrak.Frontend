import React, { useEffect, useState } from 'react';
import { getDownloadURL } from 'firebase/storage'; // Importa getDownloadURL
import { storage } from '../firebaseConfig'; // Importar la configuración de Firebase
import { ref, deleteObject, listAll } from 'firebase/storage'; // Importar funciones necesarias
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos

const ImageManager = () => {
    const [images, setImages] = useState([]); // Estado para almacenar imágenes

    useEffect(() => {
        const fetchImages = async () => {
            const listRef = ref(storage, 'images/'); // Ruta donde están las imágenes

            try {
                const res = await listAll(listRef); // Obtener todas las imágenes de la carpeta
                const urls = await Promise.all(res.items.map(async (item) => {
                    // Crear una referencia para cada item
                    const url = await getDownloadURL(item); // Usar getDownloadURL en el item
                    return {
                        name: item.name,
                        url: url, // Retornar la URL de la imagen
                    };
                }));
                setImages(urls); // Actualiza el estado con las imágenes obtenidas
            } catch (error) {
                console.error('Error al cargar imágenes:', error);
            }
        };

        fetchImages(); // Llama a la función para cargar imágenes
    }, []);

    const deleteImage = async (imagePath) => {
        const imageRef = ref(storage, imagePath);

        try {
            await deleteObject(imageRef);
            console.log('Imagen eliminada con éxito');
            // Actualiza la lista de imágenes después de eliminar
            setImages(images.filter((img) => img.name !== imagePath.split('/').pop()));
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
        }
    };

    return (
        <div>
            <h2>Gestor de Imágenes</h2>
            <div>
                {images.length > 0 ? (
                    images.map((image) => (
                        <div key={uuidv4()}>
                            <img src={image.url} alt={image.name} style={{ width: '100px' }} />
                            <p>{image.name}</p>
                            <button onClick={() => deleteImage(`images/${image.name}`)}>Eliminar Imagen</button>
                        </div>
                    ))
                ) : (
                    <p>No hay imágenes disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ImageManager;
