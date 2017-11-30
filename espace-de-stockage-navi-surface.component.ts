import { Component }			from '@angular/core' ;
import { KawaSidenavService }		from '../../kawa-sidenav.service' ;
import { KawaModuleStackService }	from '../../kawa-kawaModule-stack.service' ;

@Component({
  templateUrl: './espace-de-stockage-navi-surface.component.html', 
  styleUrls: ['./espace-de-stockage-navi-surface.component.css']
})
export class EspaceDeStockageNaviSurfaceComponent {

  constructor( private kawaSidenavService: KawaSidenavService,
    private kawaModuleStackService: KawaModuleStackService) {}
  

  toggleSide(): void {
    this.kawaSidenavService.toggle();
  }

  switchModule(): void{
    this.kawaModuleStackService.switch();
  }

}
