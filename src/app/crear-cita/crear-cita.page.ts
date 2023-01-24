import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CitaService } from '../servicios/cita.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.page.html',
  styleUrls: ['./crear-cita.page.scss'],
})
export class CrearCitaPage implements OnInit {
  citaForm!: FormGroup;
  constructor(
    private citaService: CitaService,
    private serviceUser:UsuarioService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.citaForm = this.fb.group({
      paciente: [''],
      correo: [''],
      celular: ['']
    })
  }
  saveCita() {    
    if (!this.citaForm.valid) {
      return false;
    } else {      
      this.citaService.create(this.citaForm.value).then(() => {
        console.log('Cita creada exitosamente!')
        this.citaForm.reset();
        this.router.navigate(['/home']);
      });
    }
    return true;
  }
  logout(){
    this.serviceUser.logaut()
    this.router.navigate(['/login']);
  }



}