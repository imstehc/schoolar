/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblGuardianDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-guardian/tbl-guardian-detail.component';
import { TblGuardianService } from '../../../../../../main/webapp/app/entities/tbl-guardian/tbl-guardian.service';
import { TblGuardian } from '../../../../../../main/webapp/app/entities/tbl-guardian/tbl-guardian.model';

describe('Component Tests', () => {

    describe('TblGuardian Management Detail Component', () => {
        let comp: TblGuardianDetailComponent;
        let fixture: ComponentFixture<TblGuardianDetailComponent>;
        let service: TblGuardianService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGuardianDetailComponent],
                providers: [
                    TblGuardianService
                ]
            })
            .overrideTemplate(TblGuardianDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGuardianDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGuardianService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblGuardian(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblGuardian).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
