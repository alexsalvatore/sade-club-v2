import { Component, OnInit } from '@angular/core';
import { EssayClear, EssayDark } from 'src/app/models/essay.model';
import { nanoid } from "nanoid";
import { blurPicture } from 'src/app/utils/images';
import { ListEssaysService } from 'src/app/services/list-essays.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-create-essay',
  templateUrl: './create-essay.component.html',
  styleUrls: ['./create-essay.component.sass']
})
export class CreateEssayComponent implements OnInit {

  essay: EssayClear = new EssayClear();
  encryptionKey: string = nanoid(64);

  constructor(private listEssayService: ListEssaysService, private db: DbService) { }

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
      // blur the image
      this.essay.coverImageBlurred = await blurPicture(this.essay.coverImage, 40) as string;
      this.onChange();
    };
    reader.readAsDataURL(file);
  }

  getRows() {
    const rows = Math.round(this.essay.text.length / 145) +
      this.essay.text.split("\n").length;
    return rows > 4 ? rows : 4;
  }

  onEncrypt() {
    const essayDark: EssayDark = this.essay.encrypt(this.encryptionKey);
    this.listEssayService.addEssay(essayDark);
    this.db.addEssayDark(essayDark);
    this.db.getAllEssays();
    this.essay = new EssayClear();
  }

}
