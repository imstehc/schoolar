/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblGuardianTypeDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type-detail.component';
import { TblGuardianTypeService } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type.service';
import { TblGuardianType } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type.model';

describe('Component Tests', () => {

    describe('TblGuardianType Management Detail Component', () => {
        let comp: TblGuardianTypeDetailComponent;
        let fixture: ComponentFixture<TblGuardianTypeDetailComponent>;
        let service: TblGuardianTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGuardianTypeDetailComponent],
                providers: [
                    TblGuardianTypeService
                ]
            })
            .overrideTemplate(TblGuardianTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGuardianTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGuardianTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblGuardianType(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblGuardianType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
