/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblGuardianHistoryDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-guardian-history/tbl-guardian-history-dialog.component';
import { TblGuardianHistoryService } from '../../../../../../main/webapp/app/entities/tbl-guardian-history/tbl-guardian-history.service';
import { TblGuardianHistory } from '../../../../../../main/webapp/app/entities/tbl-guardian-history/tbl-guardian-history.model';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user';
import { TblGuardianTypeService } from '../../../../../../main/webapp/app/entities/tbl-guardian-type';
import { TblAudienceClientService } from '../../../../../../main/webapp/app/entities/tbl-audience-client';
import { TblGeneralProcedureTypeService } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type';

describe('Component Tests', () => {

    describe('TblGuardianHistory Management Dialog Component', () => {
        let comp: TblGuardianHistoryDialogComponent;
        let fixture: ComponentFixture<TblGuardianHistoryDialogComponent>;
        let service: TblGuardianHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGuardianHistoryDialogComponent],
                providers: [
                    TblUserService,
                    TblGuardianTypeService,
                    TblAudienceClientService,
                    TblGeneralProcedureTypeService,
                    TblGuardianHistoryService
                ]
            })
            .overrideTemplate(TblGuardianHistoryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGuardianHistoryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGuardianHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblGuardianHistory(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblGuardianHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblGuardianHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblGuardianHistory();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblGuardianHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblGuardianHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
