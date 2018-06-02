/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolSettingComponent } from '../../../../../../main/webapp/app/entities/tbl-school-setting/tbl-school-setting.component';
import { TblSchoolSettingService } from '../../../../../../main/webapp/app/entities/tbl-school-setting/tbl-school-setting.service';
import { TblSchoolSetting } from '../../../../../../main/webapp/app/entities/tbl-school-setting/tbl-school-setting.model';

describe('Component Tests', () => {

    describe('TblSchoolSetting Management Component', () => {
        let comp: TblSchoolSettingComponent;
        let fixture: ComponentFixture<TblSchoolSettingComponent>;
        let service: TblSchoolSettingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolSettingComponent],
                providers: [
                    TblSchoolSettingService
                ]
            })
            .overrideTemplate(TblSchoolSettingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolSettingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolSettingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblSchoolSetting(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblSchoolSettings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
