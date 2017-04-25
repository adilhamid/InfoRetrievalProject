import wiki_parser
import wiki_trivia_metric_calculator
import pdb
import os
import operator

#globals
category_entity_cache_dir = "catentcache/"
surprise_weight = 1.1

def triviaAlgorithm(entity):
    wiki_parser_instance = wiki_parser.WikiParser()
    wiki_trivia_metric_calculator_instance = wiki_trivia_metric_calculator.WikiTriviaMetricCalculator()
    entity_cats = wiki_parser_instance.getCategoryForEntity(entity)
    answer_mat = {}
    if not entity_cats:
        return
    if not os.path.exists(category_entity_cache_dir):
        os.makedirs(category_entity_cache_dir)
    for entity_cat in entity_cats:
        surprise_fact = surprise(entity, entity_cat, wiki_parser_instance, wiki_trivia_metric_calculator_instance)
        if surprise_fact:
            answer_mat[entity_cat.split(":")[1]] = surprise_fact
            cohes_score = cohesivness(entity_cat.split(":")[1], wiki_trivia_metric_calculator_instance)
            if cohes_score:
                answer_mat[entity_cat.split(":")[1]] *= cohes_score
            else:
                answer_mat[entity_cat.split(":")[1]] = 0.0
            print "<------------- ----------------->"
            print "Overall score for cat ", entity_cat, " is ", answer_mat[entity_cat.split(":")[1]]
            print "Ending     <------------- ----------------->"
    answer_mat = sorted(answer_mat.items(), key=operator.itemgetter(1), reverse=True)
    output_cache = "outputCache/"
    if not os.path.exists(output_cache):
        os.makedirs(output_cache)
    full_path = output_cache + entity + ".txt"
    target = open(full_path, "w")
    for key in answer_mat:
        target.write(key[0] + ":" + repr(key[1]))
        target.write("\n")
    target.close()
    print answer_mat

def surprise(entity_input, entity_cat, wiki_parser_instance, wiki_trivia_metric_calculator_instance):
    sum = 0.0
    count = 0.0
    entity_input_tokens = wiki_parser_instance.getEntityTokens(entity_input)
    entity_input_top = wiki_trivia_metric_calculator_instance.getTopKTFIDFforEntity(entity_input_tokens)

    path = category_entity_cache_dir + entity_cat.split(":")[1] + "/"
    if os.path.exists(path):
        print "Reading from file "
        outer_list = []
        for(root, dirs, files) in os.walk(path):
            for file in files:
                if file.endswith('.txt'):
                    inner_list = []
                    current_file = open(os.path.join(root, file), "r")
                    for line in current_file:
                        line = line.replace('\n', '')
                        inner_list.append(line)
                    outer_list.append(inner_list)
        size_new = len(outer_list)
        for i in range(0, size_new):
            sum += wiki_trivia_metric_calculator_instance.getEntitySimilarity(entity_input_top, outer_list[i])
            count += 1.0
        answer = sum / count
        print "surprise for ", entity_cat, " is ", (1.0 / answer)
        return (1.0 / answer)

    new_entities = wiki_parser_instance.getEntityforCategory(entity_cat)
    if not new_entities:
        return

    for new_entity in new_entities:
        if new_entity != entity_input:
            new_entity_tokens = wiki_parser_instance.getEntityTokens(new_entity)
            new_entity_tokens_top = wiki_trivia_metric_calculator_instance.getTopKTFIDFforEntity(new_entity_tokens)
            new_entity_top_cache = category_entity_cache_dir + entity_cat.split(':')[1] + "/"
            if not os.path.exists(new_entity_top_cache):
                os.makedirs(new_entity_top_cache)
            cache_file_name = new_entity_top_cache + new_entity + ".txt"
            target = open(cache_file_name, "w")
            for top_token in new_entity_tokens_top:
                target.write(top_token)
                target.write("\n")
            target.close()
            sum += wiki_trivia_metric_calculator_instance.getEntitySimilarity(entity_input_top, new_entity_tokens_top)
            count += 1.0
    answer = sum / count
    print "surprise for " , entity_cat, " is ", (1.0/answer)
    return (1.0 / answer)

def cohesivness(entity_cat, wiki_trivia_metric_calculator_instance):
    sum = 0.0
    count = 0.0
    #answer = sum / count
    path = category_entity_cache_dir + entity_cat + "/"
    outer_list = []
    for(root, dirs, files) in os.walk(path):
        for file in files:
            if file.endswith('.txt'):
                inner_list = []
                current_file = open(os.path.join(root, file), "r")
                for line in current_file:
                    line = line.replace('\n', '')
                    inner_list.append(line)
                outer_list.append(inner_list)
    size_new = len(outer_list)
    for i in range(0, size_new):
        for j in range(i+1, size_new):
                sum += wiki_trivia_metric_calculator_instance.getEntitySimilarity(outer_list[i], outer_list[j])
                count += 1.0
    if count == 0.0:
        return 0.0
    answer = sum / count
    print "Cohes is for cat ", entity_cat, " is ", answer
    return answer

if __name__ == "__main__":
    cohesivness("Argentine Roman Catholics", wiki_trivia_metric_calculator.WikiTriviaMetricCalculator())

