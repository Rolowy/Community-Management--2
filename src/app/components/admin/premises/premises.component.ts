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
  displayedColumns: string[] = ['street', 'ownername', 'ownerlastname', 'buildingnumber', 'apartmentnumber', 'area', 'rate', 'postcode', 'edit'];
  dataSource = new MatTableDataSource();

  
  @ViewChild(MatSort, {static:true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  constructor(private router: Router, public dialog: MatDialog, public authService: AuthService, public afs: Firestore) {
    this.getDocuments('apartments');
  }

  getDocuments(col:string) {
    const querySnapshot = collection(this.afs, col);
    onSnapshot(querySnapshot, (querySnap) => {
    this.dataSource.data = querySnap.docs.map(el => {
        const data = el.data() as Apartment;
        // data.name = data.owner.name;
        // data.lastname = data.owner.lastname;
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
    const dialogRef = this.dialog.open(PremisesEditComponent, {
      width: '500px;',
      data: el,
    });
  }

  public addApartment() {
    const dialogRef = this.dialog.open(PremisesAddComponent, {
      width: '500px;',
    });
  }

  public redirectToDelete = (el: Apartment) => {
    const dialogRef = this.dialog.open(PremisesDeleteComponent, {
      width: '800px;',
      data: el,
    });
  }
}