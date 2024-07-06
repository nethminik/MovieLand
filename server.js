/// ======= Start Google drive Authentication =========================================================================

const { google } = require("googleapis");
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Load the service account key JSON file.
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'movieland-427602-99a0cfdfd3fa.json');

// Define the required scopes.
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive'];

// Create a JWT client.
const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: SCOPES,
});

// Create a Google Drive client.
const drive = google.drive({ version: 'v3', auth });

/// ======= End Google drive Authentication ==================================================================

//================ Search a file ==============================
async function searchMovie(name){

    const files = [];
    try{
        const request = await drive.files.list({
            q: `mimeType=\'video/x-matroska\' and name contains '${name}'`,         //q: 'mimeType=\'video/x-matroska\''
            fields: 'nextPageToken, files(id, name)',
            spaces: 'drive',
        });
        if(request.status === 200){
            request.data.files.forEach(file=>{
                files.push(file);
                console.log(JSON.stringify(file))
            })
            return files;
        }else{
            console.log("Authentication error");
            return {};
        }
    }catch(error){
        console.log("Error:"+ "Not Found");
        return {};
    }
}

module.exports= { searchMovie};