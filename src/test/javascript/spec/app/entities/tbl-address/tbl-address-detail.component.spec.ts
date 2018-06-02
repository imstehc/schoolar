/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblAddressDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-address/tbl-address-detail.component';
import { TblAddressService } from '../../../../../../main/webapp/app/entities/tbl-address/tbl-address.service';
import { TblAddress } from '../../../../../../main/webapp/app/entities/tbl-address/tbl-address.model';

describe('Component Tests', () => {

    describe('TblAddress Management Detail Component', () => {
        let comp: TblAddressDetailComponent;
        let fixture: ComponentFixture<TblAddressDetailComponent>;
        let service: TblAddressService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAddressDetailComponent],
                providers: [
                    TblAddressService
                ]
            })
            .overrideTemplate(TblAddressDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAddressDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAddressService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblAddress(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblAddress).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
