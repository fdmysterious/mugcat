#!/bin/env python3

import gensh.config
import gensh.ninja
import sys

from   gensh   import build as gen_build
from   pathlib import Path

import textwrap

page_dir = (Path(__file__) / "..").resolve()

def rules():
    return [
        gen_build.target.page(
            input_dir   = page_dir,
            output_slug = "test"
        )
    ]
    
def build(f_handle=sys.stdout):
    print(textwrap.dedent("""
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Hello world!</title>
        </head>

        <body>
            <h1>It works!</h1>
        </body>
    </html>
    """), file=f_handle)

if __name__ == "__main__":
    build()
