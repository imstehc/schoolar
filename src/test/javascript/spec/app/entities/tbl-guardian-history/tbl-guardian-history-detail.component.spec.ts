/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblGuardianHistoryDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-guardian-history/tbl-guardian-history-detail.component';
import { TblGuardianHistoryService } from '../../../../../../main/webapp/app/entities/tbl-guardian-history/tbl-guardian-history.service';
import { TblGuardianHistory } from '../../../../../../main/webapp/app/entities/tbl-guardian-history/tbl-guardian-history.model';

describe('Component Tests', () => {

    describe('TblGuardianHistory Management Detail Component', () => {
        let comp: TblGuardianHistoryDetailComponent;
        let fixture: ComponentFixture<TblGuardianHistoryDetailComponent>;
        let service: TblGuardianHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGuardianHistoryDetailComponent],
                providers: [
                    TblGuardianHistoryService
                ]
            })
            .overrideTemplate(TblGuardianHistoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGuardianHistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGuardianHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblGuardianHistory(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblGuardianHistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
