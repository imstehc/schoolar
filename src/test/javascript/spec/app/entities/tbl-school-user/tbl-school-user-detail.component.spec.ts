/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolUserDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-school-user/tbl-school-user-detail.component';
import { TblSchoolUserService } from '../../../../../../main/webapp/app/entities/tbl-school-user/tbl-school-user.service';
import { TblSchoolUser } from '../../../../../../main/webapp/app/entities/tbl-school-user/tbl-school-user.model';

describe('Component Tests', () => {

    describe('TblSchoolUser Management Detail Component', () => {
        let comp: TblSchoolUserDetailComponent;
        let fixture: ComponentFixture<TblSchoolUserDetailComponent>;
        let service: TblSchoolUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolUserDetailComponent],
                providers: [
                    TblSchoolUserService
                ]
            })
            .overrideTemplate(TblSchoolUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblSchoolUser(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblSchoolUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
