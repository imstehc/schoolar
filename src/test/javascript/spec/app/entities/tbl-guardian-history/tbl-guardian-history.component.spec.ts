/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblGuardianHistoryComponent } from '../../../../../../main/webapp/app/entities/tbl-guardian-history/tbl-guardian-history.component';
import { TblGuardianHistoryService } from '../../../../../../main/webapp/app/entities/tbl-guardian-history/tbl-guardian-history.service';
import { TblGuardianHistory } from '../../../../../../main/webapp/app/entities/tbl-guardian-history/tbl-guardian-history.model';

describe('Component Tests', () => {

    describe('TblGuardianHistory Management Component', () => {
        let comp: TblGuardianHistoryComponent;
        let fixture: ComponentFixture<TblGuardianHistoryComponent>;
        let service: TblGuardianHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGuardianHistoryComponent],
                providers: [
                    TblGuardianHistoryService
                ]
            })
            .overrideTemplate(TblGuardianHistoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGuardianHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGuardianHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblGuardianHistory(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblGuardianHistories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
