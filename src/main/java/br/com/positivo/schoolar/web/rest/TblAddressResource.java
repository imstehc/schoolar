package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblAddress;

import br.com.positivo.schoolar.repository.TblAddressRepository;
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
 * REST controller for managing TblAddress.
 */
@RestController
@RequestMapping("/api")
public class TblAddressResource {

    private final Logger log = LoggerFactory.getLogger(TblAddressResource.class);

    private static final String ENTITY_NAME = "tblAddress";

    private final TblAddressRepository tblAddressRepository;

    public TblAddressResource(TblAddressRepository tblAddressRepository) {
        this.tblAddressRepository = tblAddressRepository;
    }

    /**
     * POST  /tbl-addresses : Create a new tblAddress.
     *
     * @param tblAddress the tblAddress to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblAddress, or with status 400 (Bad Request) if the tblAddress has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-addresses")
    @Timed
    public ResponseEntity<TblAddress> createTblAddress(@Valid @RequestBody TblAddress tblAddress) throws URISyntaxException {
        log.debug("REST request to save TblAddress : {}", tblAddress);
        if (tblAddress.getId() != null) {
            throw new BadRequestAlertException("A new tblAddress cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblAddress result = tblAddressRepository.save(tblAddress);
        return ResponseEntity.created(new URI("/api/tbl-addresses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-addresses : Updates an existing tblAddress.
     *
     * @param tblAddress the tblAddress to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblAddress,
     * or with status 400 (Bad Request) if the tblAddress is not valid,
     * or with status 500 (Internal Server Error) if the tblAddress couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-addresses")
    @Timed
    public ResponseEntity<TblAddress> updateTblAddress(@Valid @RequestBody TblAddress tblAddress) throws URISyntaxException {
        log.debug("REST request to update TblAddress : {}", tblAddress);
        if (tblAddress.getId() == null) {
            return createTblAddress(tblAddress);
        }
        TblAddress result = tblAddressRepository.save(tblAddress);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblAddress.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-addresses : get all the tblAddresses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblAddresses in body
     */
    @GetMapping("/tbl-addresses")
    @Timed
    public List<TblAddress> getAllTblAddresses() {
        log.debug("REST request to get all TblAddresses");
        return tblAddressRepository.findAll();
        }

    /**
     * GET  /tbl-addresses/:id : get the "id" tblAddress.
     *
     * @param id the id of the tblAddress to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblAddress, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-addresses/{id}")
    @Timed
    public ResponseEntity<TblAddress> getTblAddress(@PathVariable Long id) {
        log.debug("REST request to get TblAddress : {}", id);
        TblAddress tblAddress = tblAddressRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblAddress));
    }

    /**
     * DELETE  /tbl-addresses/:id : delete the "id" tblAddress.
     *
     * @param id the id of the tblAddress to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-addresses/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblAddress(@PathVariable Long id) {
        log.debug("REST request to delete TblAddress : {}", id);
        tblAddressRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
