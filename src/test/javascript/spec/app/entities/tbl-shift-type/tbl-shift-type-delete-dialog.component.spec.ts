/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblShiftTypeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type-delete-dialog.component';
import { TblShiftTypeService } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type.service';

describe('Component Tests', () => {

    describe('TblShiftType Management Delete Component', () => {
        let comp: TblShiftTypeDeleteDialogComponent;
        let fixture: ComponentFixture<TblShiftTypeDeleteDialogComponent>;
        let service: TblShiftTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblShiftTypeDeleteDialogComponent],
                providers: [
                    TblShiftTypeService
                ]
            })
            .overrideTemplate(TblShiftTypeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblShiftTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblShiftTypeService);
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
