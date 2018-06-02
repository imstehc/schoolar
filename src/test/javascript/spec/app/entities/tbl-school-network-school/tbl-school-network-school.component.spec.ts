/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolNetworkSchoolComponent } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school.component';
import { TblSchoolNetworkSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school.service';
import { TblSchoolNetworkSchool } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school.model';

describe('Component Tests', () => {

    describe('TblSchoolNetworkSchool Management Component', () => {
        let comp: TblSchoolNetworkSchoolComponent;
        let fixture: ComponentFixture<TblSchoolNetworkSchoolComponent>;
        let service: TblSchoolNetworkSchoolService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolNetworkSchoolComponent],
                providers: [
                    TblSchoolNetworkSchoolService
                ]
            })
            .overrideTemplate(TblSchoolNetworkSchoolComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolNetworkSchoolComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolNetworkSchoolService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblSchoolNetworkSchool(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblSchoolNetworkSchools[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
