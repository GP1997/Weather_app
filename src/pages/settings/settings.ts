import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{Storage} from '@ionic/storage';
import{HomePage} from '../home/home';
import{AdMobFree,AdMobFreeBannerConfig }from '@ionic-native/admob-free';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city:string;
  state:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage,private admobFree:AdMobFree) {
  this.storage.get('location').then((val)=>{
    if(val !=null){
      let location = JSON.parse(val);
      this.city= location.city;
      this.state=location.state;
    }else{
      this.city='Delhi';
      this.state='India';
    }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    const bannerConfig: AdMobFreeBannerConfig = {
      id:'your_admob_key',
      //isTesting: true,
      autoShow: true
     };
     this.admobFree.banner.config(bannerConfig);
     
     this.admobFree.banner.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
  }
saveForm(){
  let location={
    city:this.city,
    state:this.state
  }
  this.storage.set('location',JSON.stringify(location));
  this.navCtrl.setRoot(HomePage);
}
}
