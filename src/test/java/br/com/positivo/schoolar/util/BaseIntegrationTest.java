package br.com.positivo.schoolar.util;

import br.com.positivo.schoolar.SchoolarApp;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DbUnitConfiguration;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

/**
 * Created by fsupi on 27/03/18.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
    properties = { "management.port=0", "management.context-path=/management" })
@TestExecutionListeners({
    DependencyInjectionTestExecutionListener.class,
    DirtiesContextTestExecutionListener.class,
    TransactionalTestExecutionListener.class,
    DbUnitTestExecutionListener.class
})
@ContextConfiguration
@DbUnitConfiguration(databaseConnection = "smartDatadabaseConnection", dataSetLoader = YamlDataSetLoader.class)
@ComponentScan(basePackages = "br.com.positivo.schoolar")
public abstract class BaseIntegrationTest {

    @Before
    public void setup() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        JacksonTester.initFields(this, objectMapper);
    }
}
