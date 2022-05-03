import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Config } from 'src/app/_interface/config';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  config:any;

  postcode = new FormControl('', [Validators.required])

  form:FormGroup = this.fb.group({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postcode: this.postcode
  })
  
  lastraport:any;
  lastpayments:any;
  lastburden:any;
  premises:any;

  constructor(public authService: AuthService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authService.getConfig().then(data => {
      this.config = data as Config;
      this.form.controls['name'].setValue(this.config.name);
      this.form.controls['city'].setValue(this.config.city);
      this.form.controls['address'].setValue(this.config.address);
      this.form.controls['postcode'].setValue(this.config.postcode);
    })


    this.authService.calcOfTheLoad();

    this.lastraport = this.authService.getUser_LastRaport();
    this.lastpayments = this.authService.getUser_LastPayment();
    this.lastburden = this.authService.getUser_LastBurden();
    this.premises = this.authService.getUser_Premises();
  }

  getPrice(area:string, rate:string) {
    let sum = parseFloat(area) * parseFloat(rate);
    return sum.toFixed(2);
  }

  convert(value:string) {
    return value
  }

  saveCommunityName() {
    this.authService.saveDefaultConfiguration(this.form.value)
  }
}
