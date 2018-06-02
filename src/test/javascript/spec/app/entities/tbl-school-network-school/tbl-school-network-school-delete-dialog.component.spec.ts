/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolNetworkSchoolDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school-delete-dialog.component';
import { TblSchoolNetworkSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school.service';

describe('Component Tests', () => {

    describe('TblSchoolNetworkSchool Management Delete Component', () => {
        let comp: TblSchoolNetworkSchoolDeleteDialogComponent;
        let fixture: ComponentFixture<TblSchoolNetworkSchoolDeleteDialogComponent>;
        let service: TblSchoolNetworkSchoolService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolNetworkSchoolDeleteDialogComponent],
                providers: [
                    TblSchoolNetworkSchoolService
                ]
            })
            .overrideTemplate(TblSchoolNetworkSchoolDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolNetworkSchoolDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolNetworkSchoolService);
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
