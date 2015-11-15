import subprocess

last_master_commit = None


def check_last_master_commit(with_cache=True):
  global last_master_commit
  if last_master_commit is None or with_cache is False:
    last_master_commit = subprocess.check_output(['git', 'rev-parse', 'master'])

  return last_master_commit
