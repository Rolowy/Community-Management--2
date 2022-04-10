import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { User } from 'src/app/_interface/user';
import { collection, Firestore, getDocs, onSnapshot } from '@angular/fire/firestore';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { UsersAddComponent } from './users-add/users-add.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'lastname','bankaccount', 'address', 'city', 'postcode', 'email', 'phone', 'admin', 'edit'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private router: Router, public dialog: MatDialog, public authService: AuthServiceService, public afs: Firestore) { }

  ngOnInit(): void {
    this.getDocuments('users')
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
    if(this.paginator)
    {
      this.paginator._intl.itemsPerPageLabel = "Liczba Stron";
      this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
    }
  }


  getDocuments(col:string) {
    const querySnapshot = collection(this.afs, col);
    onSnapshot(querySnapshot, (querySnap) => {
    this.dataSource.data = querySnap.docs.map(el => {
        const data = el.data() as User;
        data.uid = el.id;
        return data
      })
  })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public redirectToEdit = (el: any) => {
    const dialogRef = this.dialog.open(UsersEditComponent, {
      width: '500px;',
      data: el,
    });
  }

  public addUser() {
    const dialogRef = this.dialog.open(UsersAddComponent, {
      width: '500px;',
    });
  }

  public redirectToDelete = (el: any) => {
    const dialogRef = this.dialog.open(UsersDeleteComponent, {
      width: '800px;',
      data: el,
    });
  }
}