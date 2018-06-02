package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblSchoolUserRole;

import br.com.positivo.schoolar.repository.TblSchoolUserRoleRepository;
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
 * REST controller for managing TblSchoolUserRole.
 */
@RestController
@RequestMapping("/api")
public class TblSchoolUserRoleResource {

    private final Logger log = LoggerFactory.getLogger(TblSchoolUserRoleResource.class);

    private static final String ENTITY_NAME = "tblSchoolUserRole";

    private final TblSchoolUserRoleRepository tblSchoolUserRoleRepository;

    public TblSchoolUserRoleResource(TblSchoolUserRoleRepository tblSchoolUserRoleRepository) {
        this.tblSchoolUserRoleRepository = tblSchoolUserRoleRepository;
    }

    /**
     * POST  /tbl-school-user-roles : Create a new tblSchoolUserRole.
     *
     * @param tblSchoolUserRole the tblSchoolUserRole to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblSchoolUserRole, or with status 400 (Bad Request) if the tblSchoolUserRole has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-school-user-roles")
    @Timed
    public ResponseEntity<TblSchoolUserRole> createTblSchoolUserRole(@Valid @RequestBody TblSchoolUserRole tblSchoolUserRole) throws URISyntaxException {
        log.debug("REST request to save TblSchoolUserRole : {}", tblSchoolUserRole);
        if (tblSchoolUserRole.getId() != null) {
            throw new BadRequestAlertException("A new tblSchoolUserRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblSchoolUserRole result = tblSchoolUserRoleRepository.save(tblSchoolUserRole);
        return ResponseEntity.created(new URI("/api/tbl-school-user-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-school-user-roles : Updates an existing tblSchoolUserRole.
     *
     * @param tblSchoolUserRole the tblSchoolUserRole to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblSchoolUserRole,
     * or with status 400 (Bad Request) if the tblSchoolUserRole is not valid,
     * or with status 500 (Internal Server Error) if the tblSchoolUserRole couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-school-user-roles")
    @Timed
    public ResponseEntity<TblSchoolUserRole> updateTblSchoolUserRole(@Valid @RequestBody TblSchoolUserRole tblSchoolUserRole) throws URISyntaxException {
        log.debug("REST request to update TblSchoolUserRole : {}", tblSchoolUserRole);
        if (tblSchoolUserRole.getId() == null) {
            return createTblSchoolUserRole(tblSchoolUserRole);
        }
        TblSchoolUserRole result = tblSchoolUserRoleRepository.save(tblSchoolUserRole);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblSchoolUserRole.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-school-user-roles : get all the tblSchoolUserRoles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchoolUserRoles in body
     */
    @GetMapping("/tbl-school-user-roles")
    @Timed
    public List<TblSchoolUserRole> getAllTblSchoolUserRoles() {
        log.debug("REST request to get all TblSchoolUserRoles");
        return tblSchoolUserRoleRepository.findAll();
        }

    /**
     * GET  /tbl-school-user-roles/:id : get the "id" tblSchoolUserRole.
     *
     * @param id the id of the tblSchoolUserRole to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchoolUserRole, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-school-user-roles/{id}")
    @Timed
    public ResponseEntity<TblSchoolUserRole> getTblSchoolUserRole(@PathVariable Long id) {
        log.debug("REST request to get TblSchoolUserRole : {}", id);
        TblSchoolUserRole tblSchoolUserRole = tblSchoolUserRoleRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblSchoolUserRole));
    }

    /**
     * DELETE  /tbl-school-user-roles/:id : delete the "id" tblSchoolUserRole.
     *
     * @param id the id of the tblSchoolUserRole to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-school-user-roles/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblSchoolUserRole(@PathVariable Long id) {
        log.debug("REST request to delete TblSchoolUserRole : {}", id);
        tblSchoolUserRoleRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
