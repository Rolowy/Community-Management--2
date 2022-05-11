import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Raports } from 'src/app/_interface/raport';
import { AuthService } from 'src/app/shared/auth.service';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { RaportsDeleteComponent } from './raports-delete/raports-delete.component';


@Component({
  selector: 'app-raports',
  templateUrl: './raports.component.html',
  styleUrls: ['./raports.component.scss']
})
export class RaportsComponent implements OnInit {
  displayedColumns: string[] = ['number', 'owner', 'apartment', 'createdAt', 'scope', 'edit'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private router: Router, public dialog: MatDialog, public authService: AuthService, public afs: Firestore) { }

  ngOnInit(): void {
    this.getDocuments('raports');
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDocuments(col: string) {
    const querySnapshot = collection(this.afs, col);
    onSnapshot(querySnapshot, (querySnap) => {
      this.dataSource.data = querySnap.docs.map(el => {
        const data = el.data() as Raports;
        data.fullname = data.user.name;
        data.uid = el.id;
        return data
      })
    })
  }
  


  redirectToDelete(raportData: Raports) {
    this.dialog.open(RaportsDeleteComponent, {
      data: raportData,
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}