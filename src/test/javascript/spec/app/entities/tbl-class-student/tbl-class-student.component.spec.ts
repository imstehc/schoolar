/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassStudentComponent } from '../../../../../../main/webapp/app/entities/tbl-class-student/tbl-class-student.component';
import { TblClassStudentService } from '../../../../../../main/webapp/app/entities/tbl-class-student/tbl-class-student.service';
import { TblClassStudent } from '../../../../../../main/webapp/app/entities/tbl-class-student/tbl-class-student.model';

describe('Component Tests', () => {

    describe('TblClassStudent Management Component', () => {
        let comp: TblClassStudentComponent;
        let fixture: ComponentFixture<TblClassStudentComponent>;
        let service: TblClassStudentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassStudentComponent],
                providers: [
                    TblClassStudentService
                ]
            })
            .overrideTemplate(TblClassStudentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassStudentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassStudentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblClassStudent(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblClassStudents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
