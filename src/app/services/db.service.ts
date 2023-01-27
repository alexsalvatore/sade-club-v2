import { Injectable } from '@angular/core';
import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { EssayDark } from '../models/essay.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  database: any;
  collections: any;
  schema: any = {
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
        schema: this.schema
      },
    });

  }

  async addEssayDark(essay: EssayDark) {
    console.log('addEssayDark', essay);
    return await this.database.essays.insert({
      ...essay
    });
  }

  async getAllEssays() {
    const query = this.database.essays.find();
    const results = await query.exec();
    console.dir(results);
  }

}
