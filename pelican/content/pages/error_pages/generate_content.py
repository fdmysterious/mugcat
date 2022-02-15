"""
┌──────────────────────────┐
│ Generate RST error pages │
└──────────────────────────┘

 Florian Dupeyron
 February 2022
"""

from   pathlib import Path
import random

catlist = list(Path(".").glob("../../images/cats/*.jpg"))

with open("errcontent") as fhandle:
    for line in fhandle:
        fields    = line.strip().split("\t")

        err_code  = fields[0].strip()
        err_title = fields[1].strip()
        err_desc  = fields[2].strip()

        # Pick random error cat
        randcat   = catlist[random.choice(range(len(catlist)))]

        print(f"> Generate {err_code}.rst")

        with open(f"{err_code}.rst", "w") as f_error:
            title     = f"{err_code}: {err_title}"
            title_len = len(title)
            print("=" * title_len, file=f_error)
            print(title, file=f_error)
            print("=" * title_len, file=f_error)
            print(f":status: hidden", file=f_error)
            print(f":template: page_error", file=f_error)
            print(f":error_cat: {randcat.name}", file=f_error)
            print(f":slug: err/{err_code}", file=f_error)
            print("", file=f_error)
            print(err_desc, file=f_error)
