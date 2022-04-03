import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

export interface DialogData {
  uid:string;
  street:string;
  buildingnumber:string;
  apartmentnumber:string;
}

@Component({
  selector: 'app-apartments-delete',
  templateUrl: './apartments-delete.component.html',
  styleUrls: ['./apartments-delete.component.scss']
})
export class ApartmentsDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ApartmentsDeleteComponent>,
    private authService: AuthServiceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onConfirm(): void {
    this.authService.delete(this.data.uid, 'apartments');
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
