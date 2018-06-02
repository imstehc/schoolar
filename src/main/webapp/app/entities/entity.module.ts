import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SchoolarTblUserModule } from './tbl-user/tbl-user.module';
import { SchoolarTblAuthenticationModule } from './tbl-authentication/tbl-authentication.module';
import { SchoolarTblGuardianTypeModule } from './tbl-guardian-type/tbl-guardian-type.module';
import { SchoolarTblAddressModule } from './tbl-address/tbl-address.module';
import { SchoolarTblRoleModule } from './tbl-role/tbl-role.module';
import { SchoolarTblSchoolModule } from './tbl-school/tbl-school.module';
import { SchoolarTblSchoolTypeModule } from './tbl-school-type/tbl-school-type.module';
import { SchoolarTblPhoneModule } from './tbl-phone/tbl-phone.module';
import { SchoolarTblSchoolNetworkModule } from './tbl-school-network/tbl-school-network.module';
import { SchoolarTblGeneralProcedureTypeModule } from './tbl-general-procedure-type/tbl-general-procedure-type.module';
import { SchoolarTblGuardianModule } from './tbl-guardian/tbl-guardian.module';
import { SchoolarTblSchoolUserRoleModule } from './tbl-school-user-role/tbl-school-user-role.module';
import { SchoolarTblSchoolUserModule } from './tbl-school-user/tbl-school-user.module';
import { SchoolarTblSchoolNetworkSchoolModule } from './tbl-school-network-school/tbl-school-network-school.module';
import { SchoolarTblAuthenticateModule } from './tbl-authenticate/tbl-authenticate.module';
import { SchoolarTblAudienceClientModule } from './tbl-audience-client/tbl-audience-client.module';
import { SchoolarTblSchoolHistoryModule } from './tbl-school-history/tbl-school-history.module';
import { SchoolarTblGuardianHistoryModule } from './tbl-guardian-history/tbl-guardian-history.module';
import { SchoolarTblShiftTypeModule } from './tbl-shift-type/tbl-shift-type.module';
import { SchoolarTblLevelTypeModule } from './tbl-level-type/tbl-level-type.module';
import { SchoolarTblGradeModule } from './tbl-grade/tbl-grade.module';
import { SchoolarTblClassCoordinatorModule } from './tbl-class-coordinator/tbl-class-coordinator.module';
import { SchoolarTblClassStudentModule } from './tbl-class-student/tbl-class-student.module';
import { SchoolarTblClassModule } from './tbl-class/tbl-class.module';
import { SchoolarTblClassSubjectTeacherModule } from './tbl-class-subject-teacher/tbl-class-subject-teacher.module';
import { SchoolarTblSubjectModule } from './tbl-subject/tbl-subject.module';
import { SchoolarTblSchoolSubjectModule } from './tbl-school-subject/tbl-school-subject.module';
import { SchoolarTblSchoolSettingModule } from './tbl-school-setting/tbl-school-setting.module';
import { SchoolarTblDefaultSchoolSettingModule } from './tbl-default-school-setting/tbl-default-school-setting.module';
import { SchoolarTblLoginModule } from './tbl-login/tbl-login.module';
import { SchoolarTblNfcModule } from './tbl-nfc/tbl-nfc.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SchoolarTblUserModule,
        SchoolarTblAuthenticationModule,
        SchoolarTblGuardianTypeModule,
        SchoolarTblAddressModule,
        SchoolarTblRoleModule,
        SchoolarTblSchoolModule,
        SchoolarTblSchoolTypeModule,
        SchoolarTblPhoneModule,
        SchoolarTblSchoolNetworkModule,
        SchoolarTblGeneralProcedureTypeModule,
        SchoolarTblGuardianModule,
        SchoolarTblSchoolUserRoleModule,
        SchoolarTblSchoolUserModule,
        SchoolarTblSchoolNetworkSchoolModule,
        SchoolarTblAuthenticateModule,
        SchoolarTblAudienceClientModule,
        SchoolarTblSchoolHistoryModule,
        SchoolarTblGuardianHistoryModule,
        SchoolarTblShiftTypeModule,
        SchoolarTblLevelTypeModule,
        SchoolarTblGradeModule,
        SchoolarTblClassCoordinatorModule,
        SchoolarTblClassStudentModule,
        SchoolarTblClassModule,
        SchoolarTblClassSubjectTeacherModule,
        SchoolarTblSubjectModule,
        SchoolarTblSchoolSubjectModule,
        SchoolarTblSchoolSettingModule,
        SchoolarTblDefaultSchoolSettingModule,
        SchoolarTblLoginModule,
        SchoolarTblNfcModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarEntityModule {}
