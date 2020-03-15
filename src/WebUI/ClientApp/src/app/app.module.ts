import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule,Routes } from '@angular/router';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

import { LoginModule } from 'app/login/login.module';
import { UserRoleModule } from 'app/user-role/user-role.module';
import { UserModule } from 'app/user/user.module';
import { TaxModule } from 'app/tax/tax.module';
import { SellerModule } from 'app/seller/seller.module';
import { ClientModule } from 'app/client/client.module';
import { PropertyModule } from 'app/property/property.module';

import { CoreModule } from 'app/core/core.module';

import { AppComponent } from './app.component';
import { ApiAuthorizationModule } from 'api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: './main/pages/pages.module#PagesModule'
  },
  {

    path: '**',
    redirectTo: 'client'
  }
];

@NgModule({
  declarations: [
    AppComponent
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
   
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ModalModule.forRoot(),


    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,


    // App modules
    LayoutModule,
    LoginModule,
    SampleModule,
    CoreModule,
    UserRoleModule,
    UserModule,
    TaxModule,
    SellerModule,
    ClientModule,
    PropertyModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
