/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolComponent } from '../../../../../../main/webapp/app/entities/tbl-school/tbl-school.component';
import { TblSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school/tbl-school.service';
import { TblSchool } from '../../../../../../main/webapp/app/entities/tbl-school/tbl-school.model';

describe('Component Tests', () => {

    describe('TblSchool Management Component', () => {
        let comp: TblSchoolComponent;
        let fixture: ComponentFixture<TblSchoolComponent>;
        let service: TblSchoolService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolComponent],
                providers: [
                    TblSchoolService
                ]
            })
            .overrideTemplate(TblSchoolComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblSchool(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblSchools[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
