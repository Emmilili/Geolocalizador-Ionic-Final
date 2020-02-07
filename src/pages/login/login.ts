import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { ViewChild, AfterViewInit } from '@angular/core';
import { Slides } from 'ionic-angular';
// servicio
import { UsuarioProvider } from '../../providers/usuario/usuario';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit {

  @ViewChild(Slides) slides: Slides;
  clave:string = "";

  constructor( public navCtrl: NavController,
               private _usuarioService: UsuarioProvider,
               private alertCtrl: AlertController,
               private loadingCtrl: LoadingController ) {
  }

  continuar() {

    let loading = this.loadingCtrl.create({
      content: "Espere por favor"
    });
    loading.present();

    // Profe, esto verifica si la clave es válida
    this._usuarioService.verifica_usuario(this.clave)
        .then( valido => {
          
          loading.dismiss();

          if( valido ) {
            
            this.slides.lockSwipes(false);
            
            this.slides.slideNext();
           
            this.slides.lockSwipes(true);

          } else {
          this.alertCtrl.create({
            title: "La Clave no es Correcta",
            subTitle: "Por favor verifique su clave",
            buttons: ["OK!"]
          }).present();
        }

        })
        .catch( error => {
        
          loading.dismiss();
          console.log("ERROR VERIFICAR USUARIO: " + JSON.stringify( error ));
        })
  }

  ingresar() {
    this.navCtrl.setRoot( HomePage );

  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";
  }



}
