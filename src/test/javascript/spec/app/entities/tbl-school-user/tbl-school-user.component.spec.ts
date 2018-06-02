/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolUserComponent } from '../../../../../../main/webapp/app/entities/tbl-school-user/tbl-school-user.component';
import { TblSchoolUserService } from '../../../../../../main/webapp/app/entities/tbl-school-user/tbl-school-user.service';
import { TblSchoolUser } from '../../../../../../main/webapp/app/entities/tbl-school-user/tbl-school-user.model';

describe('Component Tests', () => {

    describe('TblSchoolUser Management Component', () => {
        let comp: TblSchoolUserComponent;
        let fixture: ComponentFixture<TblSchoolUserComponent>;
        let service: TblSchoolUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolUserComponent],
                providers: [
                    TblSchoolUserService
                ]
            })
            .overrideTemplate(TblSchoolUserComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblSchoolUser(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblSchoolUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
