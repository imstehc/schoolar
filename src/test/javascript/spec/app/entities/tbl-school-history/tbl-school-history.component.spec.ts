/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolHistoryComponent } from '../../../../../../main/webapp/app/entities/tbl-school-history/tbl-school-history.component';
import { TblSchoolHistoryService } from '../../../../../../main/webapp/app/entities/tbl-school-history/tbl-school-history.service';
import { TblSchoolHistory } from '../../../../../../main/webapp/app/entities/tbl-school-history/tbl-school-history.model';

describe('Component Tests', () => {

    describe('TblSchoolHistory Management Component', () => {
        let comp: TblSchoolHistoryComponent;
        let fixture: ComponentFixture<TblSchoolHistoryComponent>;
        let service: TblSchoolHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolHistoryComponent],
                providers: [
                    TblSchoolHistoryService
                ]
            })
            .overrideTemplate(TblSchoolHistoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblSchoolHistory(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblSchoolHistories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
