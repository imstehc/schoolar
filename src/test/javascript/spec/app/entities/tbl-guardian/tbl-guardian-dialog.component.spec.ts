/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblGuardianDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-guardian/tbl-guardian-dialog.component';
import { TblGuardianService } from '../../../../../../main/webapp/app/entities/tbl-guardian/tbl-guardian.service';
import { TblGuardian } from '../../../../../../main/webapp/app/entities/tbl-guardian/tbl-guardian.model';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user';
import { TblGuardianTypeService } from '../../../../../../main/webapp/app/entities/tbl-guardian-type';

describe('Component Tests', () => {

    describe('TblGuardian Management Dialog Component', () => {
        let comp: TblGuardianDialogComponent;
        let fixture: ComponentFixture<TblGuardianDialogComponent>;
        let service: TblGuardianService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGuardianDialogComponent],
                providers: [
                    TblUserService,
                    TblGuardianTypeService,
                    TblGuardianService
                ]
            })
            .overrideTemplate(TblGuardianDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGuardianDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGuardianService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblGuardian(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblGuardian = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblGuardianListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblGuardian();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblGuardian = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblGuardianListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
