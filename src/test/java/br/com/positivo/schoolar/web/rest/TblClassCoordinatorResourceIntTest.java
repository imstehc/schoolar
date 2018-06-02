package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblClassCoordinator;
import br.com.positivo.schoolar.repository.TblClassCoordinatorRepository;
import br.com.positivo.schoolar.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static br.com.positivo.schoolar.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TblClassCoordinatorResource REST controller.
 *
 * @see TblClassCoordinatorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblClassCoordinatorResourceIntTest {

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblClassCoordinatorRepository tblClassCoordinatorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblClassCoordinatorMockMvc;

    private TblClassCoordinator tblClassCoordinator;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblClassCoordinatorResource tblClassCoordinatorResource = new TblClassCoordinatorResource(tblClassCoordinatorRepository);
        this.restTblClassCoordinatorMockMvc = MockMvcBuilders.standaloneSetup(tblClassCoordinatorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TblClassCoordinator createEntity(EntityManager em) {
        TblClassCoordinator tblClassCoordinator = new TblClassCoordinator()
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblClassCoordinator;
    }

    @Before
    public void initTest() {
        tblClassCoordinator = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblClassCoordinator() throws Exception {
        int databaseSizeBeforeCreate = tblClassCoordinatorRepository.findAll().size();

        // Create the TblClassCoordinator
        restTblClassCoordinatorMockMvc.perform(post("/api/tbl-class-coordinators")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClassCoordinator)))
            .andExpect(status().isCreated());

        // Validate the TblClassCoordinator in the database
        List<TblClassCoordinator> tblClassCoordinatorList = tblClassCoordinatorRepository.findAll();
        assertThat(tblClassCoordinatorList).hasSize(databaseSizeBeforeCreate + 1);
        TblClassCoordinator testTblClassCoordinator = tblClassCoordinatorList.get(tblClassCoordinatorList.size() - 1);
        assertThat(testTblClassCoordinator.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblClassCoordinatorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblClassCoordinatorRepository.findAll().size();

        // Create the TblClassCoordinator with an existing ID
        tblClassCoordinator.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblClassCoordinatorMockMvc.perform(post("/api/tbl-class-coordinators")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClassCoordinator)))
            .andExpect(status().isBadRequest());

        // Validate the TblClassCoordinator in the database
        List<TblClassCoordinator> tblClassCoordinatorList = tblClassCoordinatorRepository.findAll();
        assertThat(tblClassCoordinatorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblClassCoordinators() throws Exception {
        // Initialize the database
        tblClassCoordinatorRepository.saveAndFlush(tblClassCoordinator);

        // Get all the tblClassCoordinatorList
        restTblClassCoordinatorMockMvc.perform(get("/api/tbl-class-coordinators?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblClassCoordinator.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblClassCoordinator() throws Exception {
        // Initialize the database
        tblClassCoordinatorRepository.saveAndFlush(tblClassCoordinator);

        // Get the tblClassCoordinator
        restTblClassCoordinatorMockMvc.perform(get("/api/tbl-class-coordinators/{id}", tblClassCoordinator.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblClassCoordinator.getId().intValue()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblClassCoordinator() throws Exception {
        // Get the tblClassCoordinator
        restTblClassCoordinatorMockMvc.perform(get("/api/tbl-class-coordinators/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblClassCoordinator() throws Exception {
        // Initialize the database
        tblClassCoordinatorRepository.saveAndFlush(tblClassCoordinator);
        int databaseSizeBeforeUpdate = tblClassCoordinatorRepository.findAll().size();

        // Update the tblClassCoordinator
        TblClassCoordinator updatedTblClassCoordinator = tblClassCoordinatorRepository.findOne(tblClassCoordinator.getId());
        // Disconnect from session so that the updates on updatedTblClassCoordinator are not directly saved in db
        em.detach(updatedTblClassCoordinator);
        updatedTblClassCoordinator
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblClassCoordinatorMockMvc.perform(put("/api/tbl-class-coordinators")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblClassCoordinator)))
            .andExpect(status().isOk());

        // Validate the TblClassCoordinator in the database
        List<TblClassCoordinator> tblClassCoordinatorList = tblClassCoordinatorRepository.findAll();
        assertThat(tblClassCoordinatorList).hasSize(databaseSizeBeforeUpdate);
        TblClassCoordinator testTblClassCoordinator = tblClassCoordinatorList.get(tblClassCoordinatorList.size() - 1);
        assertThat(testTblClassCoordinator.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblClassCoordinator() throws Exception {
        int databaseSizeBeforeUpdate = tblClassCoordinatorRepository.findAll().size();

        // Create the TblClassCoordinator

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblClassCoordinatorMockMvc.perform(put("/api/tbl-class-coordinators")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClassCoordinator)))
            .andExpect(status().isCreated());

        // Validate the TblClassCoordinator in the database
        List<TblClassCoordinator> tblClassCoordinatorList = tblClassCoordinatorRepository.findAll();
        assertThat(tblClassCoordinatorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblClassCoordinator() throws Exception {
        // Initialize the database
        tblClassCoordinatorRepository.saveAndFlush(tblClassCoordinator);
        int databaseSizeBeforeDelete = tblClassCoordinatorRepository.findAll().size();

        // Get the tblClassCoordinator
        restTblClassCoordinatorMockMvc.perform(delete("/api/tbl-class-coordinators/{id}", tblClassCoordinator.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblClassCoordinator> tblClassCoordinatorList = tblClassCoordinatorRepository.findAll();
        assertThat(tblClassCoordinatorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblClassCoordinator.class);
        TblClassCoordinator tblClassCoordinator1 = new TblClassCoordinator();
        tblClassCoordinator1.setId(1L);
        TblClassCoordinator tblClassCoordinator2 = new TblClassCoordinator();
        tblClassCoordinator2.setId(tblClassCoordinator1.getId());
        assertThat(tblClassCoordinator1).isEqualTo(tblClassCoordinator2);
        tblClassCoordinator2.setId(2L);
        assertThat(tblClassCoordinator1).isNotEqualTo(tblClassCoordinator2);
        tblClassCoordinator1.setId(null);
        assertThat(tblClassCoordinator1).isNotEqualTo(tblClassCoordinator2);
    }
}
