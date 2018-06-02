import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblClassCoordinatorComponent } from './tbl-class-coordinator.component';
import { TblClassCoordinatorDetailComponent } from './tbl-class-coordinator-detail.component';
import { TblClassCoordinatorPopupComponent } from './tbl-class-coordinator-dialog.component';
import { TblClassCoordinatorDeletePopupComponent } from './tbl-class-coordinator-delete-dialog.component';

export const tblClassCoordinatorRoute: Routes = [
    {
        path: 'tbl-class-coordinator',
        component: TblClassCoordinatorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassCoordinator.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-class-coordinator/:id',
        component: TblClassCoordinatorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassCoordinator.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblClassCoordinatorPopupRoute: Routes = [
    {
        path: 'tbl-class-coordinator-new',
        component: TblClassCoordinatorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassCoordinator.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-class-coordinator/:id/edit',
        component: TblClassCoordinatorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassCoordinator.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-class-coordinator/:id/delete',
        component: TblClassCoordinatorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblClassCoordinator.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
