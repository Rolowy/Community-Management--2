import { Component, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { collection, Firestore } from '@angular/fire/firestore';
import { ApartmentsAddComponent } from './apartments-add/apartments-add.component';
import { ApartmentsDeleteComponent } from './apartments-delete/apartments-delete.component';
import { ApartmentsEditComponent } from './apartments-edit/apartments-edit.component';
import { Apartment } from 'src/app/_interface/apartment';
import { onSnapshot } from 'firebase/firestore';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent implements OnInit {
  displayedColumns: string[] = ['street', 'buildingnumber', 'apartmentnumber', 'area', 'rate', 'postcode', 'edit'];
  dataSource = new MatTableDataSource();

  
  @ViewChild(MatSort, {static:true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  constructor(private router: Router, public dialog: MatDialog, public authService: AuthServiceService, public afs: Firestore) {
    this.getDocuments('apartments');
  }

  getDocuments(col:string) {
    const querySnapshot = collection(this.afs, col);
    onSnapshot(querySnapshot, (querySnap) => {
    this.dataSource.data = querySnap.docs.map(el => {
        const data = el.data() as Apartment;
        data.uid = el.id;
        console.log(data);
        return data
      })
  })
  }


  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getRangeDisplayText = (page: number, pageSize: number, length: number) => {
    const initialText = `Wyświetlonych lokali`;  // customize this line
    if (length == 0 || pageSize == 0) {
      return `${initialText} 0 z ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
    return `${initialText} ${startIndex + 1} z ${endIndex} na ${length}`; // customize this line
  };

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Liczba Stron";
      this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public redirectToEdit = (el: Apartment) => {
    const dialogRef = this.dialog.open(ApartmentsEditComponent, {
      width: '500px;',
      data: el,
    });
  }

  public addApartment() {
    const dialogRef = this.dialog.open(ApartmentsAddComponent, {
      width: '500px;',
    });
  }

  public redirectToDelete = (el: Apartment) => {
    const dialogRef = this.dialog.open(ApartmentsDeleteComponent, {
      width: '800px;',
      data: el,
    });
  }
}