import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EssayDark } from '../models/essay.model';

@Injectable({
  providedIn: 'root'
})
export class ListEssaysService {

  essaysDarkList: EssayDark[] = []
  essaysDarkListSubject = new BehaviorSubject<EssayDark[]>([]);

  constructor() { }

  subToEssayList(): Observable<EssayDark[]> {
    return this.essaysDarkListSubject;
  }

  addEssay(essay: EssayDark) {
    this.essaysDarkList.push(essay);
    this.essaysDarkListSubject.next(this.essaysDarkList);
  }

}
