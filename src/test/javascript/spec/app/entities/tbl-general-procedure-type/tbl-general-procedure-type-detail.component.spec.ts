/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblGeneralProcedureTypeDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type-detail.component';
import { TblGeneralProcedureTypeService } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type.service';
import { TblGeneralProcedureType } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type.model';

describe('Component Tests', () => {

    describe('TblGeneralProcedureType Management Detail Component', () => {
        let comp: TblGeneralProcedureTypeDetailComponent;
        let fixture: ComponentFixture<TblGeneralProcedureTypeDetailComponent>;
        let service: TblGeneralProcedureTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGeneralProcedureTypeDetailComponent],
                providers: [
                    TblGeneralProcedureTypeService
                ]
            })
            .overrideTemplate(TblGeneralProcedureTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGeneralProcedureTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGeneralProcedureTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblGeneralProcedureType(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblGeneralProcedureType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
