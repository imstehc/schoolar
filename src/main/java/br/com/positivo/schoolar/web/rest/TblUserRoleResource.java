package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblUserRole;

import br.com.positivo.schoolar.repository.TblUserRoleRepository;
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
 * REST controller for managing TblUserRole.
 */
@RestController
@RequestMapping("/api")
public class TblUserRoleResource {

    private final Logger log = LoggerFactory.getLogger(TblUserRoleResource.class);

    private static final String ENTITY_NAME = "tblUserRole";

    private final TblUserRoleRepository tblUserRoleRepository;

    public TblUserRoleResource(TblUserRoleRepository tblUserRoleRepository) {
        this.tblUserRoleRepository = tblUserRoleRepository;
    }

    /**
     * POST  /tbl-user-roles : Create a new tblUserRole.
     *
     * @param tblUserRole the tblUserRole to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblUserRole, or with status 400 (Bad Request) if the tblUserRole has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-user-roles")
    @Timed
    public ResponseEntity<TblUserRole> createTblUserRole(@Valid @RequestBody TblUserRole tblUserRole) throws URISyntaxException {
        log.debug("REST request to save TblUserRole : {}", tblUserRole);
        if (tblUserRole.getId() != null) {
            throw new BadRequestAlertException("A new tblUserRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblUserRole result = tblUserRoleRepository.save(tblUserRole);
        return ResponseEntity.created(new URI("/api/tbl-user-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-user-roles : Updates an existing tblUserRole.
     *
     * @param tblUserRole the tblUserRole to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblUserRole,
     * or with status 400 (Bad Request) if the tblUserRole is not valid,
     * or with status 500 (Internal Server Error) if the tblUserRole couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-user-roles")
    @Timed
    public ResponseEntity<TblUserRole> updateTblUserRole(@Valid @RequestBody TblUserRole tblUserRole) throws URISyntaxException {
        log.debug("REST request to update TblUserRole : {}", tblUserRole);
        if (tblUserRole.getId() == null) {
            return createTblUserRole(tblUserRole);
        }
        TblUserRole result = tblUserRoleRepository.save(tblUserRole);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblUserRole.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-user-roles : get all the tblUserRoles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblUserRoles in body
     */
    @GetMapping("/tbl-user-roles")
    @Timed
    public List<TblUserRole> getAllTblUserRoles() {
        log.debug("REST request to get all TblUserRoles");
        return tblUserRoleRepository.findAll();
        }

    /**
     * GET  /tbl-user-roles/:id : get the "id" tblUserRole.
     *
     * @param id the id of the tblUserRole to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblUserRole, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-user-roles/{id}")
    @Timed
    public ResponseEntity<TblUserRole> getTblUserRole(@PathVariable Long id) {
        log.debug("REST request to get TblUserRole : {}", id);
        TblUserRole tblUserRole = tblUserRoleRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblUserRole));
    }

    /**
     * DELETE  /tbl-user-roles/:id : delete the "id" tblUserRole.
     *
     * @param id the id of the tblUserRole to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-user-roles/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblUserRole(@PathVariable Long id) {
        log.debug("REST request to delete TblUserRole : {}", id);
        tblUserRoleRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
