import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EssayDark } from 'src/app/models/essay.model';
import { ListEssaysService } from 'src/app/services/list-essays.service';

@Component({
  selector: 'app-list-essays',
  templateUrl: './list-essays.component.html',
  styleUrls: ['./list-essays.component.sass']
})
export class ListEssaysComponent implements OnInit {

  public listEssay$: Observable<EssayDark[]>;

  constructor(private listEssayService: ListEssaysService) {
    this.listEssay$ = this.listEssayService.subToEssayList();
  }

  ngOnInit(): void {

  }

}
