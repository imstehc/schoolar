/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblUserDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-user/tbl-user-detail.component';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user/tbl-user.service';
import { TblUserDTO } from '../../../../../../main/webapp/app/entities/tbl-user/tbl-user.model';

describe('Component Tests', () => {

    describe('TblUserDTO Management Detail Component', () => {
        let comp: TblUserDetailComponent;
        let fixture: ComponentFixture<TblUserDetailComponent>;
        let service: TblUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblUserDetailComponent],
                providers: [
                    TblUserService
                ]
            })
            .overrideTemplate(TblUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblUserDTO(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
