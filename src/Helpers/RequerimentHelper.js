import apiConfig from '../apiConfig';

const stageMap = {
    '0': 'Pending',
    '1': 'Rejected',
    '2': 'Approved',
    '3': 'Planned',
    '4': 'In Progress',
    '5': 'Done'
};

class RequerimentHelper {
    static async updateStage(requeriment, newStage, apiUserId, user, addTrack) {
        try {
            const requestBody = {
                idRequeriment: requeriment.id,
                idUser: parseInt(apiUserId, 10),
                stage: parseInt(newStage, 10),
                description: `Stage changed to ${stageMap[newStage]}`
            };

            const response = await fetch(`${apiConfig.baseUrl}/Requeriments/updateStage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update the stage: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const newTrack = {
                idReq: requeriment.id,
                user: user.displayName,
                date: new Date().toISOString(),
                stage: stageMap[newStage],
                description: `Stage changed to ${stageMap[newStage]}`
            };
            await addTrack(newTrack);
        } catch (error) {
            console.error('Error updating stage:', error);
            throw error;
        }
    }
}

export default RequerimentHelper;