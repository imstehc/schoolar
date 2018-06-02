/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblLevelTypeDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-level-type/tbl-level-type-dialog.component';
import { TblLevelTypeService } from '../../../../../../main/webapp/app/entities/tbl-level-type/tbl-level-type.service';
import { TblLevelType } from '../../../../../../main/webapp/app/entities/tbl-level-type/tbl-level-type.model';

describe('Component Tests', () => {

    describe('TblLevelType Management Dialog Component', () => {
        let comp: TblLevelTypeDialogComponent;
        let fixture: ComponentFixture<TblLevelTypeDialogComponent>;
        let service: TblLevelTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblLevelTypeDialogComponent],
                providers: [
                    TblLevelTypeService
                ]
            })
            .overrideTemplate(TblLevelTypeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblLevelTypeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblLevelTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblLevelType(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblLevelType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblLevelTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblLevelType();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblLevelType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblLevelTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
