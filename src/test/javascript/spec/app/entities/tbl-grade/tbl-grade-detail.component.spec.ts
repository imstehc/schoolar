/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblGradeDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-grade/tbl-grade-detail.component';
import { TblGradeService } from '../../../../../../main/webapp/app/entities/tbl-grade/tbl-grade.service';
import { TblGrade } from '../../../../../../main/webapp/app/entities/tbl-grade/tbl-grade.model';

describe('Component Tests', () => {

    describe('TblGrade Management Detail Component', () => {
        let comp: TblGradeDetailComponent;
        let fixture: ComponentFixture<TblGradeDetailComponent>;
        let service: TblGradeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGradeDetailComponent],
                providers: [
                    TblGradeService
                ]
            })
            .overrideTemplate(TblGradeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGradeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGradeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblGrade(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblGrade).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
