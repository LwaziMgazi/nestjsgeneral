import * as fs from 'fs';
import * as dotenv from 'dotenv';

export class AppConfig {

  static get getTwilioAuthToken(){
    return process.env['TWILIO_AUTHTOKEN'];
  }

  static get getTwilioAccount(){
    return process.env['TWILIO_ACCOUNT_SID'];
  }

  private static loadEnvFile(envFilePath:string | string[]) {
    let confings ={};
    //make sure envFilePath variable is in array
    const envFilePaths = Array.isArray(envFilePath) ? envFilePath: [envFilePath ];
    

    for (let envFilePath of envFilePaths){
        if(fs.existsSync(envFilePath)){
             confings = {...confings, ...dotenv.parse(fs.readFileSync(envFilePath))};

        }
      
    }
    return confings;
  }

  static loadEnvironmentVariable(envFilePath:string | string[]) {
    const envConfigs= this.loadEnvFile(envFilePath);

    Object.keys(envConfigs).forEach(key=>{
        if(!( key in process.env)) {
            process.env[key] = envConfigs[key]
        }
    })

  }
}