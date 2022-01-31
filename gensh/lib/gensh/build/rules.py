"""
┌─────────────────────┐
│ Generic build rules │
└─────────────────────┘

 Florian Dupeyron
 January 2022
"""

from gensh.ninja.rules import Ninja_Rule

# ┌────────────────────────────────────────┐
# │ Rules                                  │
# └────────────────────────────────────────┘

page = Ninja_Rule(
    name        = "page",
    description = "Building page $in",
    command     = "python3 -m gensh $in/gen.py -o $out"
)

# ┌────────────────────────────────────────┐
# │ Rules list                             │
# └────────────────────────────────────────┘
r_list = [
    page
]
