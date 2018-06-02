package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.security.jwt.TokenDecode;
import br.com.positivo.schoolar.service.TblRoleService;
import br.com.positivo.schoolar.service.dto.TblRoleCrudUserDTO;
import br.com.positivo.schoolar.service.dto.TblSchoolUserRoleDTO;
import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblRole;
import br.com.positivo.schoolar.repository.TblRoleRepository;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
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
 * REST controller for managing TblRole.
 */
@RestController
@RequestMapping("/api")
public class TblRoleResource {

    private final Logger log = LoggerFactory.getLogger(TblRoleResource.class);

    private static final String ENTITY_NAME = "tblRole";

    private final TblRoleRepository tblRoleRepository;

    @Autowired
    private TblRoleService tblRoleService;

    public TblRoleResource(TblRoleRepository tblRoleRepository) {
        this.tblRoleRepository = tblRoleRepository;
    }

    /**
     * POST  /tbl-roles : Create a new tblRole.
     *
     * @param tblRole the tblRole to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblRole, or with status 400 (Bad Request) if the tblRole has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-roles")
    @Timed
    public ResponseEntity<TblRole> createTblRole(@Valid @RequestBody TblRole tblRole) throws URISyntaxException {
        log.debug("REST request to save TblRole : {}", tblRole);
        if (tblRole.getId() != null) {
            throw new BadRequestAlertException("A new tblRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblRole result = tblRoleRepository.save(tblRole);
        return ResponseEntity.created(new URI("/api/tbl-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-roles : Updates an existing tblRole.
     *
     * @param tblRole the tblRole to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblRole,
     * or with status 400 (Bad Request) if the tblRole is not valid,
     * or with status 500 (Internal Server Error) if the tblRole couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-roles")
    @Timed
    public ResponseEntity<TblRole> updateTblRole(@Valid @RequestBody TblRole tblRole) throws URISyntaxException {
        log.debug("REST request to update TblRole : {}", tblRole);
        if (tblRole.getId() == null) {
            return createTblRole(tblRole);
        }
        TblRole result = tblRoleRepository.save(tblRole);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblRole.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-roles : get all the tblRoles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblRoles in body
     */
    @GetMapping("/tbl-roles")
    @Timed
    public List<TblRole> getAllTblRoles() {
        log.debug("REST request to get all TblRoles");
        return tblRoleRepository.findAll();
        }

    /**
     * GET  /tbl-roles/:id : get the "id" tblRole.
     *
     * @param id the id of the tblRole to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblRole, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-roles/{id}")
    @Timed
    public ResponseEntity<TblRole> getTblRole(@PathVariable Long id) {
        log.debug("REST request to get TblRole : {}", id);
        TblRole tblRole = tblRoleRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblRole));
    }

    /**
     * DELETE  /tbl-roles/:id : delete the "id" tblRole.
     *
     * @param id the id of the tblRole to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-roles/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblRole(@PathVariable Long id) {
        log.debug("REST request to delete TblRole : {}", id);
        tblRoleRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * GET  /tbl-roles : get all the getAllTblRolesAndTblUserByTblSchool.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblRoles in body
     */
    @GetMapping("/tbl-roles/schoolUserRoleByUser")
    @Timed
    public ResponseEntity<List<TblSchoolUserRoleDTO>> getTblSchoolUserRoleByUserId() {
        log.debug("REST request to get all getAllTblRolesAndTblUserByTblSchool");
        Long id = TokenDecode.decodeUser();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblRoleService.getTblSchoolUserRoleByUserId(id)));
    }

    /**
     * GET  /tbl-roles : get all the getTblSchoolUserRole.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblRoles in body
     */
    @GetMapping("/tbl-roles/schoolUserRole")
    @Timed
    public ResponseEntity<List<TblSchoolUserRoleDTO>> getTblSchoolUserRole() {
        log.debug("REST request to get all getTblSchoolUserRole");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblRoleService.getTblSchoolUserRole()));
    }

    /**
     * GET  /tbl-roles-user : get all the TblRoles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of TblRoles in body
     */
    @GetMapping("/tbl-roles/all")
    @Timed
    public List<TblRoleCrudUserDTO> getTblRoles() {
        log.debug("REST request to get all TblRoles");
        return tblRoleService.getAllTblRoles();
    }
}
