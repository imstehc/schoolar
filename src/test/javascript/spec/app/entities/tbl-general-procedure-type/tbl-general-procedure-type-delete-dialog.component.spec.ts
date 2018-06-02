/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblGeneralProcedureTypeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type-delete-dialog.component';
import { TblGeneralProcedureTypeService } from '../../../../../../main/webapp/app/entities/tbl-general-procedure-type/tbl-general-procedure-type.service';

describe('Component Tests', () => {

    describe('TblGeneralProcedureType Management Delete Component', () => {
        let comp: TblGeneralProcedureTypeDeleteDialogComponent;
        let fixture: ComponentFixture<TblGeneralProcedureTypeDeleteDialogComponent>;
        let service: TblGeneralProcedureTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGeneralProcedureTypeDeleteDialogComponent],
                providers: [
                    TblGeneralProcedureTypeService
                ]
            })
            .overrideTemplate(TblGeneralProcedureTypeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGeneralProcedureTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGeneralProcedureTypeService);
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
