import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc, } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Config } from 'src/app/_interface/config';
import { Raports } from 'src/app/_interface/raport';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-user-raports-view',
  templateUrl: './user-raports-view.component.html',
  styleUrls: ['./user-raports-view.component.scss']
})
export class UserRaportsViewComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'amount', 'converter', 'unit', 'price'];
  displayedColumnsApartment: string[] = ['index', 'name', 'amount', 'converter', 'unit', 'price'];
  dataSource: any;
  value = new BehaviorSubject<Raports>({} as any);
  config = new BehaviorSubject<Config>({} as any);
  sum = new BehaviorSubject(0);
  bankaccount = new BehaviorSubject('');

  constructor(private activeRouter: ActivatedRoute, private afs: Firestore, private authService: AuthService) { }

  ngOnInit(): void {
    this.bankaccount.next(this.authService.userInfo.value.bankaccount || '');
    this.getConfig();
    this.getDetails();
  }

  async getDetails() {
    let uid = this.activeRouter.snapshot.paramMap.get('id') || '';

    const docRef = doc(this.afs, "raports", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Raports;
      this.value.next({ ...data });

      if(data.premises == true)
      {
      data.otherStatus.unshift({ name: "Opłata za lokal", amount: this.parseToPrice(data.apartment.area), converter: "m2", price: this.parseToPrice(data.apartment.rate) });
      }
      this.dataSource = data.otherStatus;
      const totalprice = data.otherStatus.reduce((acc: number, val: any) => { acc += parseFloat(val.price) * parseFloat(val.amount); return acc }, 0);
      this.sum.next(totalprice.toFixed(2));

    } else {
      console.log("Nie odnaleziono dokumentu.");
    }
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('Document');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`Rozliczenie.pdf`);
    });
  }



  parseToPrice(value: string) {
    value = value.replace(',', '.');
    return parseFloat(value).toFixed(2);
  }

  async getConfig() {
    const docRef = doc(this.afs, "config", "config");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Config;
      this.config.next(data);
    } else {
      console.log("Nie odnaleziono dokumentu.");
    }
  }

  getTotalCost() {
    return this.dataSource.otherStatus.map((t: any) => t.price).reduce((acc: number, value: number) => acc + value, 0);
  }

}
