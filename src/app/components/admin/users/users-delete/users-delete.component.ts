import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';

export interface DialogData {
  name: string;
  lastname: string;
  uid: string;
}

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.scss']
})
export class UsersDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UsersDeleteComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }


  onConfirm(): void {
    this.authService.delete(this.data.uid, 'users');
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
