/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassSubjectTeacherDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher-dialog.component';
import { TblClassSubjectTeacherService } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher.service';
import { TblClassSubjectTeacher } from '../../../../../../main/webapp/app/entities/tbl-class-subject-teacher/tbl-class-subject-teacher.model';
import { TblSubjectService } from '../../../../../../main/webapp/app/entities/tbl-subject';
import { TblUserService } from '../../../../../../main/webapp/app/entities/tbl-user';
import { TblClassService } from '../../../../../../main/webapp/app/entities/tbl-class';

describe('Component Tests', () => {

    describe('TblClassSubjectTeacher Management Dialog Component', () => {
        let comp: TblClassSubjectTeacherDialogComponent;
        let fixture: ComponentFixture<TblClassSubjectTeacherDialogComponent>;
        let service: TblClassSubjectTeacherService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassSubjectTeacherDialogComponent],
                providers: [
                    TblSubjectService,
                    TblUserService,
                    TblClassService,
                    TblClassSubjectTeacherService
                ]
            })
            .overrideTemplate(TblClassSubjectTeacherDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassSubjectTeacherDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassSubjectTeacherService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblClassSubjectTeacher(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblClassSubjectTeacher = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblClassSubjectTeacherListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblClassSubjectTeacher();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblClassSubjectTeacher = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblClassSubjectTeacherListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
