import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblSubjectComponent } from './tbl-subject.component';
import { TblSubjectDetailComponent } from './tbl-subject-detail.component';
import { TblSubjectPopupComponent } from './tbl-subject-dialog.component';
import { TblSubjectDeletePopupComponent } from './tbl-subject-delete-dialog.component';

export const tblSubjectRoute: Routes = [
    {
        path: 'tbl-subject',
        component: TblSubjectComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSubject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-subject/:id',
        component: TblSubjectDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSubject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblSubjectPopupRoute: Routes = [
    {
        path: 'tbl-subject-new',
        component: TblSubjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSubject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-subject/:id/edit',
        component: TblSubjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSubject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-subject/:id/delete',
        component: TblSubjectDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSubject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
