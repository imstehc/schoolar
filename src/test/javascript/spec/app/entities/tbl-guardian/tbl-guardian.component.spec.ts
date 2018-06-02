/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblGuardianComponent } from '../../../../../../main/webapp/app/entities/tbl-guardian/tbl-guardian.component';
import { TblGuardianService } from '../../../../../../main/webapp/app/entities/tbl-guardian/tbl-guardian.service';
import { TblGuardian } from '../../../../../../main/webapp/app/entities/tbl-guardian/tbl-guardian.model';

describe('Component Tests', () => {

    describe('TblGuardian Management Component', () => {
        let comp: TblGuardianComponent;
        let fixture: ComponentFixture<TblGuardianComponent>;
        let service: TblGuardianService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGuardianComponent],
                providers: [
                    TblGuardianService
                ]
            })
            .overrideTemplate(TblGuardianComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGuardianComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGuardianService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblGuardian(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblGuardians[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
