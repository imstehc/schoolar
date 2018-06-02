/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassSubjectTeacherDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher-delete-dialog.component';
import { TblClassSubjectTeacherService } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher.service';

describe('Component Tests', () => {

    describe('TblClassSubjectTeacher Management Delete Component', () => {
        let comp: TblClassSubjectTeacherDeleteDialogComponent;
        let fixture: ComponentFixture<TblClassSubjectTeacherDeleteDialogComponent>;
        let service: TblClassSubjectTeacherService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassSubjectTeacherDeleteDialogComponent],
                providers: [
                    TblClassSubjectTeacherService
                ]
            })
            .overrideTemplate(TblClassSubjectTeacherDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassSubjectTeacherDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassSubjectTeacherService);
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
