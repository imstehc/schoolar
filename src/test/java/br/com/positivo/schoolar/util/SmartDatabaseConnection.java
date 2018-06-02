package br.com.positivo.schoolar.util;

import lombok.Getter;
import org.dbunit.database.DatabaseConfig;
import org.dbunit.database.DatabaseDataSourceConnection;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.ext.postgresql.PostgresqlDataTypeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

/**
 * Created by fsupi on 25/08/17.
 */
@Component
public class SmartDatabaseConnection {

    @Getter
    @Autowired
    private JdbcTemplate template;

    @Autowired
    private DataSource dataSource;

    @Bean("smartDatadabaseConnection")
    public IDatabaseConnection create() {
        try {
            IDatabaseConnection databaseConnection = new DatabaseDataSourceConnection(dataSource);
            DatabaseConfig config = databaseConnection.getConfig();
            config.setProperty(DatabaseConfig.FEATURE_QUALIFIED_TABLE_NAMES, true);
            config.setProperty(DatabaseConfig.PROPERTY_DATATYPE_FACTORY, new PostgresqlDataTypeFactory());
            return databaseConnection;
        } catch( Exception e) {
            throw new RuntimeException("Problem found");
        }
    }


}
