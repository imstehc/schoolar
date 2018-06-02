/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblNfcComponent } from '../../../../../../main/webapp/app/entities/tbl-nfc/tbl-nfc.component';
import { TblNfcService } from '../../../../../../main/webapp/app/entities/tbl-nfc/tbl-nfc.service';
import { TblNfc } from '../../../../../../main/webapp/app/entities/tbl-nfc/tbl-nfc.model';

describe('Component Tests', () => {

    describe('TblNfc Management Component', () => {
        let comp: TblNfcComponent;
        let fixture: ComponentFixture<TblNfcComponent>;
        let service: TblNfcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblNfcComponent],
                providers: [
                    TblNfcService
                ]
            })
            .overrideTemplate(TblNfcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblNfcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblNfcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblNfc(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblNfcs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
