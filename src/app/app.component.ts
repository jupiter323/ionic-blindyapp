import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav, ViewController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IndexPage } from '../pages/index/index';
import { Storage } from '@ionic/storage';
import { HeaderColor } from '@ionic-native/header-color';
import { HomePage } from '../pages/home/home';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CallsPage } from '../pages/calls/calls';

import { CallModalTrigger } from '../components';
import { CallService } from '../services/call'

import * as moment from 'moment';
declare var cordova: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  email: string;
  isInCall = false


  constructor(private callservice: CallService, events: Events, callModal: CallModalTrigger, private headerColor: HeaderColor, platform: Platform, statusBar: StatusBar, public storage: Storage, splashScreen: SplashScreen) {




    platform.ready().then(() => {

      // statusBar.styleDefault();

      splashScreen.hide();


      if (platform.is('cordova') && cordova.plugins.iosrtc) {
        cordova.plugins.iosrtc.registerGlobals();
        if (platform.is('android')) {
          // header color setting

          this.headerColor.tint("#b70360");

        }
      }

      // alternating home or signIn/Up/Verify
      storage.ready().then(() => {
        storage.get('blindyVariables').then((val) => {

          if (val) {
            this.rootPage = HomePage;
          } else {

            this.rootPage = IndexPage;
          }
        }).catch(function (err) {
          console.log(err);
        })
      }).catch(function (err) {
        console.log(err);
      });
    });

    events.subscribe('call.status.isincall', status => {
      console.debug('call status changed to ', status);
      this.isInCall = status;
    });


  }


}

