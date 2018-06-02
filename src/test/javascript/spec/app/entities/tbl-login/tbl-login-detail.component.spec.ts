/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblLoginDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-login/tbl-login-detail.component';
import { TblLoginService } from '../../../../../../main/webapp/app/entities/tbl-login/tbl-login.service';
import { TblLogin } from '../../../../../../main/webapp/app/entities/tbl-login/tbl-login.model';

describe('Component Tests', () => {

    describe('TblLogin Management Detail Component', () => {
        let comp: TblLoginDetailComponent;
        let fixture: ComponentFixture<TblLoginDetailComponent>;
        let service: TblLoginService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblLoginDetailComponent],
                providers: [
                    TblLoginService
                ]
            })
            .overrideTemplate(TblLoginDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblLoginDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblLoginService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblLogin(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblLogin).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
