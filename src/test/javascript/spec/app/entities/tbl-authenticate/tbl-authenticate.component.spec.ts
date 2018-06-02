/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblAuthenticateComponent } from '../../../../../../main/webapp/app/entities/tbl-authenticate/tbl-authenticate.component';
import { TblAuthenticateService } from '../../../../../../main/webapp/app/entities/tbl-authenticate/tbl-authenticate.service';
import { TblAuthenticate } from '../../../../../../main/webapp/app/entities/tbl-authenticate/tbl-authenticate.model';

describe('Component Tests', () => {

    describe('TblAuthenticate Management Component', () => {
        let comp: TblAuthenticateComponent;
        let fixture: ComponentFixture<TblAuthenticateComponent>;
        let service: TblAuthenticateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAuthenticateComponent],
                providers: [
                    TblAuthenticateService
                ]
            })
            .overrideTemplate(TblAuthenticateComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAuthenticateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAuthenticateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblAuthenticate(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblAuthenticates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
