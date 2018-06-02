/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolNetworkSchoolDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school-detail.component';
import { TblSchoolNetworkSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school.service';
import { TblSchoolNetworkSchool } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school.model';

describe('Component Tests', () => {

    describe('TblSchoolNetworkSchool Management Detail Component', () => {
        let comp: TblSchoolNetworkSchoolDetailComponent;
        let fixture: ComponentFixture<TblSchoolNetworkSchoolDetailComponent>;
        let service: TblSchoolNetworkSchoolService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolNetworkSchoolDetailComponent],
                providers: [
                    TblSchoolNetworkSchoolService
                ]
            })
            .overrideTemplate(TblSchoolNetworkSchoolDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolNetworkSchoolDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolNetworkSchoolService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblSchoolNetworkSchool(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblSchoolNetworkSchool).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
