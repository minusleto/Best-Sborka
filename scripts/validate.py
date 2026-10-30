#!/usr/bin/env python3
"""Проверки сборки перед релизом (запускаются локально и в GitHub Actions).

  python scripts/validate.py                 # все проверки
  python scripts/validate.py --update-lock   # перезаписать scripts/registry.lock

Что проверяется:
  1. Все .json в kubejs/ и config/ читаются, в файлах локализации нет дублей ключей
     и нестроковых значений.
  2. Синтаксис всех .js в kubejs/ (node --check).
  3. Реестр: предметы/блоки, зарегистрированные startup-скриптами KubeJS и модом bs-machines,
     не пропали по сравнению с scripts/registry.lock. Удаление ID ломает миры
     (предметы и машины исчезают из сохранения), поэтому это ошибка.
Код выхода 1, если найдена ошибка.
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOCK = ROOT / "scripts" / "registry.lock"
errors, notes = [], []


def rel(p):
    return str(Path(p).relative_to(ROOT)).replace("\\", "/")


def reject_dupes(pairs):
    seen = {}
    for k, v in pairs:
        if k in seen:
            raise ValueError("повторяющийся ключ: %r" % k)
        seen[k] = v
    return seen


def check_json():
    files = [p for d in ("kubejs", "config") for p in (ROOT / d).rglob("*.json")]
    for p in sorted(files):
        try:
            data = json.loads(p.read_text(encoding="utf-8-sig"), object_pairs_hook=reject_dupes)
        except Exception as e:  # noqa: BLE001
            errors.append("%s: %s" % (rel(p), e))
            continue
        if p.parent.name == "lang":
            if not isinstance(data, dict):
                errors.append("%s: файл локализации должен быть объектом" % rel(p))
                continue
            for k, v in data.items():
                if not isinstance(v, str):
                    errors.append("%s: значение ключа %r не строка" % (rel(p), k))
    print("JSON: проверено файлов: %d" % len(files))


def check_js():
    node = shutil.which("node")
    files = sorted((ROOT / "kubejs").rglob("*.js"))
    if not node:
        notes.append("node не найден, синтаксис .js не проверен")
        return
    for p in files:
        r = subprocess.run([node, "--check", str(p)], capture_output=True, text=True)
        if r.returncode != 0:
            first = (r.stderr or "").strip().splitlines()
            errors.append("%s: ошибка синтаксиса: %s" % (rel(p), " | ".join(first[:4])))
    print("JS: проверено файлов: %d" % len(files))


def kubejs_ids():
    node = shutil.which("node")
    if not node:
        return None
    r = subprocess.run([node, str(ROOT / "scripts" / "registry-ids.js")], capture_output=True, text=True)
    if r.returncode != 0:
        errors.append(r.stderr.strip() or "registry-ids.js завершился с ошибкой")
        return None
    return {l for l in r.stdout.splitlines() if l.strip()}


def java_ids():
    ids = set()
    for toml in ROOT.glob("mods-src/*/src/main/resources/META-INF/mods.toml"):
        m = re.search(r'^modId\s*=\s*"([^"]+)"', toml.read_text(encoding="utf-8"), re.M)
        if not m:
            continue
        ns = m.group(1)
        for j in toml.parents[4].rglob("*.java"):
            text = j.read_text(encoding="utf-8")
            for name in re.findall(r'new\s+BlockMachine\(\s*"([a-z0-9_./-]+)"', text):
                ids.add("block %s:%s" % (ns, name))
            for name in re.findall(r'createTile\(\s*"([a-z0-9_./-]+)"', text):
                ids.add("blockentity %s:%s" % (ns, name))
    return ids


def check_registry(update):
    kjs = kubejs_ids()
    if kjs is None:
        return
    current = kjs | java_ids()
    if update:
        LOCK.write_text("\n".join(sorted(current)) + "\n", encoding="utf-8")
        print("Реестр: scripts/registry.lock обновлён (%d ID)" % len(current))
        return
    if not LOCK.exists():
        errors.append("нет scripts/registry.lock, создайте: python scripts/validate.py --update-lock")
        return
    locked = {l.strip() for l in LOCK.read_text(encoding="utf-8").splitlines() if l.strip()}
    removed, added = sorted(locked - current), sorted(current - locked)
    for r in removed:
        errors.append("ID удалён или переименован: %s. Это ломает существующие миры. "
                      "Оставьте старый ID зарегистрированным (можно скрыть из рецептов/JEI)." % r)
    if added:
        notes.append("Новые ID (добавьте в lock командой --update-lock): " + ", ".join(added))
    print("Реестр: в коде %d ID, в lock %d, удалено %d, новых %d" % (len(current), len(locked), len(removed), len(added)))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--update-lock", action="store_true")
    a = ap.parse_args()
    if a.update_lock:
        check_registry(True)
        return 1 if errors else 0
    check_json()
    check_js()
    check_registry(False)
    for n in notes:
        print("ЗАМЕТКА: " + n)
    if errors:
        print("\nОШИБКИ (%d):" % len(errors))
        for e in errors:
            print("  - " + e)
        return 1
    print("\nВсе проверки пройдены.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
