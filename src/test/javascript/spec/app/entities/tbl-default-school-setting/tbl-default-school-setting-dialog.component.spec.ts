/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblDefaultSchoolSettingDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting-dialog.component';
import { TblDefaultSchoolSettingService } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting.service';
import { TblDefaultSchoolSetting } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting.model';

describe('Component Tests', () => {

    describe('TblDefaultSchoolSetting Management Dialog Component', () => {
        let comp: TblDefaultSchoolSettingDialogComponent;
        let fixture: ComponentFixture<TblDefaultSchoolSettingDialogComponent>;
        let service: TblDefaultSchoolSettingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblDefaultSchoolSettingDialogComponent],
                providers: [
                    TblDefaultSchoolSettingService
                ]
            })
            .overrideTemplate(TblDefaultSchoolSettingDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblDefaultSchoolSettingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblDefaultSchoolSettingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblDefaultSchoolSetting(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblDefaultSchoolSetting = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblDefaultSchoolSettingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblDefaultSchoolSetting();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblDefaultSchoolSetting = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblDefaultSchoolSettingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
