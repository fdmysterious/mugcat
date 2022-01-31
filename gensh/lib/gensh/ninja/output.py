"""
┌────────────────────────────┐
│ Output ninja rules to file │
└────────────────────────────┘

 Florian Dupeyron

 September 2018
 Revised January 2022
"""

import textwrap

from  io     import StringIO
from .target import Ninja_Target

# ┌────────────────────────────────────────┐
# │ Rules and variables                    │
# └────────────────────────────────────────┘

def rules(fhandle, rules_list):
    for rule in rules_list:
        print(f"rule {rule.name}", file=fhandle)
        print(f"\tcommand = {rule.command}", file=fhandle)

        if rule.description: print(f"\tdescription = {rule.description}", file=fhandle)
        print(file=fhandle) # Empty separation line

def variables(fhandle, variables_list):
    for var in variables_list:
        print(f"{var.name} = {var.value}", file=fhandle)
    print(file=fhandle) # Empty separation line

# ┌────────────────────────────────────────┐
# │ Targets output                         │
# └────────────────────────────────────────┘

def __add_deps(ss, dep):
    """
    Flattens the dependency tree from dep as a dict containing the
    depdency name and list of dependency names. Consists of a
    postfix tree walk (children dependencies first).

    If dependency is a string, no rule is added.
    """

    if isinstance(dep, Ninja_Target):
        if (dep.name in ss) and not (dep in ss[dep.name][0]):
            raise RuntimeError(f"Duplicate entry {dep.name}")

        depnames_io = StringIO()
        for ch in dep.deps:
            depnames_io.write(str(ch) + " ")
            __add_deps(ss, ch)

        ss[dep.name] = (dep, depnames_io.getvalue())

    return ss

def targets(fhandle, target_list):
    # Step 1 # Constructing set of targets
    ss = dict()
    for tt in target_list: __add_deps(ss,tt)

    # Step 2 # Printing rules
    for rr, dnames in ss.values():
        print(f"build {rr!s}: {rr.rule.name!s} {dnames}", file=fhandle)
        for k,v in rr.params.items():
            print(f"\t{k}={v}", file=fhandle)
        print(file=fhandle) # Empty separation line
