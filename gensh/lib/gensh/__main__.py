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

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Call GenSH script")
    parser.add_argument("--rules", action="store_true", help="Generate build rules instead of page content")
    parser.add_argument("page_path", type=str, help="Path to page folder to generate")

    args = parser.parse_args()

    # Generate rules?
