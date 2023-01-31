import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EssayDark } from 'src/app/models/essay.model';
import { DbService } from 'src/app/services/db.service';
import { ListEssaysService } from 'src/app/services/list-essays.service';

@Component({
  selector: 'app-list-essays',
  templateUrl: './list-essays.component.html',
  styleUrls: ['./list-essays.component.sass']
})
export class ListEssaysComponent implements OnInit {

  public listEssay$: Observable<EssayDark[]>;

  constructor(private db: DbService) {
    this.listEssay$ = this.db.subToEssayList();
  }

  ngOnInit(): void {
  }

}
