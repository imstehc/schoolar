/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolHistoryDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-school-history/tbl-school-history-detail.component';
import { TblSchoolHistoryService } from '../../../../../../main/webapp/app/entities/tbl-school-history/tbl-school-history.service';
import { TblSchoolHistory } from '../../../../../../main/webapp/app/entities/tbl-school-history/tbl-school-history.model';

describe('Component Tests', () => {

    describe('TblSchoolHistory Management Detail Component', () => {
        let comp: TblSchoolHistoryDetailComponent;
        let fixture: ComponentFixture<TblSchoolHistoryDetailComponent>;
        let service: TblSchoolHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolHistoryDetailComponent],
                providers: [
                    TblSchoolHistoryService
                ]
            })
            .overrideTemplate(TblSchoolHistoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolHistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblSchoolHistory(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblSchoolHistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
