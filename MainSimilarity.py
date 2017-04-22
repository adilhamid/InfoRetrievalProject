# Since by default the encoding scheme is based on the operating system, we will enforce the encoding scheme to be utf-8

import sys

reload(sys)
sys.setdefaultencoding('utf8')

import gensim
from nltk.stem.porter import PorterStemmer
import os
import codecs
import heapq
import math
import Util
#import WikiParser

# Class Def for the Similarity2Vec.

class Similarity:

    def __init__(self):
        print "Inside the Initialization of the class: Similarity"
        # self.wikiparser = WikiParser.WikiParser()
        self.model = None
        self.GlobalIDF = None

    #Get Model from the sentences
    def GetModel(self, filename="GoogleNews-vectors-negative300.bin"):
        if self.model:
            return
        print 'Generating the Model'
        self.model = gensim.models.KeyedVectors.load_word2vec_format(filename, binary=True)
        print 'Model Generated'

    #Loading the Model from the File
    def LoadModel(self, fname):
        print 'Loading the Model from the File'
        self.model = gensim.models.Word2Vec.load(fname)
        print 'Loading Completed'

    #Saves the model into the filname given as input
    def SaveModel(self, fname):
        if self.model:
            print 'Saving the Model in File'
            self.model.save(fname)
            print 'Model Saved'
        else:
            print 'No Model Found'

    #Load the Global Idf Values from the Text
    def LoadIndexes(self, filename):
        print "Loading the Global IDF Values for Model"
        self.GlobalIDF = Util.GetGlobalDict(filename)
        print "Global IDF Values Loaded"


    # Getting the TOP-K-IDF values from an Article
    def GetTopK_IDF(self, tfIndex,TopK, K = 10, DocsSize = 10000 ):
        articleIndex = {}
        wordCnt = 0

        # Calculating the Actual IDF values
        for word in tfIndex:
            tfScore = tfIndex[word]
            idfScore = self.GlobalIDF[word] if word in self.GlobalIDF else 1.5 # Assumption that if the word doesnt exist in Global Corpus we have 1.5

            # Now Filtering the words occuring less than ten times in document
            if idfScore < K:
                continue
            articleIndex[word] = tfScore  * math.log10(DocsSize/float(idfScore))

        topWords = heapq.nlargest(TopK, articleIndex, key=articleIndex.get)

        return topWords

    # Article Similarity Utility Function
    def GetArticleSimilarityUtil(self, article1, article2,weighted = True):
        val = 0.0
        articleLen1 = len(article1)
        articleLen2 = len(article2)

        if articleLen1 ==0 or articleLen2 ==0:
            return 0.0
        print type(article1) # Check Correctly the Value
        for i, word in enumerate(article1):                     # article1.items(): #
            # Using the Word2Vec Similarity
            cosDist = [self.model.similiarity(word, word2) for word2 in article2]

            if weighted:
                val += (articleLen1-i) * max(cosDist)
            else:
                val += max(cosDist)
        # Taking the Weighted Sum
        if weighted:
            val /= (articleLen1+1) * float(articleLen1)/2
        else:
            val /= articleLen1

        return val


    # Get the article to article Similarity
    def GetArticleToArticleSimilarity(self, article1Tokens, article2Tokens, TopK=10, IDFLimit=10, weighted=True):
        # Get the Top IDF values of both the articles
        article1Top = self.GetTopK_IDF(article1Tokens, TopK, IDFLimit)
        article2Top = self.GetTopK_IDF(article2Tokens, TopK, IDFLimit)

        # Check of Either of the aricles has no member in it
        if article1Top == [] or article2Top == []:
            return 0

        #Calculating the Similarity using the Equation 3.1 from the Paper
        sim1to2 = self.GetArticleSimilarityUtil(article1Top, article2Top, weighted)
        sim2to1 = self.GetArticleSimilarityUtil(article2Top, article1Top, weighted)

        return (sim1to2 + sim2to1)/2

    # Get the Cohesiveness of the Article
    def CalcCategoryCohesiveness(self, categoryName, numArticles =50):

        entityNames = self.WikiParser.getEntityForCategory(categoryName)
        numEntities = len(entityNames)

        # Get the Cohesiveness using Article Article Similarity
        sumVal = 0.0
        sumSqVal = 0.0

        for i in range(numEntities):
            entityFirst = self.WikiParser.getEntityToken(entityNames[i]) # Assuming that we are getting the TF DICTTIONARY
            for j in range(i):
                entitySecond = self.WikiParser.getEntityToken(entityNames[j])
                cohesiveVal = self.GetArticleToArticleSimilarity(entityFirst, entitySecond)

                sumVal += cohesiveVal
                sumSqVal += cohesiveVal * cohesiveVal

        avgCohesiveVal = 0.0
        if (numEntities > 1):
            avgCohesiveVal = (2 * sumVal)/ (numEntities * (numEntities-1))

        return categoryName, avgCohesiveVal

    #Test Function
    def testReturn(self):
        numentity = 6
        cnt = 0
        for j in range(numentity):
            for i in range(j):
                print i, j
                cnt += 1
        print cnt

if __name__ == "__main__":
    obj = Similarity()
    print obj.testReturn()
    #obj.GetModel()
    #obj.SaveModel('TestModelSave.bin')







