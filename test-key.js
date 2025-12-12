// Test the API key directly
const API_KEY = 'AIzaSyB65_MEP4sF3Ns4q1qMIWhDwRARDyjW4hc';

const testKey = async () => {
    try {
        // Try listing available models
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();

        console.log('Available models:');
        if (data.models) {
            data.models.forEach(model => {
                console.log(`- ${model.name}`);
            });
        } else {
            console.log('Error:', data);
        }
    } catch (error) {
        console.log('Failed:', error.message);
    }
};

testKey();
