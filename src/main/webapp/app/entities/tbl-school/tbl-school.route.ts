import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblSchoolComponent } from './tbl-school.component';
import { TblSchoolDetailComponent } from './tbl-school-detail.component';
import { TblSchoolPopupComponent } from './tbl-school-dialog.component';
import { TblSchoolDeletePopupComponent } from './tbl-school-delete-dialog.component';

export const tblSchoolRoute: Routes = [
    {
        path: 'tbl-school',
        component: TblSchoolComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchool.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-school/:id',
        component: TblSchoolDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchool.home.title'
        },
        canActivate: [UserRouteAccessService]

    }
];

export const tblSchoolPopupRoute: Routes = [
    {
        path: 'tbl-school-new',
        component: TblSchoolPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchool.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school/:id/edit',
        component: TblSchoolPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchool.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school/:id/delete',
        component: TblSchoolDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchool.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
