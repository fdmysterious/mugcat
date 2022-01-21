"""
┌─────────────────────┐
│ Generic build rules │
└─────────────────────┘

 Florian Dupeyron
 January 2022
"""

import gensh.ninja

# ┌────────────────────────────────────────┐
# │ Rules                                  │
# └────────────────────────────────────────┘

r_rules = Ninja_Rule(
    name    = "rules",
    command = "python3 -m gensh $in --rules"
)
