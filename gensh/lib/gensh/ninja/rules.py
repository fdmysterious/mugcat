"""
┌───────────────────────┐
│ GenSH rules for ninja │
└───────────────────────┘

 Florian Dupeyron
 January 2022
"""

from dataclasses import dataclass
from typing      import Optional, Dict

# ┌────────────────────────────────────────┐
# │ Ninja rule class                       │
# └────────────────────────────────────────┘

@dataclass
class Ninja_Rule:
    name: str
    command: str
    description: str

# ┌────────────────────────────────────────┐
# │ Ninja Variable class                   │
# └────────────────────────────────────────┘

@dataclass
class Ninja_Variable:
    name: str
    value: any
