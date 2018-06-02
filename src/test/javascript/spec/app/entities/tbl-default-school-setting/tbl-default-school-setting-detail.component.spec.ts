/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblDefaultSchoolSettingDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting-detail.component';
import { TblDefaultSchoolSettingService } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting.service';
import { TblDefaultSchoolSetting } from '../../../../../../main/webapp/app/entities/tbl-default-school-setting/tbl-default-school-setting.model';

describe('Component Tests', () => {

    describe('TblDefaultSchoolSetting Management Detail Component', () => {
        let comp: TblDefaultSchoolSettingDetailComponent;
        let fixture: ComponentFixture<TblDefaultSchoolSettingDetailComponent>;
        let service: TblDefaultSchoolSettingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblDefaultSchoolSettingDetailComponent],
                providers: [
                    TblDefaultSchoolSettingService
                ]
            })
            .overrideTemplate(TblDefaultSchoolSettingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblDefaultSchoolSettingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblDefaultSchoolSettingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblDefaultSchoolSetting(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblDefaultSchoolSetting).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
