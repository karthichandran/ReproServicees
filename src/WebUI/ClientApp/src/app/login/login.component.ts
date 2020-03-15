import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';


import { AuthenticationService } from 'app/core/authentication/authentication.service';
import { NotificationService } from 'app/core/notification/notification.service';


@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private notification:NotificationService,
        private router: Router
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
          
            user   : ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login(): void {
       
        this.loginForm.disable();
        this.authenticationService.login(this.loginForm.value)
            .pipe(finalize(() => {
                this.loginForm.reset();
                this.loginForm.markAsPristine();
                // Angular Material Bug: Validation errors won't get removed on reset.
                this.loginForm.enable();
            })).subscribe((data: any) => {
            this.router.navigate(['/sample']);
            }, (data: any) => {
                this.notification.error(data.error.error);
            });
    }

 
}
