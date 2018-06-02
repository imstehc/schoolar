import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblSchoolNetworkSchoolComponent } from './tbl-school-network-school.component';
import { TblSchoolNetworkSchoolDetailComponent } from './tbl-school-network-school-detail.component';
import { TblSchoolNetworkSchoolPopupComponent } from './tbl-school-network-school-dialog.component';
import { TblSchoolNetworkSchoolDeletePopupComponent } from './tbl-school-network-school-delete-dialog.component';

export const tblSchoolNetworkSchoolRoute: Routes = [
    {
        path: 'tbl-school-network-school',
        component: TblSchoolNetworkSchoolComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolNetworkSchool.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-school-network-school/:id',
        component: TblSchoolNetworkSchoolDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolNetworkSchool.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblSchoolNetworkSchoolPopupRoute: Routes = [
    {
        path: 'tbl-school-network-school-new',
        component: TblSchoolNetworkSchoolPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolNetworkSchool.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-network-school/:id/edit',
        component: TblSchoolNetworkSchoolPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolNetworkSchool.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-network-school/:id/delete',
        component: TblSchoolNetworkSchoolDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolNetworkSchool.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
