/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblAuthenticationComponent } from '../../../../../../main/webapp/app/entities/tbl-authentication/tbl-authentication.component';
import { TblAuthenticationService } from '../../../../../../main/webapp/app/entities/tbl-authentication/tbl-authentication.service';
import { TblAuthentication } from '../../../../../../main/webapp/app/entities/tbl-authentication/tbl-authentication.model';

describe('Component Tests', () => {

    describe('TblAuthentication Management Component', () => {
        let comp: TblAuthenticationComponent;
        let fixture: ComponentFixture<TblAuthenticationComponent>;
        let service: TblAuthenticationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAuthenticationComponent],
                providers: [
                    TblAuthenticationService
                ]
            })
            .overrideTemplate(TblAuthenticationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAuthenticationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAuthenticationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblAuthentication(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblAuthentications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
