import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { User } from 'src/app/_interface/user';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Payment } from 'src/app/_interface/payment';
import { PaymentsAddComponent } from './payments-add/payments-add.component';
import { PaymentsDeleteComponent } from './payments-delete/payments-delete.component';
import { PaymentsEditComponent } from './payments-edit/payments-edit.component';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],

})
export class PaymentsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'lastname', 'price', 'status', 'date', 'edit'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private router: Router, public dialog: MatDialog, public authService: AuthServiceService, public afs: Firestore) {
    this.getDocuments('payments');
  }

  getDocuments(col:string) {
    const querySnapshot = collection(this.afs, col);
    let index = 1;
    onSnapshot(querySnapshot, (querySnap) => {
    this.dataSource.data = querySnap.docs.map(el => {
        const data = el.data() as Payment;
        data.uid = el.id;
        data.index = index;
        index+=1;
        return data
      })
  })
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public redirectToEdit = (el: any) => {
    const dialogRef = this.dialog.open(PaymentsEditComponent, {
      width: '500px;',
      data: el,
    });
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