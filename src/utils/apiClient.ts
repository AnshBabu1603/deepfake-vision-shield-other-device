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

        // Match backend logic: prediction is "REAL" or "FAKE" based on avg_fake_score > 0.5
        const prediction = result.prediction;
        const isReal = prediction === 'REAL';

        return {
            isReal,
            details: `Prediction: ${prediction}`
        };
    } catch (error) {
        console.error('Error analyzing media:', error);
        throw error;
    }
};
