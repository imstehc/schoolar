/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblShiftTypeComponent } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type.component';
import { TblShiftTypeService } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type.service';
import { TblShiftType } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type.model';

describe('Component Tests', () => {

    describe('TblShiftType Management Component', () => {
        let comp: TblShiftTypeComponent;
        let fixture: ComponentFixture<TblShiftTypeComponent>;
        let service: TblShiftTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblShiftTypeComponent],
                providers: [
                    TblShiftTypeService
                ]
            })
            .overrideTemplate(TblShiftTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblShiftTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblShiftTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblShiftType(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblShiftTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
