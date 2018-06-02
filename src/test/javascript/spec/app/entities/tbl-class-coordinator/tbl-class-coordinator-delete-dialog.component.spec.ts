/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassCoordinatorDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-class-coordinator/tbl-class-coordinator-delete-dialog.component';
import { TblClassCoordinatorService } from '../../../../../../main/webapp/app/entities/tbl-class-coordinator/tbl-class-coordinator.service';

describe('Component Tests', () => {

    describe('TblClassCoordinator Management Delete Component', () => {
        let comp: TblClassCoordinatorDeleteDialogComponent;
        let fixture: ComponentFixture<TblClassCoordinatorDeleteDialogComponent>;
        let service: TblClassCoordinatorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassCoordinatorDeleteDialogComponent],
                providers: [
                    TblClassCoordinatorService
                ]
            })
            .overrideTemplate(TblClassCoordinatorDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassCoordinatorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassCoordinatorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
