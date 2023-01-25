import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginChatPageRoutingModule } from './login-chat-routing.module';

import { LoginChatPage } from './login-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginChatPageRoutingModule
  ],
  declarations: [LoginChatPage]
})
export class LoginChatPageModule {}
