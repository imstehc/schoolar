/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblAddressComponent } from '../../../../../../main/webapp/app/entities/tbl-address/tbl-address.component';
import { TblAddressService } from '../../../../../../main/webapp/app/entities/tbl-address/tbl-address.service';
import { TblAddress } from '../../../../../../main/webapp/app/entities/tbl-address/tbl-address.model';

describe('Component Tests', () => {

    describe('TblAddress Management Component', () => {
        let comp: TblAddressComponent;
        let fixture: ComponentFixture<TblAddressComponent>;
        let service: TblAddressService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAddressComponent],
                providers: [
                    TblAddressService
                ]
            })
            .overrideTemplate(TblAddressComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAddressComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAddressService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblAddress(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblAddresses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
