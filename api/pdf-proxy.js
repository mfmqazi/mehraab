export default async function handler(req, res) {
    const { pdf } = req.query;
    
    if (!pdf) {
        return res.status(400).json({ error: 'PDF parameter is required' });
    }

    const pdfUrl = `https://github.com/mfmqazi/mehraab/releases/download/v1.0.0/${pdf}.pdf`;

    try {
        const response = await fetch(pdfUrl);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: 'PDF not found' });
        }

        const buffer = await response.arrayBuffer();
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        
        res.send(Buffer.from(buffer));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch PDF' });
    }
}
