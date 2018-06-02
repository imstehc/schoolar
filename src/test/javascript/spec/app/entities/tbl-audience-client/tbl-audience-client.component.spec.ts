/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblAudienceClientComponent } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client.component';
import { TblAudienceClientService } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client.service';
import { TblAudienceClient } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client.model';

describe('Component Tests', () => {

    describe('TblAudienceClient Management Component', () => {
        let comp: TblAudienceClientComponent;
        let fixture: ComponentFixture<TblAudienceClientComponent>;
        let service: TblAudienceClientService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAudienceClientComponent],
                providers: [
                    TblAudienceClientService
                ]
            })
            .overrideTemplate(TblAudienceClientComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAudienceClientComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAudienceClientService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblAudienceClient(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblAudienceClients[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
