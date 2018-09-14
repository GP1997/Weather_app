import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,private admobFree:AdMobFree) {
  }
  ionViewDidLoad(){
  const bannerConfig: AdMobFreeBannerConfig = {
    id:'your_admob-key',
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
}
