/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblLoginDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-login/tbl-login-dialog.component';
import { TblLoginService } from '../../../../../../main/webapp/app/entities/tbl-login/tbl-login.service';
import { TblLogin } from '../../../../../../main/webapp/app/entities/tbl-login/tbl-login.model';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user';

describe('Component Tests', () => {

    describe('TblLogin Management Dialog Component', () => {
        let comp: TblLoginDialogComponent;
        let fixture: ComponentFixture<TblLoginDialogComponent>;
        let service: TblLoginService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblLoginDialogComponent],
                providers: [
                    TblUserService,
                    TblLoginService
                ]
            })
            .overrideTemplate(TblLoginDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblLoginDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblLoginService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblLogin(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblLogin = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblLoginListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblLogin();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblLogin = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblLoginListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
