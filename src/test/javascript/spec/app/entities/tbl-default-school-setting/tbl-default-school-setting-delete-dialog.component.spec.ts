/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblDefaultSchoolSettingDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting-delete-dialog.component';
import { TblDefaultSchoolSettingService } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting.service';

describe('Component Tests', () => {

    describe('TblDefaultSchoolSetting Management Delete Component', () => {
        let comp: TblDefaultSchoolSettingDeleteDialogComponent;
        let fixture: ComponentFixture<TblDefaultSchoolSettingDeleteDialogComponent>;
        let service: TblDefaultSchoolSettingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblDefaultSchoolSettingDeleteDialogComponent],
                providers: [
                    TblDefaultSchoolSettingService
                ]
            })
            .overrideTemplate(TblDefaultSchoolSettingDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblDefaultSchoolSettingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblDefaultSchoolSettingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
