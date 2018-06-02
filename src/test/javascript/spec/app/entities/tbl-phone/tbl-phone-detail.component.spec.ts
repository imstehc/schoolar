/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblPhoneDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-phone/tbl-phone-detail.component';
import { TblPhoneService } from '../../../../../../main/webapp/app/entities/tbl-phone/tbl-phone.service';
import { TblPhone } from '../../../../../../main/webapp/app/entities/tbl-phone/tbl-phone.model';

describe('Component Tests', () => {

    describe('TblPhone Management Detail Component', () => {
        let comp: TblPhoneDetailComponent;
        let fixture: ComponentFixture<TblPhoneDetailComponent>;
        let service: TblPhoneService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblPhoneDetailComponent],
                providers: [
                    TblPhoneService
                ]
            })
            .overrideTemplate(TblPhoneDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblPhoneDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblPhoneService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblPhone(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblPhone).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
