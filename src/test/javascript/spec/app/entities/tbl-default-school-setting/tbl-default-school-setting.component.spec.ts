/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblDefaultSchoolSettingComponent } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting.component';
import { TblDefaultSchoolSettingService } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting.service';
import { TblDefaultSchoolSetting } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting.model';

describe('Component Tests', () => {

    describe('TblDefaultSchoolSetting Management Component', () => {
        let comp: TblDefaultSchoolSettingComponent;
        let fixture: ComponentFixture<TblDefaultSchoolSettingComponent>;
        let service: TblDefaultSchoolSettingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblDefaultSchoolSettingComponent],
                providers: [
                    TblDefaultSchoolSettingService
                ]
            })
            .overrideTemplate(TblDefaultSchoolSettingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblDefaultSchoolSettingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblDefaultSchoolSettingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblDefaultSchoolSetting(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblDefaultSchoolSettings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
