import { Vehiculo } from './../../componentes/Vehiculo';
import { VehiculoService } from 'src/app/servicios/Vehiculo.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-VehiculoDetalle',
  templateUrl: './VehiculoDetalle.component.html',
  styleUrls: ['./VehiculoDetalle.component.css']
})
export class VehiculoDetalleComponent implements OnInit {

  vehiculo:any;
  isEditable:boolean=false;
  codigoVehiculo:string;
  formularioVehiculo:FormGroup;
  constructor(private vehiculoService:VehiculoService,
    private routes:ActivatedRoute,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
   this.formularioVehiculo = this.formBuilder.group({
    "codigo":[''],
    "marca":[''],
    "modelo":[''],
    "anio":[''],
    "id":[''],
    "foto":[''],
    "calificacion":[''],
   });
    this.routes.params.subscribe((params:any) =>{
    this.codigoVehiculo = params['codigo'];
    console.log(this.codigoVehiculo);
    this.consultarVehiculo();
   });
  }

  consultarVehiculo(){
    this.vehiculoService.getVehiculo(this.codigoVehiculo).subscribe((respuesta)=>{
      if(respuesta.codigo == '1'){
        this.vehiculo = respuesta.data;
        this.inicializarFormulario();
      }
    });
  }

  inicializarFormulario(){
    this.formularioVehiculo.controls['codigo'].setValue(this.vehiculo.codigo);
    this.formularioVehiculo.controls['marca'].setValue(this.vehiculo.marca);
    this.formularioVehiculo.controls['modelo'].setValue(this.vehiculo.modelo);
    this.formularioVehiculo.controls['anio'].setValue(this.vehiculo.anio);
    this.formularioVehiculo.controls['id'].setValue(this.vehiculo.id);
    this.formularioVehiculo.controls['foto'].setValue(this.vehiculo.foto);
    this.formularioVehiculo.controls['calificacion'].setValue(this.vehiculo.calificacion);
  }

  editar(){
    this.isEditable = true;
  }

  cancelar(){
    this.isEditable = false;
    this.inicializarFormulario();
  }

  grabar(){
    let vehiculo:Vehiculo = {... this.formularioVehiculo.value};
    this.vehiculoService.actualizarVehiculo(vehiculo,this.vehiculo.id).subscribe((respuesta)=>{
      if(respuesta.codigo == 1){
        this.isEditable = false;
        this.vehiculo.codigo = this.formularioVehiculo.controls['codigo'].value;
        this.vehiculo.marca = this.formularioVehiculo.controls['marca'].value;
        this.vehiculo.modelo = this.formularioVehiculo.controls['modelo'].value;
        this.vehiculo.anio = this.formularioVehiculo.controls['anio'].value;
        this.vehiculo.calificacion = this.formularioVehiculo.controls['calificacion'].value;
        this.vehiculo.foto= this.formularioVehiculo.controls['foto'].value;
        alert(respuesta.mensaje);
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
}



