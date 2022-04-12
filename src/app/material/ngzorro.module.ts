import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NzTypographyModule,
    NzCollapseModule,
    NzNotificationModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzAlertModule,
    NzMessageModule
  ]
})
export class NgzorroModule { }
