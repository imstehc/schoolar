/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-class/tbl-class-dialog.component';
import { TblClassService } from '../../../../../../main/webapp/app/entities/tbl-class/tbl-class.service';
import { TblClass } from '../../../../../../main/webapp/app/entities/tbl-class/tbl-class.model';
import { TblSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school';
import { TblShiftTypeService } from '../../../../../../main/webapp/app/entities/tbl-shift-type';

describe('Component Tests', () => {

    describe('TblClass Management Dialog Component', () => {
        let comp: TblClassDialogComponent;
        let fixture: ComponentFixture<TblClassDialogComponent>;
        let service: TblClassService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassDialogComponent],
                providers: [
                    TblSchoolService,
                    TblShiftTypeService,
                    TblClassService
                ]
            })
            .overrideTemplate(TblClassDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblClass(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblClass = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblClassListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblClass();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblClass = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblClassListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
