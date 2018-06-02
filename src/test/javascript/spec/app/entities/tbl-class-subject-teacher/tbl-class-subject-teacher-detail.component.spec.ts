/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassSubjectTeacherDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher-detail.component';
import { TblClassSubjectTeacherService } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher.service';
import { TblClassSubjectTeacher } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher.model';

describe('Component Tests', () => {

    describe('TblClassSubjectTeacher Management Detail Component', () => {
        let comp: TblClassSubjectTeacherDetailComponent;
        let fixture: ComponentFixture<TblClassSubjectTeacherDetailComponent>;
        let service: TblClassSubjectTeacherService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassSubjectTeacherDetailComponent],
                providers: [
                    TblClassSubjectTeacherService
                ]
            })
            .overrideTemplate(TblClassSubjectTeacherDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassSubjectTeacherDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassSubjectTeacherService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblClassSubjectTeacher(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblClassSubjectTeacher).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
