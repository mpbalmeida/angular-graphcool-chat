import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloConfigModule } from 'src/app/apollo-config.module';
import {Title} from '@angular/platform-browser';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    ApolloConfigModule
  ],
  providers: [Title]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in AppModule.');
    }
  }
}
