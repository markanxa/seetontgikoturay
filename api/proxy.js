export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Не указан параметр url' });
    }

    const allowedDomains = [
        'api.coingecko.com',
        'api.binance.com',
        'api.bybit.com',
        'www.okx.com',
        'api.kucoin.com',
        'api.coincap.io',
        'api.ston.fi'
    ];

    const isAllowed = allowedDomains.some(domain => url.includes(domain));
    if (!isAllowed) {
        return res.status(403).json({ error: 'Домен не разрешён' });
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
