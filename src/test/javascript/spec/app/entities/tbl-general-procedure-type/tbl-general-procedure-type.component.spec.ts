/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblGeneralProcedureTypeComponent } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type.component';
import { TblGeneralProcedureTypeService } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type.service';
import { TblGeneralProcedureType } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type.model';

describe('Component Tests', () => {

    describe('TblGeneralProcedureType Management Component', () => {
        let comp: TblGeneralProcedureTypeComponent;
        let fixture: ComponentFixture<TblGeneralProcedureTypeComponent>;
        let service: TblGeneralProcedureTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGeneralProcedureTypeComponent],
                providers: [
                    TblGeneralProcedureTypeService
                ]
            })
            .overrideTemplate(TblGeneralProcedureTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGeneralProcedureTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGeneralProcedureTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblGeneralProcedureType(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblGeneralProcedureTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
