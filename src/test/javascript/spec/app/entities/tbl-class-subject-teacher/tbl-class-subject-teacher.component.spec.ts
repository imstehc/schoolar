/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassSubjectTeacherComponent } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher.component';
import { TblClassSubjectTeacherService } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher.service';
import { TblClassSubjectTeacher } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher.model';

describe('Component Tests', () => {

    describe('TblClassSubjectTeacher Management Component', () => {
        let comp: TblClassSubjectTeacherComponent;
        let fixture: ComponentFixture<TblClassSubjectTeacherComponent>;
        let service: TblClassSubjectTeacherService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassSubjectTeacherComponent],
                providers: [
                    TblClassSubjectTeacherService
                ]
            })
            .overrideTemplate(TblClassSubjectTeacherComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassSubjectTeacherComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassSubjectTeacherService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblClassSubjectTeacher(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblClassSubjectTeachers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
