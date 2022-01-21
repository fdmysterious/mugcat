"""
┌───────────────────────────────┐
│ Simple ninja target generator │
└───────────────────────────────┘

 Florian Dupeyron

 September 2018
 Revised January 2022
"""

from dataclasses import dataclass, field
from typing      import Optional, Dict

# ┌────────────────────────────────────────┐
# │ Ninja target class                     │
# └────────────────────────────────────────┘

@dataclass
class Ninja_Target:
    name: str
    rule: str
    deps: Dict[str, str]

    gen_name = lambda self: self.name
    params:    Dict[str, Dict[str, any]] = field(default_factory=dict)

    def __str__(self):
        return self.gen_name()
