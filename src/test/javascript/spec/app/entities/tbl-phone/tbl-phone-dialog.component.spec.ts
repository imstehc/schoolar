/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblPhoneDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-phone/tbl-phone-dialog.component';
import { TblPhoneService } from '../../../../../../main/webapp/app/entities/tbl-phone/tbl-phone.service';
import { TblPhone } from '../../../../../../main/webapp/app/entities/tbl-phone/tbl-phone.model';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user';
import { TblSchoolNetworkService } from '../../../../../../main/webapp/app/entities/tbl-school-network';
import { TblSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school';

describe('Component Tests', () => {

    describe('TblPhone Management Dialog Component', () => {
        let comp: TblPhoneDialogComponent;
        let fixture: ComponentFixture<TblPhoneDialogComponent>;
        let service: TblPhoneService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblPhoneDialogComponent],
                providers: [
                    TblUserService,
                    TblSchoolNetworkService,
                    TblSchoolService,
                    TblPhoneService
                ]
            })
            .overrideTemplate(TblPhoneDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblPhoneDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblPhoneService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblPhone(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblPhone = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblPhoneListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblPhone();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblPhone = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblPhoneListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
