import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblClassStudentComponent } from './tbl-class-student.component';
import { TblClassStudentDetailComponent } from './tbl-class-student-detail.component';
import { TblClassStudentPopupComponent } from './tbl-class-student-dialog.component';
import { TblClassStudentDeletePopupComponent } from './tbl-class-student-delete-dialog.component';

export const tblClassStudentRoute: Routes = [
    {
        path: 'tbl-class-student',
        component: TblClassStudentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassStudent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-class-student/:id',
        component: TblClassStudentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassStudent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblClassStudentPopupRoute: Routes = [
    {
        path: 'tbl-class-student-new',
        component: TblClassStudentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassStudent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-class-student/:id/edit',
        component: TblClassStudentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassStudent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-class-student/:id/delete',
        component: TblClassStudentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassStudent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
