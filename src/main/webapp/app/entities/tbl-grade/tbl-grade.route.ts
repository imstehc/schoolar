import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblGradeComponent } from './tbl-grade.component';
import { TblGradeDetailComponent } from './tbl-grade-detail.component';
import { TblGradePopupComponent } from './tbl-grade-dialog.component';
import { TblGradeDeletePopupComponent } from './tbl-grade-delete-dialog.component';

export const tblGradeRoute: Routes = [
    {
        path: 'tbl-grade',
        component: TblGradeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGrade.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-grade/:id',
        component: TblGradeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGrade.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblGradePopupRoute: Routes = [
    {
        path: 'tbl-grade-new',
        component: TblGradePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGrade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-grade/:id/edit',
        component: TblGradePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGrade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-grade/:id/delete',
        component: TblGradeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGrade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
