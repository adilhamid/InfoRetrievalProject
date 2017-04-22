
# Importing the wikipedia library for python
import wikipedia as wiki

# Setting the environment for wikipedia library
def initWikipedia():
    wiki.set_lang("en")

# Parsing the page of wikipedia using the function
# Input is the Search term
# Output is the Category List
def getCategories( search_term):
    try:
        page = wiki.page(title=search_term,auto_suggest=False)
        print ("Here" , page.url)
        categ = page.categories
        for val in categ:
            print(val)
        return categ
    except wiki.exceptions.PageError as e:
        print ("No Page Found for this search term")
        return []




initWikipedia()
query = input()
categories = getCategories(query)
if(len(categories)) != 0:
    print (len(categories))