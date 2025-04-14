
import { API_BASE_URL } from '@/config/api';

export const analyzeMedia = async (file: File, type: 'image' | 'video') => {
    const formData = new FormData();
    formData.append('file', file, `analysis.${type === 'video' ? 'mp4' : 'jpg'}`);
    formData.append('type', type);

    const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }

    return response.json();
};
