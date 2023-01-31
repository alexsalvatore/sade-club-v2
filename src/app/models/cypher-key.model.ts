import * as sha256 from 'crypto-js/sha256';
import { nanoid } from "nanoid";

export default class CypherKey {

    hash: string;
    key: string;

    constructor(data?: any) {
        this.key = data?.key ? data?.key : nanoid(64);
        this.hash = sha256(this.key).toString();
    }
}