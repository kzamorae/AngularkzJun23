import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vehiculo } from 'src/app/componentes/Vehiculo';
import { VehiculoService } from 'src/app/servicios/Vehiculo.service';

@Component({
  selector: 'app-Vehiculos',
  templateUrl:'./Vehiculos.component.html',
  styleUrls: ['./Vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService,
     private formBuilder: FormBuilder) {}

  filtrarPor:string = "";

  listaVehiculo:any[] = [];
  mostrarImagen:boolean = false;

  formularioVehiculo: FormGroup;

  rows: number =5;
  pages: number ;
  page: number =1;

  ngOnInit(){
    this.consultaVehiculos();
    this.formularioVehiculo = this.formBuilder.group({
      "marca": [null],
      "modelo":[null],
      "codigo": [null],
      "anio": [null],
      "calificacion": [null],
      "foto": [null]
    });
  }

  consultaVehiculos(){
    this.vehiculoService.getVehiculos(this.filtrarPor, this.rows, this.page).subscribe((respuesta)=>{
      if(respuesta.codigo == 1){
        this.listaVehiculo = respuesta.data;
        this.rows = respuesta.rows;
        this.pages = respuesta.pages;
      }
    });
  }

  mostrarAlerta(calificacion:any){
    alert("La calificacion es: " + calificacion);
  }


  eliminarVehiculo(vehiculo:any){
    this.vehiculoService.eliminarVehiculo(vehiculo.id).subscribe((respuesta)=>{
      if(respuesta.codigo == 1){
        alert(respuesta.mensaje);
        this.consultaVehiculos();
      }
    });
  }

  getListaVehiculos(): any[]{
    return this.listaVehiculo;
  }

  guardarVehiculo(){
    let vehiculo:Vehiculo = {...this.formularioVehiculo.value};
    console.log(vehiculo);
    this.vehiculoService.agregarVehiculo(vehiculo).subscribe((respuesta)=>{
      alert(respuesta.mensaje);
      if(respuesta.codigo == 1){
        this.consultaVehiculos();
      }
    },
    (errorHttp:HttpErrorResponse) => {
      console.log(errorHttp.error);
      let mensaje = errorHttp.error.mensaje;
      mensaje += errorHttp.error.error?.codigo ? (' - ' + errorHttp.error.error?.codigo) :"";
      mensaje += errorHttp.error.error?.marca ? (' - ' + errorHttp.error.error?.marca) :"";
      mensaje += errorHttp.error.error?.modelo ? (' - ' + errorHttp.error.error?.modelo) :"";
      mensaje += errorHttp.error.error?.anio ? (' - ' + errorHttp.error.error?.anio) :"";
      alert(mensaje);
   });
  }

  seleccionarPagina(page:number){
    this.page = page;
    this.consultaVehiculos();
  }

  cambioRows(){
    this.page = 1;
    this.consultaVehiculos();
  }

}
