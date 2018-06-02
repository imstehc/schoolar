import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblSchoolSubjectComponent } from './tbl-school-subject.component';
import { TblSchoolSubjectDetailComponent } from './tbl-school-subject-detail.component';
import { TblSchoolSubjectPopupComponent } from './tbl-school-subject-dialog.component';
import { TblSchoolSubjectDeletePopupComponent } from './tbl-school-subject-delete-dialog.component';

export const tblSchoolSubjectRoute: Routes = [
    {
        path: 'tbl-school-subject',
        component: TblSchoolSubjectComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolSubject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-school-subject/:id',
        component: TblSchoolSubjectDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolSubject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblSchoolSubjectPopupRoute: Routes = [
    {
        path: 'tbl-school-subject-new',
        component: TblSchoolSubjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolSubject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-subject/:id/edit',
        component: TblSchoolSubjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolSubject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-subject/:id/delete',
        component: TblSchoolSubjectDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolSubject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
