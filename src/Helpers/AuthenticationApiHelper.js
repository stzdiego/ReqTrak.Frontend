// src/Helpers/AuthenticationApiHelper.js
import apiConfig from '../apiConfig';

export const callApiRegister = async (name, email, password) => {
    try {
        const response = await fetch(`${apiConfig.baseUrl}/Authentication/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to register: ${response.status} ${response.statusText} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in callApiRegister:', error);
        throw error;
    }
};