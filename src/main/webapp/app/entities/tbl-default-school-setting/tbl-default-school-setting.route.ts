import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblDefaultSchoolSettingComponent } from './tbl-default-school-setting.component';
import { TblDefaultSchoolSettingDetailComponent } from './tbl-default-school-setting-detail.component';
import { TblDefaultSchoolSettingPopupComponent } from './tbl-default-school-setting-dialog.component';
import { TblDefaultSchoolSettingDeletePopupComponent } from './tbl-default-school-setting-delete-dialog.component';

export const tblDefaultSchoolSettingRoute: Routes = [
    {
        path: 'tbl-default-school-setting',
        component: TblDefaultSchoolSettingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblDefaultSchoolSetting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-default-school-setting/:id',
        component: TblDefaultSchoolSettingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblDefaultSchoolSetting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblDefaultSchoolSettingPopupRoute: Routes = [
    {
        path: 'tbl-default-school-setting-new',
        component: TblDefaultSchoolSettingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblDefaultSchoolSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-default-school-setting/:id/edit',
        component: TblDefaultSchoolSettingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblDefaultSchoolSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-default-school-setting/:id/delete',
        component: TblDefaultSchoolSettingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblDefaultSchoolSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
