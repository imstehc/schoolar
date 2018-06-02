/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolHistoryDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-school-history/tbl-school-history-dialog.component';
import { TblSchoolHistoryService } from '../../../../../../main/webapp/app/entities/tbl-school-history/tbl-school-history.service';
import { TblSchoolHistory } from '../../../../../../main/webapp/app/entities/tbl-school-history/tbl-school-history.model';
import { TblSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user';
import { TblAudienceClientService } from '../../../../../../main/webapp/app/entities/tbl-audience-client';
import { TblGeneralProcedureTypeService } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type';

describe('Component Tests', () => {

    describe('TblSchoolHistory Management Dialog Component', () => {
        let comp: TblSchoolHistoryDialogComponent;
        let fixture: ComponentFixture<TblSchoolHistoryDialogComponent>;
        let service: TblSchoolHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolHistoryDialogComponent],
                providers: [
                    TblSchoolService,
                    TblUserService,
                    TblAudienceClientService,
                    TblGeneralProcedureTypeService,
                    TblSchoolHistoryService
                ]
            })
            .overrideTemplate(TblSchoolHistoryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolHistoryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolHistory(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblSchoolHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolHistory();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblSchoolHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
