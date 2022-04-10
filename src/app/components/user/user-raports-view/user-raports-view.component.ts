import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { Raports } from 'src/app/_interface/raport';

@Component({
  selector: 'app-user-raports-view',
  templateUrl: './user-raports-view.component.html',
  styleUrls: ['./user-raports-view.component.scss']
})
export class UserRaportsViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserRaportsViewComponent>,
    private authService: AuthServiceService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}


  onConfirm(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }
}
