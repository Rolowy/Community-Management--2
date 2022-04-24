import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';

export interface DialogData {
  uid:string;
  street:string;
  buildingnumber:string;
  apartmentnumber:string;
}

@Component({
  selector: 'app-premises-delete',
  templateUrl: './premises-delete.component.html',
  styleUrls: ['./premises-delete.component.scss']
})
export class PremisesDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PremisesDeleteComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onConfirm(): void {
    this.authService.delete(this.data.uid, 'apartments').then(() => {
      this.authService.viewMessageSuccess('Pomyślnie usunięto lokal');
      this.dialogRef.close(true);
    }).catch(error => {
      this.authService.viewMessageError('Wystąpił błąd podczas dodawania lokalu.');
      console.log(error);
    })
  }

  ngOnInit(): void {
  }

}
