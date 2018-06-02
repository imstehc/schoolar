package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.domain.TblUser;
import br.com.positivo.schoolar.repository.TblUserRepository;
import br.com.positivo.schoolar.security.jwt.TokenDecode;
import br.com.positivo.schoolar.service.TblUserService;
import br.com.positivo.schoolar.service.UAAService;
import br.com.positivo.schoolar.service.dto.*;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.QueryParam;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing TblUser.
 */
@RestController
@RequestMapping("/api")
public class TblUserResource {

    private final Logger log = LoggerFactory.getLogger(TblUserResource.class);

    private static final String ENTITY_NAME = "tblUser";

    private final TblUserRepository tblUserRepository;

    @Autowired
    private TblUserService tblUserService;

    @Autowired
    private UAAService uaaService;

    public TblUserResource(TblUserRepository tblUserRepository) {
        this.tblUserRepository = tblUserRepository;
    }

    /**
     * POST  /tbl-users : Create a new tblUserDTO.
     *
     * @param tblUserDTO the tblUserDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblUserDTO, or with status 400 (Bad Request) if the tblUserDTO has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-users")
    @Timed
    public ResponseEntity<TblUser> createTblUser(@Valid @RequestBody TblUserDTO tblUserDTO) throws URISyntaxException {
        log.debug("REST request to save TblUser : {}", tblUserDTO);
        if (tblUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new tblUserDTO cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblUser result = tblUserService.save(tblUserDTO);
        return ResponseEntity.created(new URI("/api/tbl-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-users : Updates an existing tblUser.
     *
     * @param tblUserDTO the tblUserDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblUser,
     * or with status 400 (Bad Request) if the tblUser is not valid,
     * or with status 500 (Internal Server Error) if the tblUserDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-users")
    @Timed
    public ResponseEntity<TblUser> updateTblUser(@Valid @RequestBody TblUserDTO tblUserDTO) throws URISyntaxException {
        log.debug("REST request to update TblUser : {}", tblUserDTO);
        if (tblUserDTO.getId() == null) {
            return createTblUser(tblUserDTO);
        }
        TblUser result = tblUserService.save(tblUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-users/:name/:limit : get the "name" and "limit" tblUsers.
     * @param name the name of the tblUser to retrieve
     * @param limit the limit of the tblUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchool, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-users-name/{name}/{limit}")
    @Timed
    public List<TblUserDTO> getTblUserName(@PathVariable String name, @PathVariable Integer limit) {
        log.debug("REST request to get TblUserDTO : {}", name);
        log.debug("REST request to get TblUserDTO : {}", limit);

        Pageable topElements = new PageRequest(0, limit);
        return tblUserService.findAllUsersWhereName(name, topElements);
    }

    /**
     * GET  /tbl-users : get all the tblUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblUsers in body
     */
    @GetMapping("/tbl-users")
    @Timed
    public Page<TblUser> getAllTblUsers(@QueryParam("filter") @DefaultValue("%%%") String filter,
                                        @QueryParam("page") @DefaultValue("0") int page,
                                        @QueryParam("size") @DefaultValue("10") int size) {
        log.debug("REST request to get all TblUsers");
        return tblUserRepository.findAllPaginated(filter,new PageRequest(page, size));
    }

    /**
     * GET  /tbl-users/:id : get the "id" tblUser.
     *
     * @param id the id of the tblUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblUser, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-users/{id}")
    @Timed
    public ResponseEntity<TblUser> getTblUser(@PathVariable Long id) {
        log.debug("REST request to get TblUser : {}", id);
        TblUser tblUser = tblUserRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblUser));
    }

    /**
     * DELETE  /tbl-users/:id : delete the "id" tblUser.
     *
     * @param id the id of the tblUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblUser(@PathVariable Long id) {
        log.debug("REST request to delete TblUser : {}", id);
        tblUserService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * GET  /tbl-guardians : get List all dependents from tblUser by tblGuardian.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dependents from TblUser by tblGuardian in body
     * http://git.fpf.br/positivo/smartcampus/issues/785
     * https://private-eac50-mateus.apiary-mock.com/dependent/byGuardian
     */
    @GetMapping("/tbl-users/guardian/{id}/dependents")
    @Timed
    public ResponseEntity<List<TblUserNFCDTO>> getAllDependentsByGuardianId(@PathVariable final Long id) {
        log.debug("REST request to get all dependents by TblGuardian");
        return  ResponseUtil.wrapOrNotFound(Optional.ofNullable(this.tblUserService.getAllDependentsByGuardianId(id)));
    }

    /**
     * GET  /tbl-users/bynfcid : get tblUser by Nfc ID.
     *
     * @return the ResponseEntity with status 200 (OK) and TblUser by Nfc ID in body
     * http://git.fpf.br/positivo/smartcampus/issues/786
     * https://private-eac50-mateus.apiary-mock.com/user/byNfcId
     */
    @GetMapping("/tbl-users/bynfcid/{nfcId}")
    @Timed
    public ResponseEntity<TblUserNFCDTO> getTblUserByNfcId(@PathVariable final String nfcId) {
        log.debug("REST request to get tblUser by Nfc ID");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(this.tblUserService.getTblUserByNfcId(nfcId)));
    }

    /**
     *
     * @param ids
     * @return
     * http://git.fpf.br/positivo/smartcampus/issues/801
     * https://private-eac50-mateus.apiary-mock.com/user/byListId
     */
    @GetMapping("/user")
    @Timed
    public ResponseEntity<List<TblUserNFCDTO>> getUsersByIds(@RequestParam(value = "ids") final Set<Long> ids) {
        log.debug("REST request to get List<TblUserNFCDTO> by ids");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(this.tblUserService.getUsersByIds(ids)));
    }

    @GetMapping("/tbl-users/byid/{id}")
    @Timed
    public ResponseEntity<TblUserNFCDTO> getTblUserByUserId(@PathVariable final Long id) {
        log.debug("REST request to get tblUser by id");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(this.tblUserService.getTblUserByUserId(id)));
    }

    @GetMapping("/tbl-users/uaa/logins/{schoolarUserId}")
    @Timed
    public List<TblLoginDTO> getUserLoginsUAA(@PathVariable final Long schoolarUserId) {
        log.debug("REST request to get UAA jhi_user : {}", schoolarUserId);
        return ResponseEntity.ok((uaaService.getUserLoginsUAA(schoolarUserId))).getBody();
    }

    /**
     * PUT  /reset-password-by-user/:schoolarUserId : get the "schoolarUserId" User.
     *
     * @param uaaUserId the id of the User to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jhi_user, or with status 404 (Not Found)
     */
    @PutMapping("/tbl-users/uaa/reset-password-by-user/{uaaUserId}/{newPassword}")
    @Timed
    public ResponseEntity<UserDTO> resetPasswordUserUAA(@PathVariable Long uaaUserId, @PathVariable String newPassword) throws Exception {
        log.debug("REST put to reset password jhi_user : {}", uaaUserId);

        return ResponseEntity.ok((uaaService.resetPasswordUserId(uaaUserId, newPassword))).getBody();
    }

    /**
     * GET  /tbl-schools : get all the tblSchools by UserId.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchools in body
     */
    @GetMapping("/tbl-users/tbl-schools/logged")
    @Timed
    public List<TblSchoolCrudUserDTO> getAllTblSchoolsByUserLogged() {
        log.debug("REST request to get all TblSchools by UserId");
        Long id = TokenDecode.decodeUser();
        return tblUserService.getTblSchoolByUserId(id);
    }

    /**
     * GET  /tbl-schools : get all the tblSchools by UserId.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchools in body
     */
    @GetMapping("/tbl-users/user-edit/{idEdit}")
    @Timed
    public List<TblSchoolCrudUserDTO> getAllTblSchoolsByUserEdit(@PathVariable Long idEdit) {
        log.debug("REST request to get all TblSchools by UserId");
        Long idLogged = TokenDecode.decodeUser();
        return tblUserService.getTblSchoolByUserEdit(idEdit, idLogged);
    }
}
