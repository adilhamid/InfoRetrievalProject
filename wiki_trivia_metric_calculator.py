# Since by default the encoding scheme is based on the operating system, we will enforce the encoding scheme to be utf-8

import sys

reload(sys)
sys.setdefaultencoding('utf8')

import gensim
import heapq
import math
import util

# Class Def for the Calculation of various metrics

class WikiTriviaMetricCalculator:
    def __init__(self):
        print "Inside the Initialization of the class: WikiTriviaExtractor"
        self.model = None
        self.global_idf = util.getglobalfreqdict("plainIdfIndex.txt")
        self.genism_model_filename = "GoogleNews-vectors-negative300.bin"
        self.k_val = 10
        self.doc_size = 10000.0  #document size for the idf
        self.rare_term_freq = 10  #used for ignoring rarely occuring terms.

    def GetModel(self):
        if self.model:
            return
        print 'Generating the Model'
        self.model = gensim.models.KeyedVectors.load_word2vec_format(self.genism_model_filename, binary=True)
        print 'Model Generated'

    # Get the top k tf idf tokens from the token freq map
    def getTopKTFIDFforEntity(self, token_frequency):
        entity_result = {}
        for token in token_frequency:
            tf = 1.0 + math.log10(token_frequency[token])
            global_freq = self.global_idf[token] if token in self.global_idf else 1.5
            if global_freq < self.rare_term_freq: #ignoring very rare terms
                continue
            entity_result[token] = tf * math.log10(self.doc_size/float(global_freq))
        return heapq.nlargest(self.k_val, entity_result, key=entity_result.get)



    def getEntitySimilarity(self,entity1, entity2):
        sim1 = self.getEntitySimilarityHelper(entity1, entity2)
        sim2 = self.getEntitySimilarityHelper(entity2, entity1)
        return ((sim1 + sim2) / 2.0)

    # Get the Cohesiveness of the Article
    def CalcCategoryCohesiveness(self, categoryName, numArticles=50):

        entityNames = self.WikiParser.getEntityForCategory(categoryName)
        numEntities = len(entityNames)

        # Get the Cohesiveness using Article Article Similarity
        sumVal = 0.0
        sumSqVal = 0.0

        for i in range(numEntities):
            entityFirst = self.WikiParser.getEntityToken(
                entityNames[i])  # Assuming that we are getting the TF DICTTIONARY
            for j in range(i):
                entitySecond = self.WikiParser.getEntityToken(entityNames[j])
                cohesiveVal = self.GetArticleToArticleSimilarity(entityFirst, entitySecond)

                sumVal += cohesiveVal
                sumSqVal += cohesiveVal * cohesiveVal

        avgCohesiveVal = 0.0
        if (numEntities > 1):
            avgCohesiveVal = (2 * sumVal) / (numEntities * (numEntities - 1))

        return categoryName, avgCohesiveVal

    def getEntitySimilarityHelper(self, entity1, entity2):
        sim = 0.0
        for i in range(0, self.k_val):
            current_max = self.model.similiarity(entity1[i], entity2[0])
            for j in range(1, self.k_val):
                current_val = self.model.similiarity(entity1[i], entity2[j])
                if current_val > current_max:
                    current_max = current_val
            sim += ((self.k_val - i) * current_max)
        sim = sim / ((self.k_val+1.0) * (float(self.k_val)))
        sim = sim / 2.0
        return sim







