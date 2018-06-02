/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassStudentDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-class-student/tbl-class-student-dialog.component';
import { TblClassStudentService } from '../../../../../../main/webapp/app/entities/tbl-class-student/tbl-class-student.service';
import { TblClassStudent } from '../../../../../../main/webapp/app/entities/tbl-class-student/tbl-class-student.model';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user';
import { TblClassService } from '../../../../../../main/webapp/app/entities/tbl-class';

describe('Component Tests', () => {

    describe('TblClassStudent Management Dialog Component', () => {
        let comp: TblClassStudentDialogComponent;
        let fixture: ComponentFixture<TblClassStudentDialogComponent>;
        let service: TblClassStudentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassStudentDialogComponent],
                providers: [
                    TblUserService,
                    TblClassService,
                    TblClassStudentService
                ]
            })
            .overrideTemplate(TblClassStudentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassStudentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassStudentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblClassStudent(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblClassStudent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblClassStudentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblClassStudent();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblClassStudent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblClassStudentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
