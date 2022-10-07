import * as fs from "fs";
import "node-rsa"
import NodeRSA from "node-rsa";
export default class Decrypt {
    
    key: NodeRSA;

    constructor() {
        
        // let privateKey =  new NodeRSA(fs.readFileSync("src/utils/rsa/private.pem"));
        // let publicKey  =  new NodeRSA(fs.readFileSync("src/utils/rsa/public.pem"));
        
        // let aa = publicKey.encrypt("testekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkks");
       
        // let bb = privateKey.decrypt(aa, 'utf8');
        // console.log(bb.toString());
       
        let keyfile: string = fs.readFileSync("src/utils/rsa/private.pem", "utf8");
        this.key =  new NodeRSA(keyfile);
        this.key.setOptions({
            encryptionScheme: "pkcs1"
        });

        // this.key.importKey(keyfile, "pkcs1-private-pem");
    }

    decrypt(data: string): string{
        console.log("---------------------- DECRYPT -------------------------");
        console.log(data);
        
        let de: string = this.key.decrypt(data, "ascii");
        return de;
    }
}
