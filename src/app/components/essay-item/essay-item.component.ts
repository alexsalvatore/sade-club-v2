import { Component, Input, OnInit } from '@angular/core';
import CypherKey from 'src/app/models/cypher-key.model';
import { EssayClear, EssayDark } from 'src/app/models/essay.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-essay-item',
  templateUrl: './essay-item.component.html',
  styleUrls: ['./essay-item.component.sass']
})
export class EssayItemComponent implements OnInit {

  @Input() essayDark: EssayDark = new EssayDark();
  essayClear: EssayClear | null = null
  encryptionKey: string = "";

  constructor(private db: DbService) { }

  ngOnInit(): void {
    this.db.getKeyForHash(this.essayDark.cipherKeyHash).then((result: CypherKey) => {
      console.log(result);
      if (result != null) {
        this.encryptionKey = result.key;
        this.essayClear = this.essayDark.decrypt(this.encryptionKey);
      }
    });
  }

  onDrecrypt($event: any) {
    this.essayClear = this.essayDark.decrypt(this.encryptionKey);
    this.db.addKey(new CypherKey({ key: this.encryptionKey }));
    console.log(this.essayClear);
  }

}
