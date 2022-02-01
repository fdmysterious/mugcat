# ┌────────────────────────────────────────┐
# │ General information                    │
# └────────────────────────────────────────┘

AUTHOR        = 'Florian Dupeyron'
SITENAME      = 'Mugcat'
SITEURL       = ''

TIMEZONE      = 'Europe/Paris'
DEFAULT_LANG  = 'fr'


# ┌────────────────────────────────────────┐
# │ Various links and stuff                │
# └────────────────────────────────────────┘

LINKS = (('Pelican', 'https://getpelican.com/'),
         ('Python.org', 'https://www.python.org/'),
         ('Mugcat', 'https://mugcat.fr'))

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)


# ┌────────────────────────────────────────┐
# │ Paths                                  │
# └────────────────────────────────────────┘

PATH          = "content/"
OUTPUT_PATH   = "output/"

PAGES_PATHS   = ["pages"   ]
ARTICLE_PATHS = ["articles"]


# ┌────────────────────────────────────────┐
# │ Blog config.                           │
# └────────────────────────────────────────┘

USE_FOLDER_AS_CATEGORY = True
DEFAULT_PAGINATION = False


# ┌────────────────────────────────────────┐
# │ Feeds                                  │
# └────────────────────────────────────────┘

# Feed generation is usually not desired when developing
FEED_ALL_ATOM         = None
CATEGORY_FEED_ATOM    = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM      = None
AUTHOR_FEED_RSS       = None
