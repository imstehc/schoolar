/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblRoleComponent } from '../../../../../../main/webapp/app/entities/tbl-role/tbl-role.component';
import { TblRoleService } from '../../../../../../main/webapp/app/entities/tbl-role/tbl-role.service';
import { TblRole } from '../../../../../../main/webapp/app/entities/tbl-role/tbl-role.model';

describe('Component Tests', () => {

    describe('TblRole Management Component', () => {
        let comp: TblRoleComponent;
        let fixture: ComponentFixture<TblRoleComponent>;
        let service: TblRoleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblRoleComponent],
                providers: [
                    TblRoleService
                ]
            })
            .overrideTemplate(TblRoleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblRoleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblRoleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblRole(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblRoles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
