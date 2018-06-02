import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblClassSubjectTeacherComponent } from './tbl-class-subject-teacher.component';
import { TblClassSubjectTeacherDetailComponent } from './tbl-class-subject-teacher-detail.component';
import { TblClassSubjectTeacherPopupComponent } from './tbl-class-subject-teacher-dialog.component';
import { TblClassSubjectTeacherDeletePopupComponent } from './tbl-class-subject-teacher-delete-dialog.component';

export const tblClassSubjectTeacherRoute: Routes = [
    {
        path: 'tbl-class-subject-teacher',
        component: TblClassSubjectTeacherComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassSubjectTeacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-class-subject-teacher/:id',
        component: TblClassSubjectTeacherDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassSubjectTeacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblClassSubjectTeacherPopupRoute: Routes = [
    {
        path: 'tbl-class-subject-teacher-new',
        component: TblClassSubjectTeacherPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassSubjectTeacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-class-subject-teacher/:id/edit',
        component: TblClassSubjectTeacherPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassSubjectTeacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-class-subject-teacher/:id/delete',
        component: TblClassSubjectTeacherDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassSubjectTeacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
