/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolUserRoleDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role-dialog.component';
import { TblSchoolUserRoleService } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role.service';
import { TblSchoolUserRole } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role.model';
import { TblRoleService } from '../../../../../../main/webapp/app/entities/tbl-role';
import { TblSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user';

describe('Component Tests', () => {

    describe('TblSchoolUserRole Management Dialog Component', () => {
        let comp: TblSchoolUserRoleDialogComponent;
        let fixture: ComponentFixture<TblSchoolUserRoleDialogComponent>;
        let service: TblSchoolUserRoleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolUserRoleDialogComponent],
                providers: [
                    TblRoleService,
                    TblSchoolService,
                    TblUserService,
                    TblSchoolUserRoleService
                ]
            })
            .overrideTemplate(TblSchoolUserRoleDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolUserRoleDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolUserRoleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolUserRole(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblSchoolUserRole = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolUserRoleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolUserRole();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblSchoolUserRole = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolUserRoleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
