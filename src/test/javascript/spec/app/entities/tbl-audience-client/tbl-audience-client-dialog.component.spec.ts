/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblAudienceClientDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client-dialog.component';
import { TblAudienceClientService } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client.service';
import { TblAudienceClient } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client.model';

describe('Component Tests', () => {

    describe('TblAudienceClient Management Dialog Component', () => {
        let comp: TblAudienceClientDialogComponent;
        let fixture: ComponentFixture<TblAudienceClientDialogComponent>;
        let service: TblAudienceClientService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAudienceClientDialogComponent],
                providers: [
                    TblAudienceClientService
                ]
            })
            .overrideTemplate(TblAudienceClientDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAudienceClientDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAudienceClientService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblAudienceClient(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblAudienceClient = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblAudienceClientListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblAudienceClient();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblAudienceClient = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblAudienceClientListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
