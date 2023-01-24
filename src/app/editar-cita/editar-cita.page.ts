import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from '../servicios/cita.service';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.page.html',
  styleUrls: ['./editar-cita.page.scss'],
})
export class EditarCitaPage implements OnInit {
  id: any;
  citaForm!: FormGroup;
  constructor(
    private citaService: CitaService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
      this.citaService.getById(this.id).subscribe(res =>{
        this.citaForm.setValue(res);
      })
   }

  ngOnInit() {
    this.citaForm = this.fb.group({
      paciente: [''],
      correo: [''],
      celular: ['']
    })
  }
  updateCita(){
    if (!this.citaForm.valid) {
      return false;
    } else {      
      this.citaService.update(this.id, this.citaForm.value).then(() => {
        console.log('Cita actualizada exitosamente!')
        this.citaForm.reset();
        this.router.navigate(['/home']);
      });
    }
    return true;
  }
}
