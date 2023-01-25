import * as fs from "fs";
import NodeRSA from "node-rsa";
export default class Decrypt {
    
    private key: NodeRSA;

    constructor() {
        
        let keyfile: string = fs.readFileSync("src/utils/rsa/private.pem", "utf8");
        this.key =  new NodeRSA(keyfile);
        this.key.setOptions({
            encryptionScheme: "pkcs1"
        });

    }

    decrypt(data: string): string{
        return this.key.decrypt(data, "ascii");
    }
}
