import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/shared/auth.service';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Raports } from 'src/app/_interface/raport';
import { query, where } from 'firebase/firestore';
import { UserRaportsViewComponent } from '../user-raports-view/user-raports-view.component';


@Component({
  selector: 'app-user-raports',
  templateUrl: './user-raports.component.html',
  styleUrls: ['./user-raports.component.scss']
})
export class UserRaportsComponent implements OnInit, AfterViewInit {
  uid: string;

  displayedColumns: string[] = ['position', 'fullname', 'createdAt', 'scope', 'edit'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private router: Router, public dialog: MatDialog, public authService: AuthService, public afs: Firestore) {
    this.uid = this.authService.userID;
    this.getDocuments('raports');
  }

  async getDocuments(col: string) {
    this.uid = await this.authService.userID;
    const querySnapshot = query(collection(this.afs, col), where("user.uid", "==", this.uid));
    onSnapshot(querySnapshot, (querySnap) => {
      this.dataSource.data = querySnap.docs.map(el => {
        const data = el.data() as Raports;
        data.uid = el.id;
        return data
      })
    })
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getRangeDisplayText = (page: number, pageSize: number, length: number) => {
    const initialText = `Wyświetlonych płatności`;
    if (length == 0 || pageSize == 0) {
      return `${initialText} 0 z ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
    return `${initialText} ${endIndex} z ${length}`;
  };

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Liczba Stron";
      this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public showDetail = (el: any) => {
    const dialogRef = this.dialog.open(UserRaportsViewComponent, {
      width: '80%',
      data: el,
    });
  }


  public Converter(value: string) {
    return value.replace(/ą/g, 'a').replace(/Ą/g, 'A').replace(/ć/g, 'c').replace(/Ć/g, 'C').replace(/ę/g, 'e').replace(/Ę/g, 'E').replace(/ł/g, 'l').replace(/Ł/g, 'L').replace(/ń/g, 'n').replace(/Ń/g, 'N').replace(/ó/g, 'o').replace(/Ó/g, 'O').replace(/ś/g, 's').replace(/Ś/g, 'S').replace(/ż/g, 'z').replace(/Ż/g, 'Z').replace(/ź/g, 'z').replace(/Ź/g, 'Z');
  }
}
