#!/bin/env python3

"""
┌──────────────────────┐
│ GenSH Wrapper script │
└──────────────────────┘

 Florian Dupeyron
 December 2021
"""

import argparse
import importlib
import sys

from   pathlib  import Path
from . import config

def import_page_script(p_path: Path):
    p_path = Path(p_path).resolve()

    # Add page path to python path
    sys.path.append(str(p_path))
    print(sys.path)

    # Import module
    page_module = importlib.import_module("gen")

    return page_module

#def import_page_script(p_path: Path):
#    """
#    Import and returns page module
#    """
#
#    # Compile file object code
#    p_path  = Path(p_path).resolve() # Ensure file type is an absolute Path object
#
#    # Compile
#    ast_obj = compile(p_path.read_text(), str(p_path), "exec")
#
#    # Exec
#    exec(ast_obj, locals(), globals())

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Call GenSH script")
    parser.add_argument("--rules", action="store_true", help="Generate build rules instead of page content")
    parser.add_argument("page_path", type=str, help="Path to page folder to generate")

    args = parser.parse_args()

    # Generate rules?
    print("Config variables :")
    print(f"lang        = {config.vars.lang}"       )
    print(f"path        = {config.vars.path}"       )
    print()
    print("Key directories :")
    print(f"pkg_dir   = {config.dirs.pkg_dir}")
    print(f"project   = {config.dirs.project}")
    print(f"config    = {config.dirs.config}" )
    print(f"layouts   = {config.dirs.layouts}")
    print(f"pages     = {config.dirs.pages}")
    print(f"resources = {config.dirs.resources}")
    print(f"templates = {config.dirs.templates}")
    
    page_module = import_page_script(Path(args.page_path))
    page_module.rules()
