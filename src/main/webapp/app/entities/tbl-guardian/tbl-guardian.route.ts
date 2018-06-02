import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblGuardianComponent } from './tbl-guardian.component';
import { TblGuardianDetailComponent } from './tbl-guardian-detail.component';
import { TblGuardianPopupComponent } from './tbl-guardian-dialog.component';
import { TblGuardianDeletePopupComponent } from './tbl-guardian-delete-dialog.component';

export const tblGuardianRoute: Routes = [
    {
        path: 'tbl-guardian',
        component: TblGuardianComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardian.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-guardian/:id',
        component: TblGuardianDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardian.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblGuardianPopupRoute: Routes = [
    {
        path: 'tbl-guardian-new',
        component: TblGuardianPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardian.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-guardian/:id/edit',
        component: TblGuardianPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardian.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-guardian/:id/delete',
        component: TblGuardianDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardian.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
