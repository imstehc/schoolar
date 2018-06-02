/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolUserRoleComponent } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role.component';
import { TblSchoolUserRoleService } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role.service';
import { TblSchoolUserRole } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role.model';

describe('Component Tests', () => {

    describe('TblSchoolUserRole Management Component', () => {
        let comp: TblSchoolUserRoleComponent;
        let fixture: ComponentFixture<TblSchoolUserRoleComponent>;
        let service: TblSchoolUserRoleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolUserRoleComponent],
                providers: [
                    TblSchoolUserRoleService
                ]
            })
            .overrideTemplate(TblSchoolUserRoleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolUserRoleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolUserRoleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblSchoolUserRole(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblSchoolUserRoles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
