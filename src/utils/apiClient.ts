
import { API_BASE_URL } from '@/config/api';

export const analyzeMedia = async (file: File, type: 'image' | 'video') => {
    console.log(`Sending ${type} file to ${API_BASE_URL}/analyze for analysis`);
    
    const formData = new FormData();
    formData.append('file', file, `analysis.${type === 'video' ? 'mp4' : 'jpg'}`);
    formData.append('type', type);

    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Analysis result:', result);
        return {
            isReal: result.isReal,
            details: result.details
        };
    } catch (error) {
        console.error('Error analyzing media:', error);
        throw error;
    }
};
