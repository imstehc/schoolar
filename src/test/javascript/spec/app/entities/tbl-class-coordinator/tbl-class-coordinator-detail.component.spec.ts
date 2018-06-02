/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassCoordinatorDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-class-coordinator/tbl-class-coordinator-detail.component';
import { TblClassCoordinatorService } from '../../../../../../main/webapp/app/entities/tbl-class-coordinator/tbl-class-coordinator.service';
import { TblClassCoordinator } from '../../../../../../main/webapp/app/entities/tbl-class-coordinator/tbl-class-coordinator.model';

describe('Component Tests', () => {

    describe('TblClassCoordinator Management Detail Component', () => {
        let comp: TblClassCoordinatorDetailComponent;
        let fixture: ComponentFixture<TblClassCoordinatorDetailComponent>;
        let service: TblClassCoordinatorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassCoordinatorDetailComponent],
                providers: [
                    TblClassCoordinatorService
                ]
            })
            .overrideTemplate(TblClassCoordinatorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassCoordinatorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassCoordinatorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblClassCoordinator(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblClassCoordinator).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
