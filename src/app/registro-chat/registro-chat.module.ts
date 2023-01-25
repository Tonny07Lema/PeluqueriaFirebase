import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroChatPageRoutingModule } from './registro-chat-routing.module';

import { RegistroChatPage } from './registro-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroChatPageRoutingModule
  ],
  declarations: [RegistroChatPage]
})
export class RegistroChatPageModule {}
