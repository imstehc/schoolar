/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolNetworkSchoolDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school-dialog.component';
import { TblSchoolNetworkSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school.service';
import { TblSchoolNetworkSchool } from '../../../../../../main/webapp/app/entities/tbl-school-network-school/tbl-school-network-school.model';
import { TblSchoolService } from '../../../../../../main/webapp/app/entities/tbl-school';
import { TblSchoolNetworkService } from '../../../../../../main/webapp/app/entities/tbl-school-network';

describe('Component Tests', () => {

    describe('TblSchoolNetworkSchool Management Dialog Component', () => {
        let comp: TblSchoolNetworkSchoolDialogComponent;
        let fixture: ComponentFixture<TblSchoolNetworkSchoolDialogComponent>;
        let service: TblSchoolNetworkSchoolService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolNetworkSchoolDialogComponent],
                providers: [
                    TblSchoolService,
                    TblSchoolNetworkService,
                    TblSchoolNetworkSchoolService
                ]
            })
            .overrideTemplate(TblSchoolNetworkSchoolDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolNetworkSchoolDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolNetworkSchoolService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolNetworkSchool(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tblSchoolNetworkSchool = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolNetworkSchoolListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TblSchoolNetworkSchool();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tblSchoolNetworkSchool = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tblSchoolNetworkSchoolListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
