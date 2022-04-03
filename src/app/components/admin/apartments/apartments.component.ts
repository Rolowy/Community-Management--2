import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { User } from 'src/app/_interface/user';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { ApartmentsAddComponent } from './apartments-add/apartments-add.component';
import { ApartmentsDeleteComponent } from './apartments-delete/apartments-delete.component';
import { ApartmentsEditComponent } from './apartments-edit/apartments-edit.component';
import { Apartment } from 'src/app/_interface/apartment';


@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent implements OnInit {
  displayedColumns: string[] = ['street', 'buildingnumber', 'apartmentnumber', 'area', 'rate', 'postcode', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private router: Router, public dialog: MatDialog, public authService: AuthServiceService, public afs: Firestore) { }

  ngOnInit(): void {
    this.refreshApartmentsList();
  }

  getRangeDisplayText = (page: number, pageSize: number, length: number) => {
    const initialText = `Wyświetlonych użytkowników`;  // customize this line
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
    if(this.paginator)
    {
      this.paginator._intl.itemsPerPageLabel = "Liczba Stron";
      this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
    }
  }

  async refreshApartmentsList() {
    const querySnapshot = await getDocs(collection(this.afs, "apartments"));

    this.dataSource.data = querySnapshot.docs.map(el => {
      const data = el.data() as User;
      data.uid = el.id;
      return data;
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public redirectToEdit = (el:Apartment) => {
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

  public redirectToDelete = (el:Apartment) => {
    const dialogRef = this.dialog.open(ApartmentsDeleteComponent, {
      width: '800px;',
      data: el,
    });
  }
}