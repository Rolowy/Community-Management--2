import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { User } from 'src/app/_interface/user';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Payment } from 'src/app/_interface/payment';
import { PaymentsAddComponent } from './payments-add/payments-add.component';
import { PaymentsDeleteComponent } from './payments-delete/payments-delete.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'lastname', 'price', 'status', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private router: Router, public dialog: MatDialog, public authService: AuthServiceService, public afs: Firestore) { }

  ngOnInit(): void {
    this.refreshUsersList();
  }

  getRangeDisplayText = (page: number, pageSize: number, length: number) => {
    const initialText = `Wyświetlonych płatności`;  // customize this line
    if (length == 0 || pageSize == 0) {
      return `${initialText} 0 z ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
    return `${initialText} ${startIndex + 1} to ${endIndex} of ${length}`; // customize this line
  };

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Liczba Stron";
      this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
    }
  }


  async refreshUsersList() {
    const querySnapshot = await getDocs(collection(this.afs, "payments"));

    this.dataSource.data = querySnapshot.docs.map(el => {
      const data = el.data() as Payment;
      data.uid = el.id;
      return data;
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public redirectToEdit = (el: any) => {
    // const dialogRef = this.dialog.open(UsersEditComponent, {
    //   width: '500px;',
    //   data: el,
    // });
  }

  public addPayment() {
    const dialogRef = this.dialog.open(PaymentsAddComponent, {
      width: '500px;',
    });
  }

  public redirectToDelete = (el: any) => {
    const dialogRef = this.dialog.open(PaymentsDeleteComponent, {
      width: '800px;',
      data: el,
    });
  }
}