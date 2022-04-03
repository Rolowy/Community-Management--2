import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Raports } from 'src/app/_interface/raport';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';


@Component({
  selector: 'app-raports',
  templateUrl: './raports.component.html',
  styleUrls: ['./raports.component.scss']
})
export class RaportsComponent implements OnInit {
  displayedColumns: string[] = ['name','owner','apartment', 'number', 'createdAt', 'scope', 'sum', 'delete'];
  dataSource = new MatTableDataSource();
  raports:any;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private router: Router, public dialog: MatDialog, public authService: AuthServiceService, public afs: Firestore) { }

  ngOnInit(): void {
    this.refreshUsersList();
  }

  async refreshUsersList() {
    const querySnapshot = await getDocs(collection(this.afs, "raports"));

    this.dataSource.data = querySnapshot.docs.map(el => {
      const data = el.data() as Raports;
      data.uid = el.id;
      return data;
    });
  }

  redirectToDelete(uid: string) {
    // this.db.collection('raport').doc(uid).delete();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}