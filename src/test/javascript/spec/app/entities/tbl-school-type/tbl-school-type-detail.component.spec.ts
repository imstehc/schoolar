/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolTypeDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-school-type/tbl-school-type-detail.component';
import { TblSchoolTypeService } from '../../../../../../main/webapp/app/entities/tbl-school-type/tbl-school-type.service';
import { TblSchoolType } from '../../../../../../main/webapp/app/entities/tbl-school-type/tbl-school-type.model';

describe('Component Tests', () => {

    describe('TblSchoolType Management Detail Component', () => {
        let comp: TblSchoolTypeDetailComponent;
        let fixture: ComponentFixture<TblSchoolTypeDetailComponent>;
        let service: TblSchoolTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolTypeDetailComponent],
                providers: [
                    TblSchoolTypeService
                ]
            })
            .overrideTemplate(TblSchoolTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblSchoolType(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblSchoolType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
