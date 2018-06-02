/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassStudentDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-class-student/tbl-class-student-detail.component';
import { TblClassStudentService } from '../../../../../../main/webapp/app/entities/tbl-class-student/tbl-class-student.service';
import { TblClassStudent } from '../../../../../../main/webapp/app/entities/tbl-class-student/tbl-class-student.model';

describe('Component Tests', () => {

    describe('TblClassStudent Management Detail Component', () => {
        let comp: TblClassStudentDetailComponent;
        let fixture: ComponentFixture<TblClassStudentDetailComponent>;
        let service: TblClassStudentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassStudentDetailComponent],
                providers: [
                    TblClassStudentService
                ]
            })
            .overrideTemplate(TblClassStudentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassStudentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassStudentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblClassStudent(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblClassStudent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
