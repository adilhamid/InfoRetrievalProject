import wiki_trivia_metric_calculator
import wiki_parser

if __name__ == "__main__":
    test = wiki_trivia_metric_calculator.WikiTriviaMetricCalculator()
    test_parser = wiki_parser.WikiParser()
    token_freq_map = test_parser.getEntityTokens("Lionel Messi")
    #print token_freq_map
    topk_terms = test.getTopKTFIDFforEntity(token_freq_map)
    print topk_terms
