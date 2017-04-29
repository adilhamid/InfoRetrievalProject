import algorithm_wrapper
import wikipedia as wiki
import pdb
import wiki_parser
import wiki_trivia_metric_calculator


if __name__ == "__main__":
    wiki_parser_instance = wiki_parser.WikiParser()
    wiki_trivia_metric_calculator_instance = wiki_trivia_metric_calculator.WikiTriviaMetricCalculator()
    print "Init done"

    while True:
        print "Enter Some Entity"
        input_entity = raw_input()
        if input_entity == "1":
            break
        print algorithm_wrapper.triviaAlgorithm(input_entity, wiki_parser_instance, wiki_trivia_metric_calculator_instance)