======================
Mugcat generator shell
======================

:Authors:  - Florian Dupeyron <florian.dupeyron@mugcat.fr>
:Date:     December 2021
:Abstract: Generates the website's content


Global idea
===========

This is the static site generator for https://mugcat.fr. It depends on ninja_ for build managment, python, and some bash trickery.

Folder structure
================

.. code::
    lib: python library and stuff
        gensh: Python library
            ninja: Handle ninja file generation
    src: website sources
        config: global site config (main menu for example)
        layouts: website's layouts
        pages: website's pages
            <name>.page
                gen: Generator script
                <other resources>

            subfolder/<name>.page
        resources: website's compiled and misc. assets
        templates: templates for pages

Environment variables
=====================

The generator script uses the following env. variables:

- :code:`GENSH_LANG`: lang code to use (fr, en)
- :code:`GENSH_PATH`: Path to the GenSH root project
- :code:`GENSH_OUTPUT_FILE`: Path to the current output file path on local filesystem

These variables are handled by the `gensh.config` module, so that generator scripts have a nice
interface to cope with.
