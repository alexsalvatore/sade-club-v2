import { Component, Input, OnInit } from '@angular/core';
import { EssayClear, EssayDark } from 'src/app/models/essay.model';

@Component({
  selector: 'app-essay-item',
  templateUrl: './essay-item.component.html',
  styleUrls: ['./essay-item.component.sass']
})
export class EssayItemComponent implements OnInit {

  @Input() essayDark: EssayDark = new EssayDark();
  essayClear: EssayClear | null = null
  encryptionKey: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onDrecrypt($event: any) {
    this.essayClear = this.essayDark.decrypt(this.encryptionKey);
    console.log(this.essayClear);
  }

}
