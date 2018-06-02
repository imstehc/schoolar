/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolSettingDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-school-setting/tbl-school-setting-dialog.component';
import { TblSchoolSettingService } from '../../../../../../main/webapp/app/entities/tbl-school-setting/tbl-school-setting.service';
import { TblSchoolSetting } from '../../../../../../main/webapp/app/entities/tbl-school-setting/tbl-school-setting.model';

describe('Component Tests', () => {

    describe('TblSchoolSetting Management Dialog Component', () => {
        let comp: TblSchoolSettingDialogComponent;
        let fixture: ComponentFixture<TblSchoolSettingDialogComponent>;
        let service: TblSchoolSettingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolSettingDialogComponent],
                providers: [
                    TblSchoolSettingService
                ]
            })
            .overrideTemplate(TblSchoolSettingDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolSettingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolSettingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolSetting(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblSchoolSetting = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolSettingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolSetting();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblSchoolSetting = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolSettingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
