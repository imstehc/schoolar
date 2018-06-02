/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblAudienceClientDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client-detail.component';
import { TblAudienceClientService } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client.service';
import { TblAudienceClient } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client.model';

describe('Component Tests', () => {

    describe('TblAudienceClient Management Detail Component', () => {
        let comp: TblAudienceClientDetailComponent;
        let fixture: ComponentFixture<TblAudienceClientDetailComponent>;
        let service: TblAudienceClientService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAudienceClientDetailComponent],
                providers: [
                    TblAudienceClientService
                ]
            })
            .overrideTemplate(TblAudienceClientDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAudienceClientDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAudienceClientService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblAudienceClient(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblAudienceClient).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
