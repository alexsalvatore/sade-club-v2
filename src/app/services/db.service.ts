import { Injectable } from '@angular/core';
import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { BehaviorSubject, Observable } from 'rxjs';
import CypherKey from '../models/cypher-key.model';
import { EssayDark } from '../models/essay.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  essaysDarkList: EssayDark[] = []
  essaysDarkListSubject = new BehaviorSubject<EssayDark[]>([]);

  database: any;
  collections: any;
  schemaEssay: any = {
    title: 'essay',
    version: 0,
    primaryKey: 'hash',
    type: 'object',
    properties: {
      hash: {
        type: 'string',
        maxLength: 256 // <- the primary key must have set maxLength
      },
      title: {
        type: 'string'
      },
      author: {
        type: 'string',
      },
      addressEth: {
        type: 'string',
      },
      priceUSD: {
        type: 'number',
        minimum: 0,
      },
      coverImageBlurred: {
        type: 'string',
      },
      cypherData: {
        type: 'string',
      },
      cipherKeyHash: {
        type: 'string',
      }
    },
    required: ['hash', 'cypherData'],
    indexes: ['cipherKeyHash', 'addressEth']
  }
  schemaKey: any = {
    title: 'key',
    version: 0,
    primaryKey: 'hash',
    type: 'object',
    properties: {
      hash: {
        type: 'string',
        maxLength: 256 // <- the primary key must have set maxLength
      },
      key: {
        type: 'string'
      },
    },
    required: ['hash', 'key'],
    indexes: ['hash']
  }

  constructor() {
    this.initDB();
  }

  async initDB() {

    this.database = await createRxDatabase({
      name: 'essaysdb',
      storage: getRxStorageDexie()
    });

    this.collections = await this.database.addCollections({
      essays: {
        schema: this.schemaEssay
      },
      keys: {
        schema: this.schemaKey
      },
    });

    this.getAllEssays();
  }

  async addEssayDark(essay: EssayDark) {
    return await this.database.essays.insert({
      ...essay
    }).then(async () => this.getAllEssays());
  }

  async addKey(key: CypherKey) {
    return await this.database.keys.insert({
      ...key
    }).then(async () => this.getAllEssays());
  }

  subToEssayList(): Observable<EssayDark[]> {
    return this.essaysDarkListSubject;
  }

  async getAllEssays() {
    const query = this.database.essays.find();
    const results = await query.exec();
    console.log(results);
    this.essaysDarkList = results.map((doc: any) => {
      return new EssayDark(doc)
    });
    this.essaysDarkListSubject.next(this.essaysDarkList);
  }

  async getKeyForHash(hash: string) {

    const results = await this.database.keys.find().exec();
    console.log(results);

    return this.database.keys.findOne({
      selector: {
        hash
      }
    }).exec();
  }

}
