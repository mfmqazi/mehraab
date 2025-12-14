export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { pdf } = req.query;

    if (!pdf) {
        return res.status(400).json({ error: 'PDF parameter is required' });
    }

    // Map PDF names to GitHub Release URLs
    const pdfUrls = {
        'dc-dutta-obstetrics': 'https://github.com/mfmqazi/mehraab/releases/download/v1.0.0/dc-dutta-obstetrics.pdf',
        'srb-surgery-6th': 'https://github.com/mfmqazi/mehraab/releases/download/v1.0.0/srb-surgery-6th.pdf',
        'ghai-pediatrics-8th': 'https://github.com/mfmqazi/mehraab/releases/download/v1.0.0/ghai-pediatrics-8th.pdf',
        'medicine-archit-boloor': 'https://github.com/mfmqazi/mehraab/releases/download/v1.0.0/medicine-archit-boloor.pdf',
        'ophthalmology-khurana': 'https://github.com/mfmqazi/mehraab/releases/download/v1.0.0/ophthalmology-khurana.pdf',
        'ent-dhingra': 'https://github.com/mfmqazi/mehraab/releases/download/v1.0.0/ent-dhingra.pdf'
    };

    const pdfUrl = pdfUrls[pdf];

    if (!pdfUrl) {
        return res.status(404).json({ error: 'PDF not found' });
    }

    try {
        // Forward the request to GitHub with range support
        const headers = {};
        if (req.headers.range) {
            headers['Range'] = req.headers.range;
        }

        const response = await fetch(pdfUrl, { headers });

        // Forward response headers
        res.setHeader('Content-Type', 'application/pdf');
        if (response.headers.get('content-length')) {
            res.setHeader('Content-Length', response.headers.get('content-length'));
        }
        if (response.headers.get('content-range')) {
            res.setHeader('Content-Range', response.headers.get('content-range'));
            res.status(206); // Partial Content
        }
        if (response.headers.get('accept-ranges')) {
            res.setHeader('Accept-Ranges', response.headers.get('accept-ranges'));
        }

        // Stream the PDF
        const buffer = await response.arrayBuffer();
        res.send(Buffer.from(buffer));

    } catch (error) {
        console.error('Error proxying PDF:', error);
        res.status(500).json({ error: 'Failed to fetch PDF' });
    }
}
