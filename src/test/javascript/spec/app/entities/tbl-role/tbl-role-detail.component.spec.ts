/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblRoleDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-role/tbl-role-detail.component';
import { TblRoleService } from '../../../../../../main/webapp/app/entities/tbl-role/tbl-role.service';
import { TblRole } from '../../../../../../main/webapp/app/entities/tbl-role/tbl-role.model';

describe('Component Tests', () => {

    describe('TblRole Management Detail Component', () => {
        let comp: TblRoleDetailComponent;
        let fixture: ComponentFixture<TblRoleDetailComponent>;
        let service: TblRoleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblRoleDetailComponent],
                providers: [
                    TblRoleService
                ]
            })
            .overrideTemplate(TblRoleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblRoleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblRoleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblRole(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblRole).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
