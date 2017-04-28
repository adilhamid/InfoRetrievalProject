import algorithm_wrapper
import wikipedia as wiki

if __name__ == "__main__":
    while True:
        input_entity = raw_input()
        if input_entity == "1":
            break
        wiki.set_lang("en")

        # Try searching the wiki for the page entity, if nothing exists then return false
        try:
            entity = wiki.page(title=input_entity, auto_suggest=False)
            print algorithm_wrapper.triviaAlgorithm(input_entity)

        except wiki.exceptions.PageError as e:
            print ("No Page Found for this search entity")