import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehiculo } from '../componentes/Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

constructor(private http: HttpClient) { }
baseUrl = "https://epico.gob.ec/vehiculo/public/api/";

getVehiculos(filtro?:string, rows?:number, page?:number){
  let body = new HttpParams();
  body = filtro ? body.set('filtro',filtro) : body;
  body = rows ? body.set('rows',rows) : body;
  body = page ? body.set('page',page) : body;
  return this.http.get<any>(this.baseUrl+"vehiculos/", {params:body});
 }


eliminarVehiculo(codigo:string){
  /*let index = this.listaAutos.findIndex((item) => item.codigo === codigo);
  this.listaAutos.splice(index, 1);*/
  return this.http.delete<any>(this.baseUrl+'vehiculo/'+codigo);
}

agregarVehiculo(vehiculo:Vehiculo){
  let body = this.getParamsVehiculo(vehiculo);
  return this.http.post<any>(this.baseUrl+'vehiculo/', body);
}

actualizarVehiculo(vehiculo:Vehiculo, codigo:string){
  let body = this.getParamsVehiculo(vehiculo);
  return this.http.put<any>(this.baseUrl+'vehiculo/'+ codigo, body);
}

getVehiculosFiltro(filtro:string){
  if(filtro == ""){
  return this.listaAutos;
  }
  return this.listaAutos.filter((item)=>
    item.codigo.includes(filtro.toUpperCase()) || item.marca.includes(filtro.toUpperCase()) || item.marca.includes(filtro.toUpperCase())
  );
}

getVehiculo(codigo:string){
  return this.http.get<any>(this.baseUrl + "vehiculo/" + codigo);
}

getParamsVehiculo(vehiculo:Vehiculo){
  let body = new HttpParams();
  body = vehiculo.codigo ? body.set('codigo',vehiculo.codigo) : body;
  body = vehiculo.marca ? body.set('marca',vehiculo.marca) : body;
  body = vehiculo.modelo ? body.set('modelo',vehiculo.modelo) : body;
  body = vehiculo.anio ? body.set('anio',vehiculo.anio) : body;
  body = vehiculo.calificacion ? body.set('calificacion',vehiculo.calificacion) : body;
  body = vehiculo.foto ? body.set('foto',vehiculo.foto) : body;
  return body;
}

private listaAutos:any[] = [
  {"codigo":"001", "marca":"CHEVROLET", "modelo":"Sail 1.5", "anio":"2023", "foto":"https://www.autotip.cl/wp-content/uploads/2022/12/chevrolet-sail.webp", "calificacion":"5"},
  {"codigo":"002", "marca":"CHEVROLET", "modelo":"ONIX", "anio":"2023", "foto":"https://www.chevrolet.com.mx/content/dam/chevrolet/na/mx/es/index/cars/2023-onix/colorizer/01-images/jellys/v2/azul-ultramar.jpg?imwidth=960","calificacion":"3" },
  {"codigo":"003", "marca":"NISSAN", "modelo":"Sentra", "anio":"2023", "foto":"https://girodosmotores.com/wp-content/uploads/2022/11/a-volta-da-nissan-sentra-2023-no-brasil-Capa-e1667417585770.webp","calificacion":"4"},
  {"codigo":"004", "marca":"TOYOTA", "modelo":"Corolla", "anio":"2023", "foto":"https://cdn.motor1.com/images/mgl/AkkXwL/s1/toyota-corolla-2023.webp","calificacion":"4"},
  {"codigo":"005", "marca":"HYUNDAI", "modelo":"Elantra", "anio":" 2023", "foto":"https://2684054.fs1.hubspotusercontent-na1.net/hub/2684054/hubfs/2023-Hyundai-elantra-limited.jpg?width=800&name=2023-Hyundai-elantra-limited.jpg","calificacion":"5"},
  {"codigo":"006", "marca":"NISSAN", "modelo":"Versa", "anio":"2023", "foto":"https://www.nissan-cdn.net/content/dam/Nissan/pe/vehicles/Versa_MY20/MY22/Advance%20MT.png.ximg.l_12_m.smart.png","calificacion":"4"}
];

}
