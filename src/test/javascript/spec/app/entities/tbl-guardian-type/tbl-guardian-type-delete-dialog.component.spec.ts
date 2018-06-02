/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblGuardianTypeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type-delete-dialog.component';
import { TblGuardianTypeService } from '../../../../../../main/webapp/app/entities/tbl-guardian-type/tbl-guardian-type.service';

describe('Component Tests', () => {

    describe('TblGuardianType Management Delete Component', () => {
        let comp: TblGuardianTypeDeleteDialogComponent;
        let fixture: ComponentFixture<TblGuardianTypeDeleteDialogComponent>;
        let service: TblGuardianTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGuardianTypeDeleteDialogComponent],
                providers: [
                    TblGuardianTypeService
                ]
            })
            .overrideTemplate(TblGuardianTypeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGuardianTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGuardianTypeService);
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
