/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblSubjectDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-subject/tbl-subject-detail.component';
import { TblSubjectService } from '../../../../../../main/webapp/app/entities/tbl-subject/tbl-subject.service';
import { TblSubject } from '../../../../../../main/webapp/app/entities/tbl-subject/tbl-subject.model';

describe('Component Tests', () => {

    describe('TblSubject Management Detail Component', () => {
        let comp: TblSubjectDetailComponent;
        let fixture: ComponentFixture<TblSubjectDetailComponent>;
        let service: TblSubjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSubjectDetailComponent],
                providers: [
                    TblSubjectService
                ]
            })
            .overrideTemplate(TblSubjectDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSubjectDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSubjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblSubject(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblSubject).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
