import {NgModule} from '@angular/core';
import {CoreStoreModule} from './store/index';
import {CoreEffectsModule} from './effects';


@NgModule({
  imports: [
    CoreStoreModule,
    CoreEffectsModule
  ]
})
export class CoreModule {
}
