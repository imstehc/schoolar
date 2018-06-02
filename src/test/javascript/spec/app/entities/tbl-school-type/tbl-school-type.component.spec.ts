/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolTypeComponent } from '../../../../../../main/webapp/app/entities/tbl-school-type/tbl-school-type.component';
import { TblSchoolTypeService } from '../../../../../../main/webapp/app/entities/tbl-school-type/tbl-school-type.service';
import { TblSchoolType } from '../../../../../../main/webapp/app/entities/tbl-school-type/tbl-school-type.model';

describe('Component Tests', () => {

    describe('TblSchoolType Management Component', () => {
        let comp: TblSchoolTypeComponent;
        let fixture: ComponentFixture<TblSchoolTypeComponent>;
        let service: TblSchoolTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolTypeComponent],
                providers: [
                    TblSchoolTypeService
                ]
            })
            .overrideTemplate(TblSchoolTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblSchoolType(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblSchoolTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
