import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController, IonContent, IonModal, ToastController } from '@ionic/angular';
import { getDownloadURL, getStorage,ref } from 'firebase/storage';
import { finalize, Subscriber, Subscription } from 'rxjs';
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
  newImage ='';
  uploadedImage: File;
  usuario :Usuario;
  SuscribeUserInfo: Subscription
  constructor(private usuarioSerivce : UsuarioService,
    private documento:DocumentService,
    private alertController: AlertController,
    private serviceUser:UsuarioService,
    private router: Router,
    public storage: AngularFireStorage,) { }

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
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (image) => {
        this.newImage = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    const pathI = 'Cliente';
    const id = this.uid;
    this.SuscribeUserInfo= this.documento.getDocument<Usuario>(pathI,id).subscribe(res =>{
      if(res){
        this.info = res;
      }
      console.log(res);
    })
    const path ='Perfil';
    const path1 ='Cliente';
    const name =this.info.nombre;
    console.log(this.info.nombre)
    const file = event.target.files[0];
    const res = await this.documento.cargarImagen(file,path,name);
    console.log('resibi el la primesa',res)
    this.info.foto = res;
    this.documento.update(path1,id,this.info)
  }
  actualizarFoto(id: string, user: Usuario){
    this.documento.updateFoto(id,user);
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
  
//////Codigo Luis/////
}
