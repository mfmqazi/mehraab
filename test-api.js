// Quick test script for the API
const testAPI = async () => {
    try {
        const response = await fetch('https://mehraab.vercel.app/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: 'What is the MONA protocol for acute MI? Answer in one sentence.'
            })
        });

        const data = await response.json();
        console.log('✅ API Response:');
        console.log(JSON.stringify(data, null, 2));

        if (data.success) {
            console.log('\n🎉 SUCCESS! Generated text:');
            console.log(data.text);
        } else {
            console.log('\n❌ Error:', data.error);
        }
    } catch (error) {
        console.log('❌ Failed:', error.message);
    }
};

testAPI();
