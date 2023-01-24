import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscriber, Subscription } from 'rxjs';
import { Usuario } from '../entidades/Cita';
import { DocumentService } from '../servicios/document.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  uid : string =null; 
  info : Usuario=null;
  SuscribeUserInfo: Subscription
  constructor(private usuarioSerivce : UsuarioService,
    private documento:DocumentService,
    private alertController: AlertController,
    private serviceUser:UsuarioService,
    private router: Router,) { }

  async ngOnInit() {
    const uid = await this.usuarioSerivce.getId();
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
    this.SuscribeUserInfo= this.documento.getDocument<Usuario>(path,id).subscribe(res =>{
      if(res){
        this.info = res;
      }
      console.log(res);
    })
  }

  
  async presentAlert(name:string,) {
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
  async cargarImgen(event:any){
    console.log('Entro')
    const path ='Perfil';
    const name ='prueba';
    const file = event.targer.files[0];
    const res = await this.documento.cargarImagen(file,path,name);
    console.log('resibi el la primesa',res)
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
    this.SuscribeUserInfo.unsubscribe();
    this.serviceUser.logaut()
    this.uid = null;
    this.router.navigate(['/login']);
  }
}