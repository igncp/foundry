#!/usr/bin/env python

"""
Generate GitHub Pages projects
No arguments
"""

import os
import yaml
import json
import shutil

from clean import clean
from check_last_master_commit import check_last_master_commit


def generate_pages():
  clean()

  foundry = {}
  projects = []

  for root, dirs, files in os.walk('projects'):
    if 'project.yml' in files:
      with open(root + "/project.yml", 'r') as stream:
        project_content = yaml.load(stream)
        project_content['location'] = root
        projects.append(project_content)
      dirs[:] = []

  is_index = lambda project: project['url'] != '/'

  for project in projects:
    if is_index(project): namespace = project['url']
    else: namespace = '.'
    namespace += '/'
    if project['only']:
      if is_index(project): os.mkdir(namespace)
      dirs_and_files = os.listdir(project['location'])
      for dir_or_file in dirs_and_files:
        if dir_or_file in project['only']:
          dir_or_file_path = project['location'] + '/' + dir_or_file
          new_destanition_path = namespace + dir_or_file
          if os.path.isdir(dir_or_file_path):
            shutil.copytree(dir_or_file_path, new_destanition_path)
          else: shutil.copyfile(dir_or_file_path, new_destanition_path)
    else:
      shutil.copytree(project['location'], project['url'])

  last_commit = check_last_master_commit()

  foundry['projects'] = projects
  foundry['last_commit'] = last_commit.strip()

  with open('foundry.json', 'w') as file:
    json.dump(foundry, file)


if __name__ == "__main__":
  generate_pages()
