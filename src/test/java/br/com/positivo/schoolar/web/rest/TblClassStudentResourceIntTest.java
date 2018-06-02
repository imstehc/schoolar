package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblClassStudent;
import br.com.positivo.schoolar.repository.TblClassStudentRepository;
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
 * Test class for the TblClassStudentResource REST controller.
 *
 * @see TblClassStudentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblClassStudentResourceIntTest {

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblClassStudentRepository tblClassStudentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblClassStudentMockMvc;

    private TblClassStudent tblClassStudent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblClassStudentResource tblClassStudentResource = new TblClassStudentResource(tblClassStudentRepository);
        this.restTblClassStudentMockMvc = MockMvcBuilders.standaloneSetup(tblClassStudentResource)
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
    public static TblClassStudent createEntity(EntityManager em) {
        TblClassStudent tblClassStudent = new TblClassStudent()
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblClassStudent;
    }

    @Before
    public void initTest() {
        tblClassStudent = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblClassStudent() throws Exception {
        int databaseSizeBeforeCreate = tblClassStudentRepository.findAll().size();

        // Create the TblClassStudent
        restTblClassStudentMockMvc.perform(post("/api/tbl-class-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClassStudent)))
            .andExpect(status().isCreated());

        // Validate the TblClassStudent in the database
        List<TblClassStudent> tblClassStudentList = tblClassStudentRepository.findAll();
        assertThat(tblClassStudentList).hasSize(databaseSizeBeforeCreate + 1);
        TblClassStudent testTblClassStudent = tblClassStudentList.get(tblClassStudentList.size() - 1);
        assertThat(testTblClassStudent.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblClassStudentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblClassStudentRepository.findAll().size();

        // Create the TblClassStudent with an existing ID
        tblClassStudent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblClassStudentMockMvc.perform(post("/api/tbl-class-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClassStudent)))
            .andExpect(status().isBadRequest());

        // Validate the TblClassStudent in the database
        List<TblClassStudent> tblClassStudentList = tblClassStudentRepository.findAll();
        assertThat(tblClassStudentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblClassStudents() throws Exception {
        // Initialize the database
        tblClassStudentRepository.saveAndFlush(tblClassStudent);

        // Get all the tblClassStudentList
        restTblClassStudentMockMvc.perform(get("/api/tbl-class-students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblClassStudent.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblClassStudent() throws Exception {
        // Initialize the database
        tblClassStudentRepository.saveAndFlush(tblClassStudent);

        // Get the tblClassStudent
        restTblClassStudentMockMvc.perform(get("/api/tbl-class-students/{id}", tblClassStudent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblClassStudent.getId().intValue()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblClassStudent() throws Exception {
        // Get the tblClassStudent
        restTblClassStudentMockMvc.perform(get("/api/tbl-class-students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblClassStudent() throws Exception {
        // Initialize the database
        tblClassStudentRepository.saveAndFlush(tblClassStudent);
        int databaseSizeBeforeUpdate = tblClassStudentRepository.findAll().size();

        // Update the tblClassStudent
        TblClassStudent updatedTblClassStudent = tblClassStudentRepository.findOne(tblClassStudent.getId());
        // Disconnect from session so that the updates on updatedTblClassStudent are not directly saved in db
        em.detach(updatedTblClassStudent);
        updatedTblClassStudent
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblClassStudentMockMvc.perform(put("/api/tbl-class-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblClassStudent)))
            .andExpect(status().isOk());

        // Validate the TblClassStudent in the database
        List<TblClassStudent> tblClassStudentList = tblClassStudentRepository.findAll();
        assertThat(tblClassStudentList).hasSize(databaseSizeBeforeUpdate);
        TblClassStudent testTblClassStudent = tblClassStudentList.get(tblClassStudentList.size() - 1);
        assertThat(testTblClassStudent.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblClassStudent() throws Exception {
        int databaseSizeBeforeUpdate = tblClassStudentRepository.findAll().size();

        // Create the TblClassStudent

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblClassStudentMockMvc.perform(put("/api/tbl-class-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClassStudent)))
            .andExpect(status().isCreated());

        // Validate the TblClassStudent in the database
        List<TblClassStudent> tblClassStudentList = tblClassStudentRepository.findAll();
        assertThat(tblClassStudentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblClassStudent() throws Exception {
        // Initialize the database
        tblClassStudentRepository.saveAndFlush(tblClassStudent);
        int databaseSizeBeforeDelete = tblClassStudentRepository.findAll().size();

        // Get the tblClassStudent
        restTblClassStudentMockMvc.perform(delete("/api/tbl-class-students/{id}", tblClassStudent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblClassStudent> tblClassStudentList = tblClassStudentRepository.findAll();
        assertThat(tblClassStudentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblClassStudent.class);
        TblClassStudent tblClassStudent1 = new TblClassStudent();
        tblClassStudent1.setId(1L);
        TblClassStudent tblClassStudent2 = new TblClassStudent();
        tblClassStudent2.setId(tblClassStudent1.getId());
        assertThat(tblClassStudent1).isEqualTo(tblClassStudent2);
        tblClassStudent2.setId(2L);
        assertThat(tblClassStudent1).isNotEqualTo(tblClassStudent2);
        tblClassStudent1.setId(null);
        assertThat(tblClassStudent1).isNotEqualTo(tblClassStudent2);
    }
}
