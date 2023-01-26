import { AES } from 'crypto-js';

export class Essay {

    title: string = "";
    author: string = "";
    addressEth: string = "";
    priceUSD: number = 0;

    coverImage: string = "";
    text: string = "";
    images: string[] = [];

    encrypt(key: string) {
        /*this.coverImage = AES.encrypt(this.coverImage, key);
        this.text = AES.encrypt(this.text, key);*/
    }

    decrypt(key: string) {
        /*this.coverImage = AES.decrypt(this.coverImage, key);
        this.text = AES.decrypt(this.text, key);*/
    }

}