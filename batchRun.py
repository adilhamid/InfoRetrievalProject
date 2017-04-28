import algorithm_wrapper
import wikipedia as wiki
import pdb
import sys
import os

reload(sys)
sys.setdefaultencoding('utf8')

if __name__ == "__main__":
    file_path = "./topEntityList.txt"
    # Read the each line of the entityList and Run the Trivia Algorithm
    if os.path.isfile(file_path):
        open_entityFile = open(file_path, "r")
        for entity in open_entityFile:
            algorithm_wrapper.triviaAlgorithm(entity)
        open_entityFile.close()