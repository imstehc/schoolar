package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.service.UAAService;
import br.com.positivo.schoolar.service.dto.UserDTO;
import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblLogin;

import br.com.positivo.schoolar.repository.TblLoginRepository;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TblLogin.
 */
@RestController
@RequestMapping("/api")
public class TblLoginResource {

    private final Logger log = LoggerFactory.getLogger(TblLoginResource.class);

    private static final String ENTITY_NAME = "tblLogin";

    private final TblLoginRepository tblLoginRepository;

    @Autowired
    private UAAService uaaService;

    public TblLoginResource(TblLoginRepository tblLoginRepository) {
        this.tblLoginRepository = tblLoginRepository;
    }

    /**
     * POST  /tbl-logins : Create a new tblLogin...
     *
     * @param tblLogin the tblLogin to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblLogin, or with status 400 (Bad Request) if the tblLogin has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-logins")
    @Timed
    public TblLogin createTblLogin(@Valid @RequestBody TblLogin tblLogin) throws Exception {
        log.debug("REST request to save TblLogin : {}", tblLogin);

        if (tblLogin.getId() != null) {
            throw new BadRequestAlertException("A new tblLogin cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if (tblLogin.getUser() == null && tblLogin.getUser().getId() == null) {
            throw new BadRequestAlertException("User id can not be null", "ENTITY_NAME", "useridisnull");
        }

        return uaaService.registerNewUser(tblLogin);
    }

    /**
     * PUT  /tbl-logins : Updates an existing tblLogin.
     *
     * @param tblLogin the tblLogin to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblLogin,
     * or with status 400 (Bad Request) if the tblLogin is not valid,
     * or with status 500 (Internal Server Error) if the tblLogin couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    // TODO: make it work when these logins are being fetched from UAA
//    @PutMapping("/tbl-logins")
//    @Timed
//    public ResponseEntity<TblLogin> updateTblLogin(@Valid @RequestBody TblLogin tblLogin) throws Exception {
//        log.debug("REST request to update TblLogin : {}", tblLogin);
//        if (tblLogin.getId() == null) {
//            return createTblLogin(tblLogin);
//        }
//        TblLogin result = tblLoginRepository.save(tblLogin);
//        return ResponseEntity.ok()
//            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblLogin.getId().toString()))
//            .body(result);
//    }

    /**
     * GET  /tbl-logins : get all the tblLogins.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblLogins in body
     */
    @GetMapping("/tbl-logins")
    @Timed
    public List<TblLogin> getAllTblLogins() {
        log.debug("REST request to get all TblLogins");
        return Collections.emptyList();
    }

    /**
     * GET  /tbl-logins/:id : get the "id" tblLogin.
     *
     * @param id the id of the tblLogin to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblLogin, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-logins/{id}")
    @Timed
    public ResponseEntity<TblLogin> getTblLogin(@PathVariable Long id) {
        log.debug("REST request to get TblLogin : {}", id);
        TblLogin tblLogin = tblLoginRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblLogin));
    }

    /**
     * DELETE  /tbl-logins/:id : delete the "id" tblLogin.
     *
     * @param id the id of the tblLogin to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-logins/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblLogin(@PathVariable Long id) throws Exception{
        log.debug("REST request to delete TblLogin : {}", id);
        Long idDelete = uaaService.deleteTblLogin(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, idDelete.toString())).build();
    }
}
