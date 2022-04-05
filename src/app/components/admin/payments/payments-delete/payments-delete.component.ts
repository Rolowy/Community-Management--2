import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

export interface DialogData {
  uid:string;
}

@Component({
  selector: 'app-payments-delete',
  templateUrl: './payments-delete.component.html',
  styleUrls: ['./payments-delete.component.scss']
})
export class PaymentsDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaymentsDeleteComponent>,
    private authService: AuthServiceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onConfirm(): void {
    this.authService.delete(this.data.uid, 'payments');
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
