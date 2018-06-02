/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblLevelTypeDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-level-type/tbl-level-type-detail.component';
import { TblLevelTypeService } from '../../../../../../main/webapp/app/entities/tbl-level-type/tbl-level-type.service';
import { TblLevelType } from '../../../../../../main/webapp/app/entities/tbl-level-type/tbl-level-type.model';

describe('Component Tests', () => {

    describe('TblLevelType Management Detail Component', () => {
        let comp: TblLevelTypeDetailComponent;
        let fixture: ComponentFixture<TblLevelTypeDetailComponent>;
        let service: TblLevelTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblLevelTypeDetailComponent],
                providers: [
                    TblLevelTypeService
                ]
            })
            .overrideTemplate(TblLevelTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblLevelTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblLevelTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblLevelType(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblLevelType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
