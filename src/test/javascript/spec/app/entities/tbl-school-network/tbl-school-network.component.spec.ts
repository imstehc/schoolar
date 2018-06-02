/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolNetworkComponent } from '../../../../../../main/webapp/app/entities/tbl-school-network/tbl-school-network.component';
import { TblSchoolNetworkService } from '../../../../../../main/webapp/app/entities/tbl-school-network/tbl-school-network.service';
import { TblSchoolNetwork } from '../../../../../../main/webapp/app/entities/tbl-school-network/tbl-school-network.model';

describe('Component Tests', () => {

    describe('TblSchoolNetwork Management Component', () => {
        let comp: TblSchoolNetworkComponent;
        let fixture: ComponentFixture<TblSchoolNetworkComponent>;
        let service: TblSchoolNetworkService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolNetworkComponent],
                providers: [
                    TblSchoolNetworkService
                ]
            })
            .overrideTemplate(TblSchoolNetworkComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolNetworkComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolNetworkService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblSchoolNetwork(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblSchoolNetworks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
