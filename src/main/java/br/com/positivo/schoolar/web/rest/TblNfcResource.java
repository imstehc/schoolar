package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.domain.TblNfc;
import br.com.positivo.schoolar.repository.TblNfcRepository;
import br.com.positivo.schoolar.repository.TblUserRepository;
import br.com.positivo.schoolar.service.TblNfcService;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TblNfc.
 */
@RestController
@RequestMapping("/api")
public class TblNfcResource {

    private final Logger log = LoggerFactory.getLogger(TblNfcResource.class);

    private static final String ENTITY_NAME = "tblNfc";

    private final TblNfcRepository tblNfcRepository;

    @Autowired
    private TblNfcService tblNfcService;

    public TblNfcResource(TblNfcRepository tblNfcRepository, TblUserRepository tblUserRepository) {
        this.tblNfcRepository = tblNfcRepository;
    }

    /**
     * POST  /tbl-nfcs : Create a new tblNfc.
     *
     * @param tblNfc the tblNfc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblNfc, or with status 400 (Bad Request) if the tblNfc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-nfcs")
    @Timed
    public ResponseEntity<TblNfc> createTblNfc(@Valid @RequestBody TblNfc tblNfc) throws Exception {
        log.debug("REST request to save TblNfc : {}", tblNfc);
        if (tblNfc.getId() != null) {
            throw new BadRequestAlertException("A new tblNfc cannot already have an ID", ENTITY_NAME, "idexists");
        }

        TblNfc result = tblNfcService.save(tblNfc);
        return ResponseEntity.created(new URI("/api/tbl-nfcs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-nfcs : Updates an existing tblNfc.
     *
     * @param tblNfc the tblNfc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblNfc,
     * or with status 400 (Bad Request) if the tblNfc is not valid,
     * or with status 500 (Internal Server Error) if the tblNfc couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-nfcs")
    @Timed
    public ResponseEntity<TblNfc> updateTblNfc(@Valid @RequestBody TblNfc tblNfc) throws Exception {
        log.debug("REST request to update TblNfc : {}", tblNfc);
        if (tblNfc.getId() == null) {
            return createTblNfc(tblNfc);
        }
        TblNfc result = tblNfcService.save(tblNfc);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblNfc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-nfcs : get all the tblNfcs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblNfcs in body
     */
    @GetMapping("/tbl-nfcs")
    @Timed
    public List<TblNfc> getAllTblNfcs() {
        log.debug("REST request to get all TblNfcs");
        return tblNfcRepository.findAll();
    }

    /**
     * GET  /tbl-nfcs/:id : get the "id" tblNfc.
     *
     * @param id the id of the tblNfc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblNfc, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-nfcs/{id}")
    @Timed
    public ResponseEntity<TblNfc> getTblNfc(@PathVariable Long id) {
        log.debug("REST request to get TblNfc : {}", id);
        TblNfc tblNfc = tblNfcRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblNfc));
    }

    /**
     * GET  /tbl-nfcs-associateds/:id : get the all associateds tblNfc by "id" TblUser.
     *
     * @param id the id of the tblNfc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblNfc, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-nfcs-associated/{id}")
    @Timed
    public List<TblNfc>  getTblNfcAssociates(@PathVariable Long id) {
        log.debug("REST request to get TblNfc : {}", id);
        return tblNfcRepository.findAssociated(id);

    }

    /**
     * DELETE  /tbl-nfcs/:id : delete the "id" tblNfc.
     *
     * @param id the id of the tblNfc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-nfcs/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblNfc(@PathVariable Long id) {
        log.debug("REST request to delete TblNfc : {}", id);
        tblNfcRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
