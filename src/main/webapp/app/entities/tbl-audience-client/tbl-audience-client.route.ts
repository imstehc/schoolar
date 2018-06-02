import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblAudienceClientComponent } from './tbl-audience-client.component';
import { TblAudienceClientDetailComponent } from './tbl-audience-client-detail.component';
import { TblAudienceClientPopupComponent } from './tbl-audience-client-dialog.component';
import { TblAudienceClientDeletePopupComponent } from './tbl-audience-client-delete-dialog.component';

export const tblAudienceClientRoute: Routes = [
    {
        path: 'tbl-audience-client',
        component: TblAudienceClientComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAudienceClient.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-audience-client/:id',
        component: TblAudienceClientDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAudienceClient.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblAudienceClientPopupRoute: Routes = [
    {
        path: 'tbl-audience-client-new',
        component: TblAudienceClientPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAudienceClient.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-audience-client/:id/edit',
        component: TblAudienceClientPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAudienceClient.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-audience-client/:id/delete',
        component: TblAudienceClientDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAudienceClient.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
