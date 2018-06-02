/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblSchoolSettingDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-school-setting/tbl-school-setting-detail.component';
import { TblSchoolSettingService } from '../../../../../../main/webapp/app/entities/tbl-school-setting/tbl-school-setting.service';
import { TblSchoolSetting } from '../../../../../../main/webapp/app/entities/tbl-school-setting/tbl-school-setting.model';

describe('Component Tests', () => {

    describe('TblSchoolSetting Management Detail Component', () => {
        let comp: TblSchoolSettingDetailComponent;
        let fixture: ComponentFixture<TblSchoolSettingDetailComponent>;
        let service: TblSchoolSettingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblSchoolSettingDetailComponent],
                providers: [
                    TblSchoolSettingService
                ]
            })
            .overrideTemplate(TblSchoolSettingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblSchoolSettingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblSchoolSettingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblSchoolSetting(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblSchoolSetting).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
