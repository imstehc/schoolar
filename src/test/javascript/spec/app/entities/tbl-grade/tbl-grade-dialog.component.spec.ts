/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblGradeDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-grade/tbl-grade-dialog.component';
import { TblGradeService } from '../../../../../../main/webapp/app/entities/tbl-grade/tbl-grade.service';
import { TblGrade } from '../../../../../../main/webapp/app/entities/tbl-grade/tbl-grade.model';
import { TblLevelTypeService } from '../../../../../../main/webapp/app/entities/tbl-level-type';

describe('Component Tests', () => {

    describe('TblGrade Management Dialog Component', () => {
        let comp: TblGradeDialogComponent;
        let fixture: ComponentFixture<TblGradeDialogComponent>;
        let service: TblGradeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblGradeDialogComponent],
                providers: [
                    TblLevelTypeService,
                    TblGradeService
                ]
            })
            .overrideTemplate(TblGradeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblGradeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblGradeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblGrade(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblGrade = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblGradeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblGrade();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblGrade = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblGradeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
