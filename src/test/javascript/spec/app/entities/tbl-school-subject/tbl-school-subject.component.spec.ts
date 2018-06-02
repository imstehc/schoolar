/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolSubjectComponent } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject.component';
import { TblSchoolSubjectService } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject.service';
import { TblSchoolSubject } from '../../../../../../main/webapp/app/entities/tbl-school-subject/tbl-school-subject.model';

describe('Component Tests', () => {

    describe('TblSchoolSubject Management Component', () => {
        let comp: TblSchoolSubjectComponent;
        let fixture: ComponentFixture<TblSchoolSubjectComponent>;
        let service: TblSchoolSubjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolSubjectComponent],
                providers: [
                    TblSchoolSubjectService
                ]
            })
            .overrideTemplate(TblSchoolSubjectComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolSubjectComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolSubjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblSchoolSubject(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblSchoolSubjects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
