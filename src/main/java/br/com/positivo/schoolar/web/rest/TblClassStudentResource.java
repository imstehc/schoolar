package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblClassStudent;

import br.com.positivo.schoolar.repository.TblClassStudentRepository;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TblClassStudent.
 */
@RestController
@RequestMapping("/api")
public class TblClassStudentResource {

    private final Logger log = LoggerFactory.getLogger(TblClassStudentResource.class);

    private static final String ENTITY_NAME = "tblClassStudent";

    private final TblClassStudentRepository tblClassStudentRepository;

    public TblClassStudentResource(TblClassStudentRepository tblClassStudentRepository) {
        this.tblClassStudentRepository = tblClassStudentRepository;
    }

    /**
     * POST  /tbl-class-students : Create a new tblClassStudent.
     *
     * @param tblClassStudent the tblClassStudent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblClassStudent, or with status 400 (Bad Request) if the tblClassStudent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-class-students")
    @Timed
    public ResponseEntity<TblClassStudent> createTblClassStudent(@RequestBody TblClassStudent tblClassStudent) throws URISyntaxException {
        log.debug("REST request to save TblClassStudent : {}", tblClassStudent);
        if (tblClassStudent.getId() != null) {
            throw new BadRequestAlertException("A new tblClassStudent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblClassStudent result = tblClassStudentRepository.save(tblClassStudent);
        return ResponseEntity.created(new URI("/api/tbl-class-students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-class-students : Updates an existing tblClassStudent.
     *
     * @param tblClassStudent the tblClassStudent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblClassStudent,
     * or with status 400 (Bad Request) if the tblClassStudent is not valid,
     * or with status 500 (Internal Server Error) if the tblClassStudent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-class-students")
    @Timed
    public ResponseEntity<TblClassStudent> updateTblClassStudent(@RequestBody TblClassStudent tblClassStudent) throws URISyntaxException {
        log.debug("REST request to update TblClassStudent : {}", tblClassStudent);
        if (tblClassStudent.getId() == null) {
            return createTblClassStudent(tblClassStudent);
        }
        TblClassStudent result = tblClassStudentRepository.save(tblClassStudent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblClassStudent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-class-students : get all the tblClassStudents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblClassStudents in body
     */
    @GetMapping("/tbl-class-students")
    @Timed
    public List<TblClassStudent> getAllTblClassStudents() {
        log.debug("REST request to get all TblClassStudents");
        return tblClassStudentRepository.findAll();
        }

    /**
     * GET  /tbl-class-students/:id : get the "id" tblClassStudent.
     *
     * @param id the id of the tblClassStudent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblClassStudent, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-class-students/{id}")
    @Timed
    public ResponseEntity<TblClassStudent> getTblClassStudent(@PathVariable Long id) {
        log.debug("REST request to get TblClassStudent : {}", id);
        TblClassStudent tblClassStudent = tblClassStudentRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblClassStudent));
    }

    /**
     * DELETE  /tbl-class-students/:id : delete the "id" tblClassStudent.
     *
     * @param id the id of the tblClassStudent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-class-students/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblClassStudent(@PathVariable Long id) {
        log.debug("REST request to delete TblClassStudent : {}", id);
        tblClassStudentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
