/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblSubjectComponent } from '../../../../../../main/webapp/app/entities/tbl-subject/tbl-subject.component';
import { TblSubjectService } from '../../../../../../main/webapp/app/entities/tbl-subject/tbl-subject.service';
import { TblSubject } from '../../../../../../main/webapp/app/entities/tbl-subject/tbl-subject.model';

describe('Component Tests', () => {

    describe('TblSubject Management Component', () => {
        let comp: TblSubjectComponent;
        let fixture: ComponentFixture<TblSubjectComponent>;
        let service: TblSubjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSubjectComponent],
                providers: [
                    TblSubjectService
                ]
            })
            .overrideTemplate(TblSubjectComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSubjectComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSubjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblSubject(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblSubjects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
