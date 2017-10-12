import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './user.effects';
import {DebugEffects} from './debug.effects';

const effects = [UserEffects, DebugEffects];

@NgModule({
  imports: [
    EffectsModule.forRoot(effects)
  ]
})
export class CoreEffectsModule {
}
