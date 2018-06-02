import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblGeneralProcedureTypeComponent } from './tbl-general-procedure-type.component';
import { TblGeneralProcedureTypeDetailComponent } from './tbl-general-procedure-type-detail.component';
import { TblGeneralProcedureTypePopupComponent } from './tbl-general-procedure-type-dialog.component';
import { TblGeneralProcedureTypeDeletePopupComponent } from './tbl-general-procedure-type-delete-dialog.component';

export const tblGeneralProcedureTypeRoute: Routes = [
    {
        path: 'tbl-general-procedure-type',
        component: TblGeneralProcedureTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGeneralProcedureType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-general-procedure-type/:id',
        component: TblGeneralProcedureTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGeneralProcedureType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblGeneralProcedureTypePopupRoute: Routes = [
    {
        path: 'tbl-general-procedure-type-new',
        component: TblGeneralProcedureTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGeneralProcedureType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-general-procedure-type/:id/edit',
        component: TblGeneralProcedureTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGeneralProcedureType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-general-procedure-type/:id/delete',
        component: TblGeneralProcedureTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGeneralProcedureType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
