import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblSchoolHistoryComponent } from './tbl-school-history.component';
import { TblSchoolHistoryDetailComponent } from './tbl-school-history-detail.component';
import { TblSchoolHistoryPopupComponent } from './tbl-school-history-dialog.component';
import { TblSchoolHistoryDeletePopupComponent } from './tbl-school-history-delete-dialog.component';

export const tblSchoolHistoryRoute: Routes = [
    {
        path: 'tbl-school-history',
        component: TblSchoolHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-school-history/:id',
        component: TblSchoolHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblSchoolHistoryPopupRoute: Routes = [
    {
        path: 'tbl-school-history-new',
        component: TblSchoolHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-history/:id/edit',
        component: TblSchoolHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-history/:id/delete',
        component: TblSchoolHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
