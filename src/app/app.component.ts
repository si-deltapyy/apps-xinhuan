// import { Component } from '@angular/core';
// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   public appPages = [
//     { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
//     { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
//     { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
//     { title: 'Archived', url: '/folder/archived', icon: 'archive' },
//     { title: 'Trash', url: '/folder/trash', icon: 'trash' },
//     { title: 'Spam', url: '/folder/spam', icon: 'warning' },
//   ];
//   public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
//   constructor() {}
// }

import { Component, Input, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 1;
  public appPages = [
    {
      title: 'Graph',
      url: '/pages/graph',
      icon: 'analytics'
    },  
    {
      title: 'Bluetooth',
      url: '/pages/bluetooth',
      icon: 'bluetooth'
    },
    {
      title: 'Info',
      url: '/pages/info',
      icon: 'information-circle'
    }  
  ];
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('pages/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
