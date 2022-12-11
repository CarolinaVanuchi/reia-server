import * as fs from "fs";
import NodeRSA from "node-rsa";

export default class Encrypt {
    
    private key: NodeRSA;

    constructor() {
        let keyfile: string = fs.readFileSync("src/utils/rsa/public.pem", "utf8");
        this.key =  new NodeRSA(keyfile);
        this.key.setOptions({
            encryptionScheme: "pkcs1"
        });
    }

    encrypt(data: string): string {
        return  this.key.encrypt(data, "base64");
    }
}
