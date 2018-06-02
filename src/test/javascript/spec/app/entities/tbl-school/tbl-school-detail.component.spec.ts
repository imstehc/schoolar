/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-school/tbl-school-detail.component';
import { TblSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school/tbl-school.service';
import { TblSchool } from '../../../../../../main/webapp/app/entities/tbl-school/tbl-school.model';

describe('Component Tests', () => {

    describe('TblSchool Management Detail Component', () => {
        let comp: TblSchoolDetailComponent;
        let fixture: ComponentFixture<TblSchoolDetailComponent>;
        let service: TblSchoolService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolDetailComponent],
                providers: [
                    TblSchoolService
                ]
            })
            .overrideTemplate(TblSchoolDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblSchool(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblSchool).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
