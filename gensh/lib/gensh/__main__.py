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

from . import config

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Call GenSH script")
    parser.add_argument("--rules", action="store_true", help="Generate build rules instead of page content")
    parser.add_argument("page_path", type=str, help="Path to page folder to generate")

    args = parser.parse_args()

    # Generate rules?
    print("Config variables :")
    print(f"lang        = {config.vars.lang}"       )
    print(f"path        = {config.vars.path}"       )
    print(f"output_file = {config.vars.output_file}")
    print()
    print("Key directories :")
    print(f"pkg_dir   = {config.dirs.pkg_dir}")
    print(f"project   = {config.dirs.project}")
    print(f"config    = {config.dirs.config}" )
    print(f"layouts   = {config.dirs.layouts}")
    print(f"pages     = {config.dirs.pages}")
    print(f"resources = {config.dirs.resources}")
    print(f"templates = {config.dirs.templates}")
