/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolNetworkDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-school-network/tbl-school-network-detail.component';
import { TblSchoolNetworkService } from '../../../../../../main/webapp/app/entities/tbl-school-network/tbl-school-network.service';
import { TblSchoolNetwork } from '../../../../../../main/webapp/app/entities/tbl-school-network/tbl-school-network.model';

describe('Component Tests', () => {

    describe('TblSchoolNetwork Management Detail Component', () => {
        let comp: TblSchoolNetworkDetailComponent;
        let fixture: ComponentFixture<TblSchoolNetworkDetailComponent>;
        let service: TblSchoolNetworkService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolNetworkDetailComponent],
                providers: [
                    TblSchoolNetworkService
                ]
            })
            .overrideTemplate(TblSchoolNetworkDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolNetworkDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolNetworkService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblSchoolNetwork(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblSchoolNetwork).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
