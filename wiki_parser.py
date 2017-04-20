import pywikibot
import codecs
class WikiParser:
    def __init__(self, wiki_enitity):
        print("Making the Instance of Wiki parser.")
        self.wiki_entity = wiki_enitity
        self.site = pywikibot.Site('en', 'wikipedia')
        self.page = pywikibot.Page(self.site, wiki_enitity) # here we just crawl for the new entry

    def getEntity
