package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblPhone;

import br.com.positivo.schoolar.repository.TblPhoneRepository;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TblPhone.
 */
@RestController
@RequestMapping("/api")
public class TblPhoneResource {

    private final Logger log = LoggerFactory.getLogger(TblPhoneResource.class);

    private static final String ENTITY_NAME = "tblPhone";

    private final TblPhoneRepository tblPhoneRepository;

    public TblPhoneResource(TblPhoneRepository tblPhoneRepository) {
        this.tblPhoneRepository = tblPhoneRepository;
    }

    /**
     * POST  /tbl-phones : Create a new tblPhone.
     *
     * @param tblPhone the tblPhone to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblPhone, or with status 400 (Bad Request) if the tblPhone has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-phones")
    @Timed
    public ResponseEntity<TblPhone> createTblPhone(@Valid @RequestBody TblPhone tblPhone) throws URISyntaxException {
        log.debug("REST request to save TblPhone : {}", tblPhone);
        if (tblPhone.getId() != null) {
            throw new BadRequestAlertException("A new tblPhone cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblPhone result = tblPhoneRepository.save(tblPhone);
        return ResponseEntity.created(new URI("/api/tbl-phones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-phones : Updates an existing tblPhone.
     *
     * @param tblPhone the tblPhone to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblPhone,
     * or with status 400 (Bad Request) if the tblPhone is not valid,
     * or with status 500 (Internal Server Error) if the tblPhone couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-phones")
    @Timed
    public ResponseEntity<TblPhone> updateTblPhone(@Valid @RequestBody TblPhone tblPhone) throws URISyntaxException {
        log.debug("REST request to update TblPhone : {}", tblPhone);
        if (tblPhone.getId() == null) {
            return createTblPhone(tblPhone);
        }
        TblPhone result = tblPhoneRepository.save(tblPhone);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblPhone.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-phones : get all the tblPhones.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblPhones in body
     */
    @GetMapping("/tbl-phones")
    @Timed
    public List<TblPhone> getAllTblPhones() {
        log.debug("REST request to get all TblPhones");
        return tblPhoneRepository.findAll();
        }

    /**
     * GET  /tbl-phones/:id : get the "id" tblPhone.
     *
     * @param id the id of the tblPhone to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblPhone, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-phones/{id}")
    @Timed
    public ResponseEntity<TblPhone> getTblPhone(@PathVariable Long id) {
        log.debug("REST request to get TblPhone : {}", id);
        TblPhone tblPhone = tblPhoneRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblPhone));
    }

    /**
     * DELETE  /tbl-phones/:id : delete the "id" tblPhone.
     *
     * @param id the id of the tblPhone to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-phones/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblPhone(@PathVariable Long id) {
        log.debug("REST request to delete TblPhone : {}", id);
        tblPhoneRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
