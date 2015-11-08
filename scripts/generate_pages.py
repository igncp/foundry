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

clean()

projects = []

for root, dirs, files in os.walk('projects'):
  if 'project.yml' in files:
    with open(root + "/project.yml", 'r') as stream:
      project_content = yaml.load(stream)
      project_content['location'] = root
      projects.append(project_content)
    dirs[:] = []

for project in projects:
  if project['url']: namespace = project['url']
  else: namespace = '.'
  namespace += '/'
  if project['only']:
    if project['url']: os.mkdir(namespace)
    dirs_and_files = os.listdir(project['location'])
    for dir_or_file in dirs_and_files:
      if dir_or_file in project['only']:
        dir_or_file_path = project['location'] + '/' + dir_or_file
        new_destanition_path = namespace + dir_or_file
        if os.path.isdir(dir_or_file_path): shutil.copytree(dir_or_file_path, new_destanition_path)
        else: shutil.copyfile(dir_or_file_path, new_destanition_path)
  else:
    shutil.copytree(project['location'], project['url'])


with open('projects.json', 'w') as file:
  json.dump(projects, file)
