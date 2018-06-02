/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolNetworkDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-school-network/tbl-school-network-dialog.component';
import { TblSchoolNetworkService } from '../../../../../../main/webapp/app/entities/tbl-school-network/tbl-school-network.service';
import { TblSchoolNetwork } from '../../../../../../main/webapp/app/entities/tbl-school-network/tbl-school-network.model';
import { TblPhoneService } from '../../../../../../main/webapp/app/entities/tbl-phone';
import { TblAddressService } from '../../../../../../main/webapp/app/entities/tbl-address';

describe('Component Tests', () => {

    describe('TblSchoolNetwork Management Dialog Component', () => {
        let comp: TblSchoolNetworkDialogComponent;
        let fixture: ComponentFixture<TblSchoolNetworkDialogComponent>;
        let service: TblSchoolNetworkService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolNetworkDialogComponent],
                providers: [
                    TblPhoneService,
                    TblAddressService,
                    TblSchoolNetworkService
                ]
            })
            .overrideTemplate(TblSchoolNetworkDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolNetworkDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolNetworkService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolNetwork(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblSchoolNetwork = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolNetworkListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolNetwork();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblSchoolNetwork = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolNetworkListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
