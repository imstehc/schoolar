import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblSchoolSettingComponent } from './tbl-school-setting.component';
import { TblSchoolSettingDetailComponent } from './tbl-school-setting-detail.component';
import { TblSchoolSettingPopupComponent } from './tbl-school-setting-dialog.component';
import { TblSchoolSettingDeletePopupComponent } from './tbl-school-setting-delete-dialog.component';

export const tblSchoolSettingRoute: Routes = [
    {
        path: 'tbl-school-setting',
        component: TblSchoolSettingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolSetting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-school-setting/:id',
        component: TblSchoolSettingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolSetting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblSchoolSettingPopupRoute: Routes = [
    {
        path: 'tbl-school-setting-new',
        component: TblSchoolSettingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-setting/:id/edit',
        component: TblSchoolSettingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-setting/:id/delete',
        component: TblSchoolSettingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
