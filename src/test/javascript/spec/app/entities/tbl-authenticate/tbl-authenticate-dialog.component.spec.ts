/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblAuthenticateDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-authenticate/tbl-authenticate-dialog.component';
import { TblAuthenticateService } from '../../../../../../main/webapp/app/entities/tbl-authenticate/tbl-authenticate.service';
import { TblAuthenticate } from '../../../../../../main/webapp/app/entities/tbl-authenticate/tbl-authenticate.model';
import { TblAudienceClientService } from '../../../../../../main/webapp/app/entities/tbl-audience-client';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user';

describe('Component Tests', () => {

    describe('TblAuthenticate Management Dialog Component', () => {
        let comp: TblAuthenticateDialogComponent;
        let fixture: ComponentFixture<TblAuthenticateDialogComponent>;
        let service: TblAuthenticateService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAuthenticateDialogComponent],
                providers: [
                    TblAudienceClientService,
                    TblUserService,
                    TblAuthenticateService
                ]
            })
            .overrideTemplate(TblAuthenticateDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAuthenticateDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAuthenticateService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblAuthenticate(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblAuthenticate = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblAuthenticateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblAuthenticate();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblAuthenticate = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblAuthenticateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
