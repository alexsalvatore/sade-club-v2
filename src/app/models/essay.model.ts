import { AES, enc } from 'crypto-js';
import * as sha256 from 'crypto-js/sha256';


export class EssayHeader {

    title: string = "";
    author: string = "";
    addressEth: string = "";
    priceUSD: number = 0;
    coverImageBlurred: string = "";
    cipherKeyHash: string = "";

    constructor(data?: any) {
        this.title = data?.title ? data?.title : "";
        this.author = data?.author ? data?.author : "";
        this.addressEth = data?.addressEth ? data?.addressEth : "";
        this.priceUSD = data?.priceUSD ? data?.priceUSD : 0;
        this.coverImageBlurred = data?.coverImageBlurred ? data?.coverImageBlurred : "";
        this.cipherKeyHash = data?.cipherKeyHash ? data?.cipherKeyHash : "";
    }
}

export class EssayClear extends EssayHeader {

    coverImage: string = "";
    text: string = "";
    images: string[] = [];

    constructor(data?: any) {
        super(data);
        this.coverImage = data?.coverImage ? data?.coverImage : "";
        this.text = data?.text ? data?.text : "";
        this.images = data?.images ? data?.images : [];
    }


    encrypt(key: string): EssayDark {

        // We get the decrypted and encrypt it.
        const scryptedBytes = AES.encrypt(JSON.stringify({
            coverImage: this.coverImage,
            text: this.text,
            images: this.images,
        }), key);

        return new EssayDark({
            ...this,
            cipherKeyHash: sha256(key),
            cypherData: scryptedBytes.toString()
        });
    }

}

export class EssayDark extends EssayHeader {

    hash: string = "";
    cypherData: string = "";

    constructor(data?: any) {
        super(data);
        this.cypherData = data?.cypherData ? data.cypherData : "";
        this.hash = sha256(JSON.stringify(this)).toString();
    }

    decrypt(key: string): EssayClear {

        // Decrypt
        const bytes = AES.decrypt(this.cypherData, key);
        const stringifiedJSON = bytes.toString(enc.Utf8);
        return new EssayClear({ ...this, ...JSON.parse(stringifiedJSON) });
    }

}
