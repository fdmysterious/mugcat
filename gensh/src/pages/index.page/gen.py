#!/bin/env python3

import gensh.config
import gensh.ninja

import textwrap

def rules():
    print("hello world")
    print(gensh.config.dirs.pkg_dir)
    print(gensh.config.vars.lang)
    
def build():
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
    """))
