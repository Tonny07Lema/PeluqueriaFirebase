import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegistroU } from '../entidades/Clases';
import { DocumentService } from '../servicios/document.service';
import { UsuarioChatService } from '../servicios/usuario-chat.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  uid : string =null; 
  info : RegistroU=null;
  constructor(
    private chatServicio : UsuarioChatService,
    private router: Router,
    private documento:DocumentService,
    private alertController: AlertController,
  ) { }

  async ngOnInit() {
    const uid = await this.chatServicio.getId();
    if(uid){
      this.uid = uid;
      console.log(this.uid);
      this.informacion();
    }else{
      console.log("No existe UID");
    }
  }
  informacion(){
    const path = 'Cliente';
    const id = this.uid;
    this.documento.getDocument<RegistroU>(path,id).subscribe(res =>{
      if(res){
        console.log(res)
        this.info = res;
      }
      console.log(res);
    })
  }
  async presentAlert(name:string) {
    const alert = await this.alertController.create({
      header: 'Editar'+name,
      inputs: [
        {
          name:name,
          type: 'text',
          placeholder: 'Ingrese su '+name,
        },
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          cssClass:'secondary',
          handler:()=>{
            console.log('Confim Cancel')
          }
        },
        {
          text:'Aceptar',
          handler:(ev)=>{
            console.log('Confim Ok')
            this.actualizar(name,ev[name]);
          }
        }
      ],
    });
    await alert.present();
  }
  actualizar(name: string,input:any){
    const path = 'Cliente';
    const id = this.uid;
    const update ={
    };
    update[name] = input
    this.documento.update(path,id,update);
  }
    async logout(){
    this.chatServicio.logaut()
    this.router.navigate(['/login-chat']);
  }
} 
