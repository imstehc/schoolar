/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SchoolarTestModule } from '../../../test.module';
import { TblClassComponent } from '../../../../../../main/webapp/app/entities/tbl-class/tbl-class.component';
import { TblClassService } from '../../../../../../main/webapp/app/entities/tbl-class/tbl-class.service';
import { TblClass } from '../../../../../../main/webapp/app/entities/tbl-class/tbl-class.model';

describe('Component Tests', () => {

    describe('TblClass Management Component', () => {
        let comp: TblClassComponent;
        let fixture: ComponentFixture<TblClassComponent>;
        let service: TblClassService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolarTestModule],
                declarations: [TblClassComponent],
                providers: [
                    TblClassService
                ]
            })
            .overrideTemplate(TblClassComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TblClassComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TblClassService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TblClass(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tblClasses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
