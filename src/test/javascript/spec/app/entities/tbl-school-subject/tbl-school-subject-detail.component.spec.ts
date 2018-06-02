/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolSubjectDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject-detail.component';
import { TblSchoolSubjectService } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject.service';
import { TblSchoolSubject } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject.model';

describe('Component Tests', () => {

    describe('TblSchoolSubject Management Detail Component', () => {
        let comp: TblSchoolSubjectDetailComponent;
        let fixture: ComponentFixture<TblSchoolSubjectDetailComponent>;
        let service: TblSchoolSubjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolSubjectDetailComponent],
                providers: [
                    TblSchoolSubjectService
                ]
            })
            .overrideTemplate(TblSchoolSubjectDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolSubjectDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolSubjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblSchoolSubject(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblSchoolSubject).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
