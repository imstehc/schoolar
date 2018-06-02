/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblLevelTypeComponent } from '../../../../../../main/webapp/app/entities/tbl-level-type/tbl-level-type.component';
import { TblLevelTypeService } from '../../../../../../main/webapp/app/entities/tbl-level-type/tbl-level-type.service';
import { TblLevelType } from '../../../../../../main/webapp/app/entities/tbl-level-type/tbl-level-type.model';

describe('Component Tests', () => {

    describe('TblLevelType Management Component', () => {
        let comp: TblLevelTypeComponent;
        let fixture: ComponentFixture<TblLevelTypeComponent>;
        let service: TblLevelTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblLevelTypeComponent],
                providers: [
                    TblLevelTypeService
                ]
            })
            .overrideTemplate(TblLevelTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblLevelTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblLevelTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblLevelType(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblLevelTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
