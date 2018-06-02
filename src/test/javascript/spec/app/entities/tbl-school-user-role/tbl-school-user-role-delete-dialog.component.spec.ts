/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolUserRoleDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role-delete-dialog.component';
import { TblSchoolUserRoleService } from '../../../../../../main/webapp/app/entities/tbl-school-user-role/tbl-school-user-role.service';

describe('Component Tests', () => {

    describe('TblSchoolUserRole Management Delete Component', () => {
        let comp: TblSchoolUserRoleDeleteDialogComponent;
        let fixture: ComponentFixture<TblSchoolUserRoleDeleteDialogComponent>;
        let service: TblSchoolUserRoleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolUserRoleDeleteDialogComponent],
                providers: [
                    TblSchoolUserRoleService
                ]
            })
            .overrideTemplate(TblSchoolUserRoleDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolUserRoleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolUserRoleService);
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
