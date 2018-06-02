package br.com.positivo.schoolar.util;

import com.github.springtestdbunit.dataset.AbstractDataSetLoader;
import org.dbunit.dataset.IDataSet;
import org.jboss.arquillian.persistence.dbunit.dataset.yaml.YamlDataSet;
import org.springframework.core.io.Resource;

/**
 * copied by diego.freitas on 10/01/2017.
 */
public class YamlDataSetLoader extends AbstractDataSetLoader {
    protected IDataSet createDataSet(Resource resource) throws Exception {
        return new YamlDataSet(resource.getInputStream());
    }
}
