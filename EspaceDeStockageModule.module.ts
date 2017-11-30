import { NgModule }					from '@angular/core' ;
import { Routes, RouterModule }				from '@angular/router' ;
import { EspaceDeStockageMainSurfaceComponent }		from './espace-de-stockage-main-surface.component' ;
import { EspaceDeStockageNaviSurfaceComponent }		from './espace-de-stockage-navi-surface.component' ;
import { EspaceDeStockageSideSurfaceComponent }		from './espace-de-stockage-side-surface.component' ;
import { CommonModule }					from '@angular/common' ;
import { FormsModule, ReactiveFormsModule }		from '@angular/forms' ;
import { FeatureMaterialModule }			from '../../features/feature-material-module.module' ;
import { EspaceDeStockageService }			from './espace-de-stockage.service' ;
import { LayoutModule }					from '@angular/cdk/layout' ;
import { EspaceDeStockageProgressDialogComponent }	from './espace-de-stockage-progress-dialog.component' ;
import { EspaceDeStockagePopMenuDialogComponent }	from './espace-de-stockage-pop-menu-dialog.component' ;

const espaceDeStockageModuleRoutes: Routes = [
  {
    path: 'espacedestockagemaindisplay' ,
    component: EspaceDeStockageMainSurfaceComponent ,
    outlet: 'kawaviewarea'
  },
  {
    path: 'espacedestockagenavidisplay' ,
    component: EspaceDeStockageNaviSurfaceComponent ,
    outlet: 'kawanavi' 
  },
  {
    path: 'espacedestockagesidedisplay' ,
    component: EspaceDeStockageSideSurfaceComponent ,
    outlet: 'kawamenu'
  }
]

@NgModule({
  declarations: [
    EspaceDeStockageMainSurfaceComponent,
    EspaceDeStockageNaviSurfaceComponent,
    EspaceDeStockageSideSurfaceComponent,
    EspaceDeStockageProgressDialogComponent,
    EspaceDeStockagePopMenuDialogComponent
  ],
  imports: [
    RouterModule.forChild( espaceDeStockageModuleRoutes) ,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeatureMaterialModule,
    LayoutModule
  ],
  providers: [ EspaceDeStockageService ],
  entryComponents: [ EspaceDeStockageProgressDialogComponent, EspaceDeStockagePopMenuDialogComponent ]
})
export class EspaceDeStockageModule{

}
