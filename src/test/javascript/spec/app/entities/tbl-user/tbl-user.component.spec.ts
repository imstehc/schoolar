/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblUserComponent } from '../../../../../../main/webapp/app/entities/tbl-user/tbl-user.component';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user/tbl-user.service';
import { TblUserDTO } from '../../../../../../main/webapp/app/entities/tbl-user/tbl-user.model';

describe('Component Tests', () => {

    describe('TblUserDTO Management Component', () => {
        let comp: TblUserComponent;
        let fixture: ComponentFixture<TblUserComponent>;
        let service: TblUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblUserComponent],
                providers: [
                    TblUserService
                ]
            })
            .overrideTemplate(TblUserComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblUserDTO(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.usersPage[0].content).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
