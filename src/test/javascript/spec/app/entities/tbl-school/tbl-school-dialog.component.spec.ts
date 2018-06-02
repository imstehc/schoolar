/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-school/tbl-school-dialog.component';
import { TblSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school/tbl-school.service';
import { TblSchool } from '../../../../../../main/webapp/app/entities/tbl-school/tbl-school.model';
import { TblAddressService } from '../../../../../../main/webapp/app/entities/tbl-address';
import { TblPhoneService } from '../../../../../../main/webapp/app/entities/tbl-phone';

describe('Component Tests', () => {

    describe('TblSchool Management Dialog Component', () => {
        let comp: TblSchoolDialogComponent;
        let fixture: ComponentFixture<TblSchoolDialogComponent>;
        let service: TblSchoolService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolDialogComponent],
                providers: [
                    TblAddressService,
                    TblPhoneService,
                    TblSchoolService
                ]
            })
            .overrideTemplate(TblSchoolDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchool(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblSchool = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchool();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblSchool = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
