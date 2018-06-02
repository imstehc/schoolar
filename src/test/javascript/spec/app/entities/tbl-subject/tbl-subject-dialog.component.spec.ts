/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSubjectDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-subject/tbl-subject-dialog.component';
import { TblSubjectService } from '../../../../../../main/webapp/app/entities/tbl-subject/tbl-subject.service';
import { TblSubject } from '../../../../../../main/webapp/app/entities/tbl-subject/tbl-subject.model';

describe('Component Tests', () => {

    describe('TblSubject Management Dialog Component', () => {
        let comp: TblSubjectDialogComponent;
        let fixture: ComponentFixture<TblSubjectDialogComponent>;
        let service: TblSubjectService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSubjectDialogComponent],
                providers: [
                    TblSubjectService
                ]
            })
            .overrideTemplate(TblSubjectDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSubjectDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSubjectService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSubject(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblSubject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSubjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSubject();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblSubject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSubjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
