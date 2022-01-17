"""
┌───────────────────────┐
│ GenSH key directories │
└───────────────────────┘

 Florian Dupeyron
 January 2022
"""

from pathlib import Path
from .       import vars as cfg_vars

# Path of GenSH lib
# First .. is to remove file name (dirs.py)
pkg_dir   = (Path(__file__) / ".." / ".." ).resolve()

# Path of GenSH project
project   = Path(cfg_vars.path).resolve()

# Path of project config
config    = (project / "config/").resolve()

# Path of project layouts
layouts   = (project / "layouts/").resolve()

# Path of project pages
pages     = (project / "pages/").resolve()

# Path of project resources
resources = (project / "resources/").resolve()

# Path of project templates
templates = (project / "templates/").resolve()
