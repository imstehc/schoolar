/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblAuthenticateDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-authenticate/tbl-authenticate-detail.component';
import { TblAuthenticateService } from '../../../../../../main/webapp/app/entities/tbl-authenticate/tbl-authenticate.service';
import { TblAuthenticate } from '../../../../../../main/webapp/app/entities/tbl-authenticate/tbl-authenticate.model';

describe('Component Tests', () => {

    describe('TblAuthenticate Management Detail Component', () => {
        let comp: TblAuthenticateDetailComponent;
        let fixture: ComponentFixture<TblAuthenticateDetailComponent>;
        let service: TblAuthenticateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAuthenticateDetailComponent],
                providers: [
                    TblAuthenticateService
                ]
            })
            .overrideTemplate(TblAuthenticateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAuthenticateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAuthenticateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblAuthenticate(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblAuthenticate).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
