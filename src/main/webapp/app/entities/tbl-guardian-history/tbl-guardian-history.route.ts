import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblGuardianHistoryComponent } from './tbl-guardian-history.component';
import { TblGuardianHistoryDetailComponent } from './tbl-guardian-history-detail.component';
import { TblGuardianHistoryPopupComponent } from './tbl-guardian-history-dialog.component';
import { TblGuardianHistoryDeletePopupComponent } from './tbl-guardian-history-delete-dialog.component';

export const tblGuardianHistoryRoute: Routes = [
    {
        path: 'tbl-guardian-history',
        component: TblGuardianHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardianHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-guardian-history/:id',
        component: TblGuardianHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardianHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblGuardianHistoryPopupRoute: Routes = [
    {
        path: 'tbl-guardian-history-new',
        component: TblGuardianHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardianHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-guardian-history/:id/edit',
        component: TblGuardianHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardianHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-guardian-history/:id/delete',
        component: TblGuardianHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardianHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
