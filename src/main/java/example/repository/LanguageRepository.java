package example.repository;

import example.model.Language;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LanguageRepository extends PagingAndSortingRepository<Language, Integer> {

}
