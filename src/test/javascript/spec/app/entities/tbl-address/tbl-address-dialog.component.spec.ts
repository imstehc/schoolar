/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblAddressDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-address/tbl-address-dialog.component';
import { TblAddressService } from '../../../../../../main/webapp/app/entities/tbl-address/tbl-address.service';
import { TblAddress } from '../../../../../../main/webapp/app/entities/tbl-address/tbl-address.model';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user';
import { TblSchoolNetworkService } from '../../../../../../main/webapp/app/entities/tbl-school-network';
import { TblSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school';

describe('Component Tests', () => {

    describe('TblAddress Management Dialog Component', () => {
        let comp: TblAddressDialogComponent;
        let fixture: ComponentFixture<TblAddressDialogComponent>;
        let service: TblAddressService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAddressDialogComponent],
                providers: [
                    TblUserService,
                    TblSchoolNetworkService,
                    TblSchoolService,
                    TblAddressService
                ]
            })
            .overrideTemplate(TblAddressDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAddressDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAddressService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblAddress(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblAddress = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblAddressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblAddress();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblAddress = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblAddressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
