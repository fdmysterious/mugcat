"""
┌────────────────────────┐
│ GenSH config variables │
└────────────────────────┘

 Florian Dupeyron
 January 2022
"""

import os

lang        = os.getenv("GENSH_LANG")
path        = os.getenv("GENSH_PATH")
build_dir   = os.getenv("GENSH_BUILD_DIR")

# Project path is mandatory
if path is None:
    raise ValueError("GENSH_PATH env. variable not set")
