#!/usr/bin/env python

"""
Generate GitHub Pages projects and commit changes
No arguments
"""

import os

from generate_pages import generate_pages
from check_last_master_commit import check_last_master_commit


def generate_pages_and_commit():
  generate_pages()
  last_commit = check_last_master_commit()
  last_commit_extract = last_commit[0:7]
  os.system('git add -A . >/dev/null')
  os.system('git commit -m "gh pages for ' + last_commit_extract + '"')

  print('')
  print('Generated and commited pages for: ' + last_commit_extract)

if __name__ == "__main__":
  generate_pages_and_commit()
