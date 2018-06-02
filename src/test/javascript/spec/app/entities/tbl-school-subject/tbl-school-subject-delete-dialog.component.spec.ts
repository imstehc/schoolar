/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolSubjectDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject-delete-dialog.component';
import { TblSchoolSubjectService } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject.service';

describe('Component Tests', () => {

    describe('TblSchoolSubject Management Delete Component', () => {
        let comp: TblSchoolSubjectDeleteDialogComponent;
        let fixture: ComponentFixture<TblSchoolSubjectDeleteDialogComponent>;
        let service: TblSchoolSubjectService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolSubjectDeleteDialogComponent],
                providers: [
                    TblSchoolSubjectService
                ]
            })
            .overrideTemplate(TblSchoolSubjectDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolSubjectDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolSubjectService);
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
