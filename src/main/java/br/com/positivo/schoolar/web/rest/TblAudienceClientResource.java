package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblAudienceClient;

import br.com.positivo.schoolar.repository.TblAudienceClientRepository;
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
 * REST controller for managing TblAudienceClient.
 */
@RestController
@RequestMapping("/api")
public class TblAudienceClientResource {

    private final Logger log = LoggerFactory.getLogger(TblAudienceClientResource.class);

    private static final String ENTITY_NAME = "tblAudienceClient";

    private final TblAudienceClientRepository tblAudienceClientRepository;

    public TblAudienceClientResource(TblAudienceClientRepository tblAudienceClientRepository) {
        this.tblAudienceClientRepository = tblAudienceClientRepository;
    }

    /**
     * POST  /tbl-audience-clients : Create a new tblAudienceClient.
     *
     * @param tblAudienceClient the tblAudienceClient to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblAudienceClient, or with status 400 (Bad Request) if the tblAudienceClient has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-audience-clients")
    @Timed
    public ResponseEntity<TblAudienceClient> createTblAudienceClient(@Valid @RequestBody TblAudienceClient tblAudienceClient) throws URISyntaxException {
        log.debug("REST request to save TblAudienceClient : {}", tblAudienceClient);
        if (tblAudienceClient.getId() != null) {
            throw new BadRequestAlertException("A new tblAudienceClient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblAudienceClient result = tblAudienceClientRepository.save(tblAudienceClient);
        return ResponseEntity.created(new URI("/api/tbl-audience-clients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-audience-clients : Updates an existing tblAudienceClient.
     *
     * @param tblAudienceClient the tblAudienceClient to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblAudienceClient,
     * or with status 400 (Bad Request) if the tblAudienceClient is not valid,
     * or with status 500 (Internal Server Error) if the tblAudienceClient couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-audience-clients")
    @Timed
    public ResponseEntity<TblAudienceClient> updateTblAudienceClient(@Valid @RequestBody TblAudienceClient tblAudienceClient) throws URISyntaxException {
        log.debug("REST request to update TblAudienceClient : {}", tblAudienceClient);
        if (tblAudienceClient.getId() == null) {
            return createTblAudienceClient(tblAudienceClient);
        }
        TblAudienceClient result = tblAudienceClientRepository.save(tblAudienceClient);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblAudienceClient.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-audience-clients : get all the tblAudienceClients.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblAudienceClients in body
     */
    @GetMapping("/tbl-audience-clients")
    @Timed
    public List<TblAudienceClient> getAllTblAudienceClients() {
        log.debug("REST request to get all TblAudienceClients");
        return tblAudienceClientRepository.findAll();
        }

    /**
     * GET  /tbl-audience-clients/:id : get the "id" tblAudienceClient.
     *
     * @param id the id of the tblAudienceClient to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblAudienceClient, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-audience-clients/{id}")
    @Timed
    public ResponseEntity<TblAudienceClient> getTblAudienceClient(@PathVariable Long id) {
        log.debug("REST request to get TblAudienceClient : {}", id);
        TblAudienceClient tblAudienceClient = tblAudienceClientRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblAudienceClient));
    }

    /**
     * DELETE  /tbl-audience-clients/:id : delete the "id" tblAudienceClient.
     *
     * @param id the id of the tblAudienceClient to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-audience-clients/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblAudienceClient(@PathVariable Long id) {
        log.debug("REST request to delete TblAudienceClient : {}", id);
        tblAudienceClientRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
