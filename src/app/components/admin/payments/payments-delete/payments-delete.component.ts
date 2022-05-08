import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';

export interface DialogData {
  uid: string;
}

@Component({
  selector: 'app-payments-delete',
  templateUrl: './payments-delete.component.html',
  styleUrls: ['./payments-delete.component.scss']
})
export class PaymentsDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaymentsDeleteComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onConfirm(): void {
    this.authService.delete(this.data.uid, 'payments');
  }

  ngOnInit(): void {
  }

}
