/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassCoordinatorComponent } from '../../../../../../main/webapp/app/entities/tbl-class-coordinator/tbl-class-coordinator.component';
import { TblClassCoordinatorService } from '../../../../../../main/webapp/app/entities/tbl-class-coordinator/tbl-class-coordinator.service';
import { TblClassCoordinator } from '../../../../../../main/webapp/app/entities/tbl-class-coordinator/tbl-class-coordinator.model';

describe('Component Tests', () => {

    describe('TblClassCoordinator Management Component', () => {
        let comp: TblClassCoordinatorComponent;
        let fixture: ComponentFixture<TblClassCoordinatorComponent>;
        let service: TblClassCoordinatorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassCoordinatorComponent],
                providers: [
                    TblClassCoordinatorService
                ]
            })
            .overrideTemplate(TblClassCoordinatorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassCoordinatorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassCoordinatorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblClassCoordinator(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblClassCoordinators[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
