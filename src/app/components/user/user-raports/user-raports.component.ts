import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/shared/auth.service';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Raports } from 'src/app/_interface/raport';
import { query, where } from 'firebase/firestore';


import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { UserRaportsViewComponent } from '../user-raports-view/user-raports-view.component';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-user-raports',
  templateUrl: './user-raports.component.html',
  styleUrls: ['./user-raports.component.scss']
})
export class UserRaportsComponent implements OnInit, AfterViewInit {
  uid: string;

  displayedColumns: string[] = ['position', 'fullname', 'createdAt', 'scope', 'edit'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

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
        console.log(data);
        return data
      })
    })
  }

  ngOnInit(): void {

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



  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public showDetail = (el: any) => {
    const dialogRef = this.dialog.open(UserRaportsViewComponent, {
      width: '80%',
      data: el,
    });
  }


  public Converter(value:string) {
    return value.replace(/ą/g, 'a').replace(/Ą/g, 'A').replace(/ć/g, 'c').replace(/Ć/g, 'C').replace(/ę/g, 'e').replace(/Ę/g, 'E').replace(/ł/g, 'l').replace(/Ł/g, 'L').replace(/ń/g, 'n').replace(/Ń/g, 'N').replace(/ó/g, 'o').replace(/Ó/g, 'O').replace(/ś/g, 's').replace(/Ś/g, 'S').replace(/ż/g, 'z').replace(/Ż/g, 'Z').replace(/ź/g, 'z').replace(/Ź/g, 'Z');
  }

    

  
  public GeneratePDF(element:any) {
    const doc = new jsPDF()

    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
		doc.setFont("Amiri");
					

    doc.setFontSize(15);

    doc.text('Faktura #' + element.number , 90, 20);

    let date = new Date();


    doc.setFontSize(10);
    doc.text('Elk, ' + date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear(), 160, 35);

    doc.setFontSize(10);
    doc.text('Wspolnota Mieszkaniowa Bora Komorowskiego 12A w Elku', 20, 35);
    doc.setFontSize(10);
    doc.text('ul Bora Komorowskiego 12A', 20, 40);
    doc.setFontSize(10);
    doc.text('19-300 Elk', 20, 45);

    
    doc.setFontSize(10);
    doc.text('67', 120, 70);
    doc.setFontSize(10);
    doc.text('ul. Bora Komorowskiego 12A m.6', 120, 75);
    doc.setFontSize(10);
    doc.text('19-300, Ełk', 120, 80);

    
    autoTable(doc, {
      head: [['Lokal', 'Cena jednostkowa', 'Kwota']],
      body: [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Spain'],
      ],
      margin: {top: 100},
    })

    autoTable(doc, {
      head: [['Suma']],
      body: [],
      margin: {top: 120},
    })

    doc.save('table.pdf')
  }
}