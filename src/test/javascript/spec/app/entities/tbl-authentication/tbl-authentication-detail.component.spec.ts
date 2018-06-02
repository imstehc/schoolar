/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblAuthenticationDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-authentication/tbl-authentication-detail.component';
import { TblAuthenticationService } from '../../../../../../main/webapp/app/entities/tbl-authentication/tbl-authentication.service';
import { TblAuthentication } from '../../../../../../main/webapp/app/entities/tbl-authentication/tbl-authentication.model';

describe('Component Tests', () => {

    describe('TblAuthentication Management Detail Component', () => {
        let comp: TblAuthenticationDetailComponent;
        let fixture: ComponentFixture<TblAuthenticationDetailComponent>;
        let service: TblAuthenticationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAuthenticationDetailComponent],
                providers: [
                    TblAuthenticationService
                ]
            })
            .overrideTemplate(TblAuthenticationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAuthenticationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAuthenticationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblAuthentication(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblAuthentication).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
