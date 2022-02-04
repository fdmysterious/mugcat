# ┌────────────────────────────────────────┐
# │ General information                    │
# └────────────────────────────────────────┘

AUTHOR        = "Florian Dupeyron"
SITENAME      = "Mugcat"
SITEURL       = ""

TIMEZONE      = "Europe/Paris"
DEFAULT_LANG  = "fr"


# ┌────────────────────────────────────────┐
# │ Theme config                           │
# └────────────────────────────────────────┘

THEME         = "themes/mugcat"


# ┌────────────────────────────────────────┐
# │ Plugins                                │
# └────────────────────────────────────────┘

PLUGIN_PATHS = ["plugins"]
PLUGINS      = ["category_meta"]

# ┌────────────────────────────────────────┐
# │ Various links and stuff                │
# └────────────────────────────────────────┘

LINKS = (("Pelican", "https://getpelican.com/"),
         ("Python.org", "https://www.python.org/"),
         ("Mugcat", "https://mugcat.fr"))

# Social widget
SOCIAL = (("You can add links in your config file", "#"),
          ("Another social link", "#"),)


# ┌────────────────────────────────────────┐
# │ Paths                                  │
# └────────────────────────────────────────┘

# ───────────────── Input ──────────────── #

PATH             = "content/"
OUTPUT_PATH      = "output/"

PAGES_PATHS      = ["pages"   ]
ARTICLE_PATHS    = ["articles"]

# ──────────────── Output ──────────────── #

THEME_STATIC_DIR = "assets"

PAGE_URL         = "{slug}.html"
PAGE_SAVE_AS     = PAGE_URL 

ARTICLE_URL      = "{category}/{slug}.html"
ARTICLE_SAVE_AS  = ARTICLE_URL

CATEGORY_URL     = "{slug}/index.html"
CATEGORY_SAVE_AS = CATEGORY_URL

# ┌────────────────────────────────────────┐
# │ Blog config.                           │
# └────────────────────────────────────────┘

USE_FOLDER_AS_CATEGORY = True
DEFAULT_PAGINATION     = False


# ┌────────────────────────────────────────┐
# │ Feeds                                  │
# └────────────────────────────────────────┘

# Feed generation is usually not desired when developing
FEED_ALL_ATOM          = None
CATEGORY_FEED_ATOM     = None
TRANSLATION_FEED_ATOM  = None
AUTHOR_FEED_ATOM       = None
AUTHOR_FEED_RSS        = None


# ┌────────────────────────────────────────┐
# │ Build config.                          │
# └────────────────────────────────────────┘

DELETE_OUTPUT_DIRECTORY = True
