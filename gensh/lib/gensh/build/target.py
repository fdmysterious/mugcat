"""
┌───────────────────────────┐
│ Specific target factories │
└───────────────────────────┘

 Florian Dupeyron
 January 2022
"""

from gensh.ninja.target import Ninja_Target
from . import rules

def page(input_dir, output_slug):
    return Ninja_Target(
        name = output_slug,
        rule = rules.page,
        deps = [str(input_dir)]
    )
