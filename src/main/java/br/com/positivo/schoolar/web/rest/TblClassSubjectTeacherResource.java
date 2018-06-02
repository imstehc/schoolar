package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblClassSubjectTeacher;

import br.com.positivo.schoolar.repository.TblClassSubjectTeacherRepository;
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
 * REST controller for managing TblClassSubjectTeacher.
 */
@RestController
@RequestMapping("/api")
public class TblClassSubjectTeacherResource {

    private final Logger log = LoggerFactory.getLogger(TblClassSubjectTeacherResource.class);

    private static final String ENTITY_NAME = "tblClassSubjectTeacher";

    private final TblClassSubjectTeacherRepository tblClassSubjectTeacherRepository;

    public TblClassSubjectTeacherResource(TblClassSubjectTeacherRepository tblClassSubjectTeacherRepository) {
        this.tblClassSubjectTeacherRepository = tblClassSubjectTeacherRepository;
    }

    /**
     * POST  /tbl-class-subject-teachers : Create a new tblClassSubjectTeacher.
     *
     * @param tblClassSubjectTeacher the tblClassSubjectTeacher to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblClassSubjectTeacher, or with status 400 (Bad Request) if the tblClassSubjectTeacher has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-class-subject-teachers")
    @Timed
    public ResponseEntity<TblClassSubjectTeacher> createTblClassSubjectTeacher(@RequestBody TblClassSubjectTeacher tblClassSubjectTeacher) throws URISyntaxException {
        log.debug("REST request to save TblClassSubjectTeacher : {}", tblClassSubjectTeacher);
        if (tblClassSubjectTeacher.getId() != null) {
            throw new BadRequestAlertException("A new tblClassSubjectTeacher cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblClassSubjectTeacher result = tblClassSubjectTeacherRepository.save(tblClassSubjectTeacher);
        return ResponseEntity.created(new URI("/api/tbl-class-subject-teachers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-class-subject-teachers : Updates an existing tblClassSubjectTeacher.
     *
     * @param tblClassSubjectTeacher the tblClassSubjectTeacher to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblClassSubjectTeacher,
     * or with status 400 (Bad Request) if the tblClassSubjectTeacher is not valid,
     * or with status 500 (Internal Server Error) if the tblClassSubjectTeacher couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-class-subject-teachers")
    @Timed
    public ResponseEntity<TblClassSubjectTeacher> updateTblClassSubjectTeacher(@RequestBody TblClassSubjectTeacher tblClassSubjectTeacher) throws URISyntaxException {
        log.debug("REST request to update TblClassSubjectTeacher : {}", tblClassSubjectTeacher);
        if (tblClassSubjectTeacher.getId() == null) {
            return createTblClassSubjectTeacher(tblClassSubjectTeacher);
        }
        TblClassSubjectTeacher result = tblClassSubjectTeacherRepository.save(tblClassSubjectTeacher);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblClassSubjectTeacher.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-class-subject-teachers : get all the tblClassSubjectTeachers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblClassSubjectTeachers in body
     */
    @GetMapping("/tbl-class-subject-teachers")
    @Timed
    public List<TblClassSubjectTeacher> getAllTblClassSubjectTeachers() {
        log.debug("REST request to get all TblClassSubjectTeachers");
        return tblClassSubjectTeacherRepository.findAll();
        }

    /**
     * GET  /tbl-class-subject-teachers/:id : get the "id" tblClassSubjectTeacher.
     *
     * @param id the id of the tblClassSubjectTeacher to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblClassSubjectTeacher, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-class-subject-teachers/{id}")
    @Timed
    public ResponseEntity<TblClassSubjectTeacher> getTblClassSubjectTeacher(@PathVariable Long id) {
        log.debug("REST request to get TblClassSubjectTeacher : {}", id);
        TblClassSubjectTeacher tblClassSubjectTeacher = tblClassSubjectTeacherRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblClassSubjectTeacher));
    }

    /**
     * DELETE  /tbl-class-subject-teachers/:id : delete the "id" tblClassSubjectTeacher.
     *
     * @param id the id of the tblClassSubjectTeacher to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-class-subject-teachers/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblClassSubjectTeacher(@PathVariable Long id) {
        log.debug("REST request to delete TblClassSubjectTeacher : {}", id);
        tblClassSubjectTeacherRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
