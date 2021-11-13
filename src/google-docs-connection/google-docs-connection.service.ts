import { Injectable } from '@nestjs/common';
import{google} from 'googleapis'
// import { drive } from 'googleapis/build/src/apis/drive';
import * as keys from './google-docs-keys.json';
import fs from 'fs';

import readline from 'readline'

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = 'token.json';


// async connection(cl){
//     const gdapi = google.drive({version:'v3',cl})
//     drive.
// }
@Injectable()
export class GoogleDocsConnectionService {
    constructor(
        
    ) {
   

        
            
    }
    async zalepa(){
        const client = new google.auth.JWT(
            keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/documents']
            )
        client.authorize((err, tokens) => {
           
            if(err){
                console.log(err);
                return;
            }
            else{
                 this.gsrun(client)
                
                
            }
        })
    }
    async gsrun(cl) {
        const docapi = google.docs({version: 'v1', auth: cl});
    
        const opt = {
            documentId: "1A_OuTBAxhWYtpsNZTKCEhdAjk62IymGCMRk5PgdOT54",
            
        }

        let data = await docapi.documents.get(opt)
        console.log(data.data.body)
        data.data.body.content[1].paragraph.elements[0].textRun = {content:"Получается бан"}
        var updateObject = {
            documentId: opt.documentId,
            resource: {
              requests: [{
                insertText: {
                  text: "Sameer Bayani",
                  location: {
                    index: 1, // Modified
                  },
                },
              }],
            },
          };
        
        docapi.documents.batchUpdate(updateObject)
        let document = await docapi.documents.create()
        return data

    }
    
async zalepaDrive(){
    fs.readFile("./src/google-docs-connection/google-docs-keys.json", (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        this.authorize(JSON.parse(content.toString()), this.listFiles);
      });
}

    async authorize(credentials, callback){
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
      
        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return this.getAccessToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token.toString()));
          callback(oAuth2Client);
        });
    }



    async getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) return console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
          });
        });
      }
   

    async listFiles(auth) {
        const drive = google.drive({version: 'v3', auth});
        drive.files.list({
          pageSize: 10,
          fields: 'nextPageToken, files(id, name)',
        }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const files = res.data.files;
          if (files.length) {
            console.log('Files:');
            files.map((file) => {
              console.log(`${file.name} (${file.id})`);
            });
          } else {
            console.log('No files found.');
          }
        });
      }
    }
// import { Injectable, NotFoundException } from '@nestjs/common';
// import {google} from 'googleapis'
// import {keys} from '../keys.json'

// @Injectable()
// export class DocsService {
    // constructor() {
    //     const client =  new google.auth.JWT(
    //         keys.client_email, null,  keys.private_key,
    //         
    //     )
//         client.authorize((err, tokens) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 this.gsrun(client)
//             }
//         })
//     }
    


    
