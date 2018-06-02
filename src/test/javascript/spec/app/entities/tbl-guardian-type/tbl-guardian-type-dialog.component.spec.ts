/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblGuardianTypeDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type-dialog.component';
import { TblGuardianTypeService } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type.service';
import { TblGuardianType } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type.model';

describe('Component Tests', () => {

    describe('TblGuardianType Management Dialog Component', () => {
        let comp: TblGuardianTypeDialogComponent;
        let fixture: ComponentFixture<TblGuardianTypeDialogComponent>;
        let service: TblGuardianTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGuardianTypeDialogComponent],
                providers: [
                    TblGuardianTypeService
                ]
            })
            .overrideTemplate(TblGuardianTypeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGuardianTypeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGuardianTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblGuardianType(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblGuardianType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblGuardianTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblGuardianType();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblGuardianType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblGuardianTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
