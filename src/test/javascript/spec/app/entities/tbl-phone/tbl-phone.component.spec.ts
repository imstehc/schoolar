/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblPhoneComponent } from '../../../../../../main/webapp/app/entities/tbl-phone/tbl-phone.component';
import { TblPhoneService } from '../../../../../../main/webapp/app/entities/tbl-phone/tbl-phone.service';
import { TblPhone } from '../../../../../../main/webapp/app/entities/tbl-phone/tbl-phone.model';

describe('Component Tests', () => {

    describe('TblPhone Management Component', () => {
        let comp: TblPhoneComponent;
        let fixture: ComponentFixture<TblPhoneComponent>;
        let service: TblPhoneService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblPhoneComponent],
                providers: [
                    TblPhoneService
                ]
            })
            .overrideTemplate(TblPhoneComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblPhoneComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblPhoneService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblPhone(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblPhones[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
