/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblGeneralProcedureTypeDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type-dialog.component';
import { TblGeneralProcedureTypeService } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type.service';
import { TblGeneralProcedureType } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type.model';

describe('Component Tests', () => {

    describe('TblGeneralProcedureType Management Dialog Component', () => {
        let comp: TblGeneralProcedureTypeDialogComponent;
        let fixture: ComponentFixture<TblGeneralProcedureTypeDialogComponent>;
        let service: TblGeneralProcedureTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGeneralProcedureTypeDialogComponent],
                providers: [
                    TblGeneralProcedureTypeService
                ]
            })
            .overrideTemplate(TblGeneralProcedureTypeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGeneralProcedureTypeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGeneralProcedureTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblGeneralProcedureType(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblGeneralProcedureType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblGeneralProcedureTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblGeneralProcedureType();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblGeneralProcedureType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblGeneralProcedureTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
