import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { CitaService } from '../servicios/cita.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 citas?:  any[];
  handlerMessage = '';
  roleMessage = '';
  constructor(
    private citaService: CitaService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.listAllCitas();    
  }
  listAllCitas(){
    this.citaService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.citas = data;
      console.log(this.citas);
    });
  }

  async deleteCita(id: string){    
    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea eliminar el registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',          
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.citaService.delete(id).then(() => {
              this.listAllCitas();
              console.log('Cita eliminada exitosamente!')
            }).catch(err => console.log(err));
          },
        },
      ],
    });

    await alert.present();    
  }

}
