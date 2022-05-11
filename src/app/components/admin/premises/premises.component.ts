import { Component, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/shared/auth.service';
import { collection, Firestore } from '@angular/fire/firestore';
import { PremisesAddComponent } from './premises-add/premises-add.component';
import { PremisesDeleteComponent } from './premises-delete/premises-delete.component';
import { PremisesEditComponent } from './premises-edit/premises-edit.component';

import { Apartment } from 'src/app/_interface/apartment';
import { onSnapshot } from 'firebase/firestore';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-premises',
  templateUrl: './premises.component.html',
  styleUrls: ['./premises.component.scss']
})
export class PremisesComponent implements OnInit {
  displayedColumns: string[] = ['street', 'owner.name', 'owner.lastname', 'buildingnumber', 'apartmentnumber', 'area', 'rate', 'postcode', 'edit'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private router: Router, public dialog: MatDialog, public authService: AuthService, public afs: Firestore) {
  }

  ngOnInit(): void {
    this.getDocuments('apartments');
    this.dataSource.sortingDataAccessor = this.authService.pathDataTable;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDocuments(col: string) {
    const querySnapshot = collection(this.afs, col);
    onSnapshot(querySnapshot, (querySnap) => {
      this.dataSource.data = querySnap.docs.map(el => {
        const data = el.data() as Apartment;
        data.uid = el.id;
        data.nameuser = data.owner.name;
        data.lastnameuser = data.owner.lastname;
        return data
      })
    })
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Liczba Stron";
      this.paginator._intl.getRangeLabel = this.authService.getRangeDisplayText;
    }
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  redirectToEdit = (el: Apartment) => {
    const dialogRef = this.dialog.open(PremisesEditComponent, {
      width: '500px;',
      data: el,
    });
  }

  addApartment() {
    const dialogRef = this.dialog.open(PremisesAddComponent, {
      width: '500px;',
    });
  }

  redirectToDelete = (el: Apartment) => {
    const dialogRef = this.dialog.open(PremisesDeleteComponent, {
      width: '800px;',
      data: el,
    });
  }
}