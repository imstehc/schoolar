package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblClassSubjectTeacher;
import br.com.positivo.schoolar.repository.TblClassSubjectTeacherRepository;
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
 * Test class for the TblClassSubjectTeacherResource REST controller.
 *
 * @see TblClassSubjectTeacherResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblClassSubjectTeacherResourceIntTest {

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblClassSubjectTeacherRepository tblClassSubjectTeacherRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblClassSubjectTeacherMockMvc;

    private TblClassSubjectTeacher tblClassSubjectTeacher;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblClassSubjectTeacherResource tblClassSubjectTeacherResource = new TblClassSubjectTeacherResource(tblClassSubjectTeacherRepository);
        this.restTblClassSubjectTeacherMockMvc = MockMvcBuilders.standaloneSetup(tblClassSubjectTeacherResource)
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
    public static TblClassSubjectTeacher createEntity(EntityManager em) {
        TblClassSubjectTeacher tblClassSubjectTeacher = new TblClassSubjectTeacher()
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblClassSubjectTeacher;
    }

    @Before
    public void initTest() {
        tblClassSubjectTeacher = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblClassSubjectTeacher() throws Exception {
        int databaseSizeBeforeCreate = tblClassSubjectTeacherRepository.findAll().size();

        // Create the TblClassSubjectTeacher
        restTblClassSubjectTeacherMockMvc.perform(post("/api/tbl-class-subject-teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClassSubjectTeacher)))
            .andExpect(status().isCreated());

        // Validate the TblClassSubjectTeacher in the database
        List<TblClassSubjectTeacher> tblClassSubjectTeacherList = tblClassSubjectTeacherRepository.findAll();
        assertThat(tblClassSubjectTeacherList).hasSize(databaseSizeBeforeCreate + 1);
        TblClassSubjectTeacher testTblClassSubjectTeacher = tblClassSubjectTeacherList.get(tblClassSubjectTeacherList.size() - 1);
        assertThat(testTblClassSubjectTeacher.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblClassSubjectTeacherWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblClassSubjectTeacherRepository.findAll().size();

        // Create the TblClassSubjectTeacher with an existing ID
        tblClassSubjectTeacher.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblClassSubjectTeacherMockMvc.perform(post("/api/tbl-class-subject-teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClassSubjectTeacher)))
            .andExpect(status().isBadRequest());

        // Validate the TblClassSubjectTeacher in the database
        List<TblClassSubjectTeacher> tblClassSubjectTeacherList = tblClassSubjectTeacherRepository.findAll();
        assertThat(tblClassSubjectTeacherList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblClassSubjectTeachers() throws Exception {
        // Initialize the database
        tblClassSubjectTeacherRepository.saveAndFlush(tblClassSubjectTeacher);

        // Get all the tblClassSubjectTeacherList
        restTblClassSubjectTeacherMockMvc.perform(get("/api/tbl-class-subject-teachers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblClassSubjectTeacher.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblClassSubjectTeacher() throws Exception {
        // Initialize the database
        tblClassSubjectTeacherRepository.saveAndFlush(tblClassSubjectTeacher);

        // Get the tblClassSubjectTeacher
        restTblClassSubjectTeacherMockMvc.perform(get("/api/tbl-class-subject-teachers/{id}", tblClassSubjectTeacher.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblClassSubjectTeacher.getId().intValue()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblClassSubjectTeacher() throws Exception {
        // Get the tblClassSubjectTeacher
        restTblClassSubjectTeacherMockMvc.perform(get("/api/tbl-class-subject-teachers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblClassSubjectTeacher() throws Exception {
        // Initialize the database
        tblClassSubjectTeacherRepository.saveAndFlush(tblClassSubjectTeacher);
        int databaseSizeBeforeUpdate = tblClassSubjectTeacherRepository.findAll().size();

        // Update the tblClassSubjectTeacher
        TblClassSubjectTeacher updatedTblClassSubjectTeacher = tblClassSubjectTeacherRepository.findOne(tblClassSubjectTeacher.getId());
        // Disconnect from session so that the updates on updatedTblClassSubjectTeacher are not directly saved in db
        em.detach(updatedTblClassSubjectTeacher);
        updatedTblClassSubjectTeacher
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblClassSubjectTeacherMockMvc.perform(put("/api/tbl-class-subject-teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblClassSubjectTeacher)))
            .andExpect(status().isOk());

        // Validate the TblClassSubjectTeacher in the database
        List<TblClassSubjectTeacher> tblClassSubjectTeacherList = tblClassSubjectTeacherRepository.findAll();
        assertThat(tblClassSubjectTeacherList).hasSize(databaseSizeBeforeUpdate);
        TblClassSubjectTeacher testTblClassSubjectTeacher = tblClassSubjectTeacherList.get(tblClassSubjectTeacherList.size() - 1);
        assertThat(testTblClassSubjectTeacher.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblClassSubjectTeacher() throws Exception {
        int databaseSizeBeforeUpdate = tblClassSubjectTeacherRepository.findAll().size();

        // Create the TblClassSubjectTeacher

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblClassSubjectTeacherMockMvc.perform(put("/api/tbl-class-subject-teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClassSubjectTeacher)))
            .andExpect(status().isCreated());

        // Validate the TblClassSubjectTeacher in the database
        List<TblClassSubjectTeacher> tblClassSubjectTeacherList = tblClassSubjectTeacherRepository.findAll();
        assertThat(tblClassSubjectTeacherList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblClassSubjectTeacher() throws Exception {
        // Initialize the database
        tblClassSubjectTeacherRepository.saveAndFlush(tblClassSubjectTeacher);
        int databaseSizeBeforeDelete = tblClassSubjectTeacherRepository.findAll().size();

        // Get the tblClassSubjectTeacher
        restTblClassSubjectTeacherMockMvc.perform(delete("/api/tbl-class-subject-teachers/{id}", tblClassSubjectTeacher.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblClassSubjectTeacher> tblClassSubjectTeacherList = tblClassSubjectTeacherRepository.findAll();
        assertThat(tblClassSubjectTeacherList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblClassSubjectTeacher.class);
        TblClassSubjectTeacher tblClassSubjectTeacher1 = new TblClassSubjectTeacher();
        tblClassSubjectTeacher1.setId(1L);
        TblClassSubjectTeacher tblClassSubjectTeacher2 = new TblClassSubjectTeacher();
        tblClassSubjectTeacher2.setId(tblClassSubjectTeacher1.getId());
        assertThat(tblClassSubjectTeacher1).isEqualTo(tblClassSubjectTeacher2);
        tblClassSubjectTeacher2.setId(2L);
        assertThat(tblClassSubjectTeacher1).isNotEqualTo(tblClassSubjectTeacher2);
        tblClassSubjectTeacher1.setId(null);
        assertThat(tblClassSubjectTeacher1).isNotEqualTo(tblClassSubjectTeacher2);
    }
}
