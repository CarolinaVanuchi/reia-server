import * as fs from "fs";
import NodeRSA from "node-rsa";
// import * as base64 from "js-base64";

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
        const enc =  this.key.encrypt(data, "base64");
        // const enc =  this.key.encrypt(data, "ascii");
        return enc;
        // return base64.encode(enc);
    }
}
