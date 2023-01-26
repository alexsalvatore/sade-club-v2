import { Component, OnInit } from '@angular/core';
import { Essay } from 'src/app/models/essay.model';
import { nanoid } from "nanoid";

@Component({
  selector: 'app-create-essay',
  templateUrl: './create-essay.component.html',
  styleUrls: ['./create-essay.component.sass']
})
export class CreateEssayComponent implements OnInit {

  essay: Essay = new Essay();
  encryptionKey: string = nanoid(64);

  constructor() { }

  ngOnInit(): void { }

  onChange($event?: any) { }

  onCoverSelected($event: any) {
    if ($event.target.files.length == 0) return;
    const file: File = $event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      // log to console
      // logs data:<type>;base64,wL2dvYWwgbW9yZ...
      this.essay.coverImage = reader.result as string;
      this.onChange();
    };
    reader.readAsDataURL(file);
  }

  getRows() {
    const rows = Math.round(this.essay.text.length / 145) +
      this.essay.text.split("\n").length;
    return rows > 4 ? rows : 4;
  }

  onPublish() {

  }

}
