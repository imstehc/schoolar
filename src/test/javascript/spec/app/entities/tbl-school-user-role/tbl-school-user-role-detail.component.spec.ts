/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolUserRoleDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role-detail.component';
import { TblSchoolUserRoleService } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role.service';
import { TblSchoolUserRole } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role.model';

describe('Component Tests', () => {

    describe('TblSchoolUserRole Management Detail Component', () => {
        let comp: TblSchoolUserRoleDetailComponent;
        let fixture: ComponentFixture<TblSchoolUserRoleDetailComponent>;
        let service: TblSchoolUserRoleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolUserRoleDetailComponent],
                providers: [
                    TblSchoolUserRoleService
                ]
            })
            .overrideTemplate(TblSchoolUserRoleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolUserRoleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolUserRoleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblSchoolUserRole(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblSchoolUserRole).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
