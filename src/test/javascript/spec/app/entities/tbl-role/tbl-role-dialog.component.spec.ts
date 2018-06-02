/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblRoleDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-role/tbl-role-dialog.component';
import { TblRoleService } from '../../../../../../main/webapp/app/entities/tbl-role/tbl-role.service';
import { TblRole } from '../../../../../../main/webapp/app/entities/tbl-role/tbl-role.model';

describe('Component Tests', () => {

    describe('TblRole Management Dialog Component', () => {
        let comp: TblRoleDialogComponent;
        let fixture: ComponentFixture<TblRoleDialogComponent>;
        let service: TblRoleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblRoleDialogComponent],
                providers: [
                    TblRoleService
                ]
            })
            .overrideTemplate(TblRoleDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblRoleDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblRoleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblRole(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblRole = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblRoleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblRole();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblRole = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblRoleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
