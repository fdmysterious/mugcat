"""
┌─────────────────────────────────────┐
│ Various ninja rule generation tests │
└─────────────────────────────────────┘

 Florian Dupeyron
 January 2022
"""

from .target import Ninja_Target
from .rules  import (Ninja_Rule, Ninja_Variable)
from .       import output

from io      import StringIO

if __name__ == "__main__":
    # ┌────────────────────────────────────────┐
    # │ Create rules                           │
    # └────────────────────────────────────────┘
    r_html = Ninja_Rule(
        name        = "html",
        command     = "$in/gen -o $out",
        description = "Generating page content for $in"
    )

    # ┌────────────────────────────────────────┐
    # │ Create some dumb targets               │
    # └────────────────────────────────────────┘

    t_test = Ninja_Target(
        name = "file_1.html",
        rule = "page",
        deps = ["dep1.html", "dep2.html"]
    )

    # ┌────────────────────────────────────────┐
    # │ Print stuff to file                    │
    # └────────────────────────────────────────┘

    with open("test.ninja", "w") as f_out:
        output.rules  (f_out, [r_html])
        output.targets(f_out, [t_test])
