import algorithm_wrapper
import wikipedia as wiki
import pdb
if __name__ == "__main__":
    while True:
        input_entity = raw_input()
        if input_entity == "1":
            break
        print algorithm_wrapper.triviaAlgorithm(input_entity)