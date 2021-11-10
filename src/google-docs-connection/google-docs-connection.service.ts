import { Injectable } from '@nestjs/common';
import{google} from 'googleapis'
import * as keys from './google-docs-keys.json';

// const keys = require('./google-docs-keys.json')

const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/drive.file']
    )

client.authorize(function(err, tokens) {
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log('Zaebis')
        
    }
    
})
@Injectable()
export class GoogleDocsConnectionService {
    
        
   
}
