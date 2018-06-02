/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblGuardianTypeComponent } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type.component';
import { TblGuardianTypeService } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type.service';
import { TblGuardianType } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type.model';

describe('Component Tests', () => {

    describe('TblGuardianType Management Component', () => {
        let comp: TblGuardianTypeComponent;
        let fixture: ComponentFixture<TblGuardianTypeComponent>;
        let service: TblGuardianTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGuardianTypeComponent],
                providers: [
                    TblGuardianTypeService
                ]
            })
            .overrideTemplate(TblGuardianTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGuardianTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGuardianTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblGuardianType(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblGuardianTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
