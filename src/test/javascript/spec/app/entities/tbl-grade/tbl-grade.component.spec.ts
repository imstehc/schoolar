/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblGradeComponent } from '../../../../../../main/webapp/app/entities/tbl-grade/tbl-grade.component';
import { TblGradeService } from '../../../../../../main/webapp/app/entities/tbl-grade/tbl-grade.service';
import { TblGrade } from '../../../../../../main/webapp/app/entities/tbl-grade/tbl-grade.model';

describe('Component Tests', () => {

    describe('TblGrade Management Component', () => {
        let comp: TblGradeComponent;
        let fixture: ComponentFixture<TblGradeComponent>;
        let service: TblGradeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGradeComponent],
                providers: [
                    TblGradeService
                ]
            })
            .overrideTemplate(TblGradeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGradeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGradeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblGrade(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblGrades[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
