/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassDetailComponent } from '../../../../../../main/webapp/app/entities/tbl-class/tbl-class-detail.component';
import { TblClassService } from '../../../../../../main/webapp/app/entities/tbl-class/tbl-class.service';
import { TblClass } from '../../../../../../main/webapp/app/entities/tbl-class/tbl-class.model';

describe('Component Tests', () => {

    describe('TblClass Management Detail Component', () => {
        let comp: TblClassDetailComponent;
        let fixture: ComponentFixture<TblClassDetailComponent>;
        let service: TblClassService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassDetailComponent],
                providers: [
                    TblClassService
                ]
            })
            .overrideTemplate(TblClassDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TblClass(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tblClass).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
