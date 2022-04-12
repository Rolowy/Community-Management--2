import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { Firestore, query } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDoc, getDocs, where } from 'firebase/firestore';
import { umask } from 'process';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { Config } from 'src/app/_interface/config';
import { Raports } from 'src/app/_interface/raport';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  

@Component({
  selector: 'app-user-raports-view',
  templateUrl: './user-raports-view.component.html',
  styleUrls: ['./user-raports-view.component.scss']
})
export class UserRaportsViewComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'amount', 'converter', 'unit', 'price'];
  dataSource:any;
  value = new Subject<Raports>();
  dateu:any;
  config = new BehaviorSubject<Config>({} as any);

  bankaccount = new BehaviorSubject('');
  

  constructor(private activeRouter: ActivatedRoute, private afs: Firestore, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.bankaccount.next(this.authService.userInfo.value.bankaccount || '');
    this.getConfig();
    this.getDetails();
  }

  generatePDF() {  
    let docDefinition = {  
      header: 'C#Corner PDF Header',  
      content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'  
    };  
   
    pdfMake.createPdf(docDefinition).open();  
  }  

  async getDetails() {
    let uid = this.activeRouter.snapshot.paramMap.get('id') || '';

    const docRef = doc(this.afs, "raports", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Raports;
      this.value.next(data);
      this.dataSource = data.otherStatus;
      //console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
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
      PDF.save('angular-demo.pdf');
    });
  }

  async getConfig() {
    const docRef = doc(this.afs, "config", "config");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Config;
      console.log(data);
      this.config.next(data);
      //console.log("config data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  getTotalCost() {
    return this.dataSource.otherStatus.map((t:any) => t.price).reduce((acc:number, value:number) => acc + value, 0);
  }

}
