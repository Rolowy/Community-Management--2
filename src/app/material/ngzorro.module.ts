import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzNotificationModule } from 'ng-zorro-antd/notification';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzTypographyModule,
    NzCollapseModule,
    NzNotificationModule
  ],
  exports: [
    NzTypographyModule,
    NzCollapseModule,
    NzNotificationModule
  ]
})
export class NgzorroModule { }
