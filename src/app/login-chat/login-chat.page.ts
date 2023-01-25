import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioChatService } from '../servicios/usuario-chat.service';

@Component({
  selector: 'app-login-chat',
  templateUrl: './login-chat.page.html',
  styleUrls: ['./login-chat.page.scss'],
})
export class LoginChatPage implements OnInit {
  constructor(
    private router: Router,
    private chatService : UsuarioChatService,
  ) { }
  credenciales ={
    correo :"",
    password :""
  }
  ngOnInit() {
  }
  async login(){
    const res = await this.chatService.login(this.credenciales.correo , this.credenciales.password)
      .then(res => {
        console.log(res);
        this.router.navigate(['/inicio'])
      })
      .catch(error => console.log(error));
  }
}
