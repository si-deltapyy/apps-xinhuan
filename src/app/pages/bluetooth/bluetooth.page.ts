import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BleService } from 'src/app/services/ble.service';


@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {
  // public devices = {};
  devices: Observable<any[]>;

  
  public status: string = "disabled";

  constructor(private bleSrv: BleService, private router: Router,private appComponent: AppComponent) {
    this.devices = this.bleSrv.getObservableList();
    this.bleSrv.getObservableStatus().subscribe((status) => {
      this.status = status;
    });
    this.bleSrv.UpdateStatus();
  }

  ngOnInit() {
  }

  scan() {
    this.bleSrv.waitIsEnabled().then(
      ()=>{this.bleSrv.scan(10);},
      ()=>{this.onBluetoothDisabled()}
    );
    
  }

  connect(id: string) {
    this.bleSrv.stopScan();
    this.bleSrv.connect(id);
    this.appComponent.selectedIndex = 0; //update menu index. IMPROVE ME
    this.router.navigate(['pages/graph']);
  }

  onBluetoothDisabled() {
    this.bleSrv.alert("Bluetooth Disabled", "Please enable the Bluetooth and Location");
  }

  

}
