#!/usr/bin/env sh
# Backup of Minecraft worlds from <instance>/saves into <instance>/backups (Linux/macOS).
# Usage:  scripts/backup-world.sh            - back up all worlds
#         scripts/backup-world.sh "World"    - back up one world
# KEEP=N keeps the last N backups per world (default 10).
set -eu
ROOT=$(cd "$(dirname "$0")/.." && pwd)
SAVES="$ROOT/saves"
OUT="$ROOT/backups"
KEEP=${KEEP:-10}
STAMP=$(date +%Y-%m-%d_%H-%M)

[ -d "$SAVES" ] || { echo "ERROR: saves folder not found: $SAVES"; exit 1; }
mkdir -p "$OUT"

backup_one() {
  name=$1
  [ -d "$SAVES/$name" ] || { echo "ERROR: world not found: $name"; exit 1; }
  file="$OUT/${name}_${STAMP}.tar.gz"
  # session.lock is held by the running game, skip it
  tar -C "$SAVES" --exclude='session.lock' -czf "$file" "$name"
  echo "Backup created: $file"
  ls -1t "$OUT/${name}_"[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]_[0-9][0-9]-[0-9][0-9].tar.gz 2>/dev/null \
    | tail -n +"$((KEEP + 1))" | while IFS= read -r old; do rm -f -- "$old"; echo "Old backup removed: $(basename "$old")"; done
}

if [ "${1:-}" != "" ]; then
  backup_one "$1"
else
  found=0
  for d in "$SAVES"/*/; do
    [ -f "${d}level.dat" ] || continue
    found=1
    backup_one "$(basename "$d")"
  done
  [ "$found" = 1 ] || { echo "No worlds found in $SAVES"; exit 1; }
fi
