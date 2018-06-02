/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblShiftTypeDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type-dialog.component';
import { TblShiftTypeService } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type.service';
import { TblShiftType } from '../../../../../../main/webapp/app/entities/tbl-shift-type/tbl-shift-type.model';

describe('Component Tests', () => {

    describe('TblShiftType Management Dialog Component', () => {
        let comp: TblShiftTypeDialogComponent;
        let fixture: ComponentFixture<TblShiftTypeDialogComponent>;
        let service: TblShiftTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblShiftTypeDialogComponent],
                providers: [
                    TblShiftTypeService
                ]
            })
            .overrideTemplate(TblShiftTypeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblShiftTypeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblShiftTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblShiftType(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblShiftType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblShiftTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblShiftType();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblShiftType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblShiftTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
