import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

export interface DialogData {
  number:number;
  user:any;
  uid:string;
  createdAt:any
}

@Component({
  selector: 'app-raports-delete',
  templateUrl: './raports-delete.component.html',
  styleUrls: ['./raports-delete.component.scss']
})
export class RaportsDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RaportsDeleteComponent>,
    private authService: AuthServiceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}


  onConfirm(): void {
    this.authService.delete(this.data.uid, 'raports');
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
