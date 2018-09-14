import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{WeatherProvider} from '../../providers/weather/weather';
import{Storage} from '@ionic/storage';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather:any;
  location:{
    city:string,
    country:string
  }
 constructor(public navCtrl: NavController,private weatherProvider:WeatherProvider,private storage:Storage,private admobFree:AdMobFree) {
  }
ionViewWillEnter(){
  this.storage.get('location').then((val)=> {
if(val!=null){
this.location= JSON.parse(val);
}else{
  this.location= {
    city: 'Delhi',
    country:'India'
  }
}
this.weatherProvider.getWeather(this.location.city,this.location.country).subscribe(weather=>
{this.weather= weather.current_observation;
});
});
}
ionViewDidLoad(){
const bannerConfig: AdMobFreeBannerConfig = {
  id:'your-adsmob-key',
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
