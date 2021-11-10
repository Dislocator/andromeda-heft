import { Injectable } from '@nestjs/common';
import{google} from 'googleapis'
// import { drive } from 'googleapis/build/src/apis/drive';
import * as keys from './google-docs-keys.json';

// const keys = require('./google-docs-keys.json')





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
    


    
