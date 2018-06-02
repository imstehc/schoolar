/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblNfcDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-nfc/tbl-nfc-detail.component';
import { TblNfcService } from '../../../../../../main/webapp/app/entities/tbl-nfc/tbl-nfc.service';
import { TblNfc } from '../../../../../../main/webapp/app/entities/tbl-nfc/tbl-nfc.model';

describe('Component Tests', () => {

    describe('TblNfc Management Detail Component', () => {
        let comp: TblNfcDetailComponent;
        let fixture: ComponentFixture<TblNfcDetailComponent>;
        let service: TblNfcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblNfcDetailComponent],
                providers: [
                    TblNfcService
                ]
            })
            .overrideTemplate(TblNfcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblNfcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblNfcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblNfc(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblNfc).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
