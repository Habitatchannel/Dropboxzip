async function getDropboxAccessToken() {
    try {
        const response = await axios.get('/getDropboxToken');
        return response.data.dropboxAccessToken;
    } catch (error) {
        console.error('Failed to fetch Dropbox access token:', error);
        return null;
    }
}

async function createFolders() {
    const mainFolder = document.getElementById('mainFolder').value.trim();
    const subfolder1 = document.getElementById('subfolder1').value.trim();
    const siteName = document.getElementById('siteName').value.trim();

    // Validate if siteName is provided
    if (!siteName) {
        alert('Please enter a Site Name.');
        return;
    }

    // Construct full folder path
    let folderPath = '';

    // Main Folder
    folderPath += '/' + mainFolder.replace(/^\//, ''); // Ensure no leading '/'

    // Subfolder 1
    if (subfolder1) {
        folderPath += '/' + subfolder1.replace(/^\//, ''); // Ensure no leading '/'
    }

    // Site Name (subfolder 2)
    folderPath += '/' + siteName.replace(/^\//, ''); // Ensure no leading '/'

    try {
        // Get Dropbox access token from server
        const accessToken = await getDropboxAccessToken();

        if (!accessToken) {
            alert('Failed to get Dropbox access token.');
            return;
        }

        // Create folder in Dropbox
        const response = await axios.post('https://api.dropboxapi.com/2/files/create_folder_v2', {
            path: folderPath,
            autorename: false // Set to true if you want Dropbox to auto-rename if a folder with the same name exists
        }, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data);
        alert('Folders created successfully in Dropbox!');

    } catch (error) {
        console.error('Error creating folders:', error.response ? error.response.data : error.message);
        alert('Failed to create folders in Dropbox. Check console for details.');
    }
}
