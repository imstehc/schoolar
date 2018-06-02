/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblShiftTypeDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type-detail.component';
import { TblShiftTypeService } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type.service';
import { TblShiftType } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type.model';

describe('Component Tests', () => {

    describe('TblShiftType Management Detail Component', () => {
        let comp: TblShiftTypeDetailComponent;
        let fixture: ComponentFixture<TblShiftTypeDetailComponent>;
        let service: TblShiftTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblShiftTypeDetailComponent],
                providers: [
                    TblShiftTypeService
                ]
            })
            .overrideTemplate(TblShiftTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblShiftTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblShiftTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblShiftType(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblShiftType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
