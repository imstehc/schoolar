/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblAudienceClientDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client-delete-dialog.component';
import { TblAudienceClientService } from '../../../../../../main/webapp/app/entities/tbl-audience-client/tbl-audience-client.service';

describe('Component Tests', () => {

    describe('TblAudienceClient Management Delete Component', () => {
        let comp: TblAudienceClientDeleteDialogComponent;
        let fixture: ComponentFixture<TblAudienceClientDeleteDialogComponent>;
        let service: TblAudienceClientService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblAudienceClientDeleteDialogComponent],
                providers: [
                    TblAudienceClientService
                ]
            })
            .overrideTemplate(TblAudienceClientDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblAudienceClientDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblAudienceClientService);
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
