/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblLoginComponent } from '../../../../../../main/webapp/app/entities/tbl-login/tbl-login.component';
import { TblLoginService } from '../../../../../../main/webapp/app/entities/tbl-login/tbl-login.service';
import { TblLogin } from '../../../../../../main/webapp/app/entities/tbl-login/tbl-login.model';

describe('Component Tests', () => {

    describe('TblLogin Management Component', () => {
        let comp: TblLoginComponent;
        let fixture: ComponentFixture<TblLoginComponent>;
        let service: TblLoginService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblLoginComponent],
                providers: [
                    TblLoginService
                ]
            })
            .overrideTemplate(TblLoginComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblLoginComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblLoginService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblLogin(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblLogins[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
