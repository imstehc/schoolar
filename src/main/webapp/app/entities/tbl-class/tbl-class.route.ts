import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblClassComponent } from './tbl-class.component';
import { TblClassDetailComponent } from './tbl-class-detail.component';
import { TblClassPopupComponent } from './tbl-class-dialog.component';
import { TblClassDeletePopupComponent } from './tbl-class-delete-dialog.component';

export const tblClassRoute: Routes = [
    {
        path: 'tbl-class',
        component: TblClassComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-class/:id',
        component: TblClassDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblClassPopupRoute: Routes = [
    {
        path: 'tbl-class-new',
        component: TblClassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-class/:id/edit',
        component: TblClassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-class/:id/delete',
        component: TblClassDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
