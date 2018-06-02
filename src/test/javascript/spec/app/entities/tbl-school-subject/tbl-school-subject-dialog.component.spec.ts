/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolSubjectDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject-dialog.component';
import { TblSchoolSubjectService } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject.service';
import { TblSchoolSubject } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject.model';
import { TblLevelTypeService } from '../../../../../../main/webapp/app/entities/tbl-level-type';
import { TblSubjectService } from '../../../../../../main/webapp/app/entities/tbl-subject';
import { TblSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school';

describe('Component Tests', () => {

    describe('TblSchoolSubject Management Dialog Component', () => {
        let comp: TblSchoolSubjectDialogComponent;
        let fixture: ComponentFixture<TblSchoolSubjectDialogComponent>;
        let service: TblSchoolSubjectService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolSubjectDialogComponent],
                providers: [
                    TblLevelTypeService,
                    TblSubjectService,
                    TblSchoolService,
                    TblSchoolSubjectService
                ]
            })
            .overrideTemplate(TblSchoolSubjectDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolSubjectDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolSubjectService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolSubject(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblSchoolSubject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolSubjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolSubject();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblSchoolSubject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolSubjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
