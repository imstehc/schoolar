package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblAddress;
import br.com.positivo.schoolar.repository.TblAddressRepository;
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
 * Test class for the TblAddressResource REST controller.
 *
 * @see TblAddressResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblAddressResourceIntTest {

    private static final String DEFAULT_STR_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_STR_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_STR_POST_CODE = "AAAAAAAAAA";
    private static final String UPDATED_STR_POST_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_STR_STREET = "AAAAAAAAAA";
    private static final String UPDATED_STR_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_STR_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_STR_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_STR_NEIGHBORHOOD = "AAAAAAAAAA";
    private static final String UPDATED_STR_NEIGHBORHOOD = "BBBBBBBBBB";

    private static final String DEFAULT_STR_COMPLEMENT = "AAAAAAAAAA";
    private static final String UPDATED_STR_COMPLEMENT = "BBBBBBBBBB";

    private static final String DEFAULT_STR_CITY = "AAAAAAAAAA";
    private static final String UPDATED_STR_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_STR_STATE = "AA";
    private static final String UPDATED_STR_STATE = "BB";

    private static final String DEFAULT_STR_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_STR_COUNTRY = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_CREATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblAddressRepository tblAddressRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblAddressMockMvc;

    private TblAddress tblAddress;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblAddressResource tblAddressResource = new TblAddressResource(tblAddressRepository);
        this.restTblAddressMockMvc = MockMvcBuilders.standaloneSetup(tblAddressResource)
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
    public static TblAddress createEntity(EntityManager em) {
        TblAddress tblAddress = new TblAddress()
            .strLabel(DEFAULT_STR_LABEL)
            .strPostCode(DEFAULT_STR_POST_CODE)
            .strStreet(DEFAULT_STR_STREET)
            .strNumber(DEFAULT_STR_NUMBER)
            .strNeighborhood(DEFAULT_STR_NEIGHBORHOOD)
            .strComplement(DEFAULT_STR_COMPLEMENT)
            .strCity(DEFAULT_STR_CITY)
            .strState(DEFAULT_STR_STATE)
            .strCountry(DEFAULT_STR_COUNTRY)
            .dtmCreate(DEFAULT_DTM_CREATE)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblAddress;
    }

    @Before
    public void initTest() {
        tblAddress = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblAddress() throws Exception {
        int databaseSizeBeforeCreate = tblAddressRepository.findAll().size();

        // Create the TblAddress
        restTblAddressMockMvc.perform(post("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAddress)))
            .andExpect(status().isCreated());

        // Validate the TblAddress in the database
        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeCreate + 1);
        TblAddress testTblAddress = tblAddressList.get(tblAddressList.size() - 1);
        assertThat(testTblAddress.getStrLabel()).isEqualTo(DEFAULT_STR_LABEL);
        assertThat(testTblAddress.getStrPostCode()).isEqualTo(DEFAULT_STR_POST_CODE);
        assertThat(testTblAddress.getStrStreet()).isEqualTo(DEFAULT_STR_STREET);
        assertThat(testTblAddress.getStrNumber()).isEqualTo(DEFAULT_STR_NUMBER);
        assertThat(testTblAddress.getStrNeighborhood()).isEqualTo(DEFAULT_STR_NEIGHBORHOOD);
        assertThat(testTblAddress.getStrComplement()).isEqualTo(DEFAULT_STR_COMPLEMENT);
        assertThat(testTblAddress.getStrCity()).isEqualTo(DEFAULT_STR_CITY);
        assertThat(testTblAddress.getStrState()).isEqualTo(DEFAULT_STR_STATE);
        assertThat(testTblAddress.getStrCountry()).isEqualTo(DEFAULT_STR_COUNTRY);
        assertThat(testTblAddress.getDtmCreate()).isEqualTo(DEFAULT_DTM_CREATE);
        assertThat(testTblAddress.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblAddress.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblAddressWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblAddressRepository.findAll().size();

        // Create the TblAddress with an existing ID
        tblAddress.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblAddressMockMvc.perform(post("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAddress)))
            .andExpect(status().isBadRequest());

        // Validate the TblAddress in the database
        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAddressRepository.findAll().size();
        // set the field null
        tblAddress.setStrLabel(null);

        // Create the TblAddress, which fails.

        restTblAddressMockMvc.perform(post("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAddress)))
            .andExpect(status().isBadRequest());

        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrStreetIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAddressRepository.findAll().size();
        // set the field null
        tblAddress.setStrStreet(null);

        // Create the TblAddress, which fails.

        restTblAddressMockMvc.perform(post("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAddress)))
            .andExpect(status().isBadRequest());

        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAddressRepository.findAll().size();
        // set the field null
        tblAddress.setStrCity(null);

        // Create the TblAddress, which fails.

        restTblAddressMockMvc.perform(post("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAddress)))
            .andExpect(status().isBadRequest());

        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAddressRepository.findAll().size();
        // set the field null
        tblAddress.setStrState(null);

        // Create the TblAddress, which fails.

        restTblAddressMockMvc.perform(post("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAddress)))
            .andExpect(status().isBadRequest());

        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAddressRepository.findAll().size();
        // set the field null
        tblAddress.setStrCountry(null);

        // Create the TblAddress, which fails.

        restTblAddressMockMvc.perform(post("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAddress)))
            .andExpect(status().isBadRequest());

        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDtmCreateIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAddressRepository.findAll().size();
        // set the field null
        tblAddress.setDtmCreate(null);

        // Create the TblAddress, which fails.

        restTblAddressMockMvc.perform(post("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAddress)))
            .andExpect(status().isBadRequest());

        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAddressRepository.findAll().size();
        // set the field null
        tblAddress.setIntExcluded(null);

        // Create the TblAddress, which fails.

        restTblAddressMockMvc.perform(post("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAddress)))
            .andExpect(status().isBadRequest());

        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblAddresses() throws Exception {
        // Initialize the database
        tblAddressRepository.saveAndFlush(tblAddress);

        // Get all the tblAddressList
        restTblAddressMockMvc.perform(get("/api/tbl-addresses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblAddress.getId().intValue())))
            .andExpect(jsonPath("$.[*].strLabel").value(hasItem(DEFAULT_STR_LABEL.toString())))
            .andExpect(jsonPath("$.[*].strPostCode").value(hasItem(DEFAULT_STR_POST_CODE.toString())))
            .andExpect(jsonPath("$.[*].strStreet").value(hasItem(DEFAULT_STR_STREET.toString())))
            .andExpect(jsonPath("$.[*].strNumber").value(hasItem(DEFAULT_STR_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].strNeighborhood").value(hasItem(DEFAULT_STR_NEIGHBORHOOD.toString())))
            .andExpect(jsonPath("$.[*].strComplement").value(hasItem(DEFAULT_STR_COMPLEMENT.toString())))
            .andExpect(jsonPath("$.[*].strCity").value(hasItem(DEFAULT_STR_CITY.toString())))
            .andExpect(jsonPath("$.[*].strState").value(hasItem(DEFAULT_STR_STATE.toString())))
            .andExpect(jsonPath("$.[*].strCountry").value(hasItem(DEFAULT_STR_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].dtmCreate").value(hasItem(DEFAULT_DTM_CREATE.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblAddress() throws Exception {
        // Initialize the database
        tblAddressRepository.saveAndFlush(tblAddress);

        // Get the tblAddress
        restTblAddressMockMvc.perform(get("/api/tbl-addresses/{id}", tblAddress.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblAddress.getId().intValue()))
            .andExpect(jsonPath("$.strLabel").value(DEFAULT_STR_LABEL.toString()))
            .andExpect(jsonPath("$.strPostCode").value(DEFAULT_STR_POST_CODE.toString()))
            .andExpect(jsonPath("$.strStreet").value(DEFAULT_STR_STREET.toString()))
            .andExpect(jsonPath("$.strNumber").value(DEFAULT_STR_NUMBER.toString()))
            .andExpect(jsonPath("$.strNeighborhood").value(DEFAULT_STR_NEIGHBORHOOD.toString()))
            .andExpect(jsonPath("$.strComplement").value(DEFAULT_STR_COMPLEMENT.toString()))
            .andExpect(jsonPath("$.strCity").value(DEFAULT_STR_CITY.toString()))
            .andExpect(jsonPath("$.strState").value(DEFAULT_STR_STATE.toString()))
            .andExpect(jsonPath("$.strCountry").value(DEFAULT_STR_COUNTRY.toString()))
            .andExpect(jsonPath("$.dtmCreate").value(DEFAULT_DTM_CREATE.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblAddress() throws Exception {
        // Get the tblAddress
        restTblAddressMockMvc.perform(get("/api/tbl-addresses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblAddress() throws Exception {
        // Initialize the database
        tblAddressRepository.saveAndFlush(tblAddress);
        int databaseSizeBeforeUpdate = tblAddressRepository.findAll().size();

        // Update the tblAddress
        TblAddress updatedTblAddress = tblAddressRepository.findOne(tblAddress.getId());
        // Disconnect from session so that the updates on updatedTblAddress are not directly saved in db
        em.detach(updatedTblAddress);
        updatedTblAddress
            .strLabel(UPDATED_STR_LABEL)
            .strPostCode(UPDATED_STR_POST_CODE)
            .strStreet(UPDATED_STR_STREET)
            .strNumber(UPDATED_STR_NUMBER)
            .strNeighborhood(UPDATED_STR_NEIGHBORHOOD)
            .strComplement(UPDATED_STR_COMPLEMENT)
            .strCity(UPDATED_STR_CITY)
            .strState(UPDATED_STR_STATE)
            .strCountry(UPDATED_STR_COUNTRY)
            .dtmCreate(UPDATED_DTM_CREATE)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblAddressMockMvc.perform(put("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblAddress)))
            .andExpect(status().isOk());

        // Validate the TblAddress in the database
        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeUpdate);
        TblAddress testTblAddress = tblAddressList.get(tblAddressList.size() - 1);
        assertThat(testTblAddress.getStrLabel()).isEqualTo(UPDATED_STR_LABEL);
        assertThat(testTblAddress.getStrPostCode()).isEqualTo(UPDATED_STR_POST_CODE);
        assertThat(testTblAddress.getStrStreet()).isEqualTo(UPDATED_STR_STREET);
        assertThat(testTblAddress.getStrNumber()).isEqualTo(UPDATED_STR_NUMBER);
        assertThat(testTblAddress.getStrNeighborhood()).isEqualTo(UPDATED_STR_NEIGHBORHOOD);
        assertThat(testTblAddress.getStrComplement()).isEqualTo(UPDATED_STR_COMPLEMENT);
        assertThat(testTblAddress.getStrCity()).isEqualTo(UPDATED_STR_CITY);
        assertThat(testTblAddress.getStrState()).isEqualTo(UPDATED_STR_STATE);
        assertThat(testTblAddress.getStrCountry()).isEqualTo(UPDATED_STR_COUNTRY);
        assertThat(testTblAddress.getDtmCreate()).isEqualTo(UPDATED_DTM_CREATE);
        assertThat(testTblAddress.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblAddress.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblAddress() throws Exception {
        int databaseSizeBeforeUpdate = tblAddressRepository.findAll().size();

        // Create the TblAddress

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblAddressMockMvc.perform(put("/api/tbl-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAddress)))
            .andExpect(status().isCreated());

        // Validate the TblAddress in the database
        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblAddress() throws Exception {
        // Initialize the database
        tblAddressRepository.saveAndFlush(tblAddress);
        int databaseSizeBeforeDelete = tblAddressRepository.findAll().size();

        // Get the tblAddress
        restTblAddressMockMvc.perform(delete("/api/tbl-addresses/{id}", tblAddress.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblAddress> tblAddressList = tblAddressRepository.findAll();
        assertThat(tblAddressList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblAddress.class);
        TblAddress tblAddress1 = new TblAddress();
        tblAddress1.setId(1L);
        TblAddress tblAddress2 = new TblAddress();
        tblAddress2.setId(tblAddress1.getId());
        assertThat(tblAddress1).isEqualTo(tblAddress2);
        tblAddress2.setId(2L);
        assertThat(tblAddress1).isNotEqualTo(tblAddress2);
        tblAddress1.setId(null);
        assertThat(tblAddress1).isNotEqualTo(tblAddress2);
    }
}
