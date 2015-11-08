#!/usr/bin/env python

"""
Clean previous generated dirs and files
No arguments
"""

import os
import shutil


def clean():
  root_items = os.listdir('.')
  preserved_dirs = ['common', 'projects', 'scripts', '.git']

  dirs_to_remove = [item for item in root_items
    if os.path.isdir(item) and item not in preserved_dirs]
  files_to_remove = [file for file in ['index.html', 'projects.json']
    if file in root_items and os.path.isfile(file)]

  for dir in dirs_to_remove: shutil.rmtree(dir)
  for file in files_to_remove: os.remove(file)

if __name__ == "__main__":
  clean()
