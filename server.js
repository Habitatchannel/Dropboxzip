require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/create-folder', async (req, res) => {
    const { mainFolder, subfolder1, siteName } = req.body;

    if (!siteName) {
        return res.status(400).json({ error: 'Please enter a Site Name.' });
    }

    let folderPath = `/${mainFolder}/${subfolder1}/${siteName}`;

    try {
        const response = await axios.post('https://api.dropboxapi.com/2/files/create_folder_v2', {
            path: folderPath,
            autorename: false
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.DROPBOX_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
