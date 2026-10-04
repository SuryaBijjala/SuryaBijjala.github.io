#!/usr/bin/env bash
# =====================================================================
# One-time helper: moves the images/PDFs already in your repo into the
# new folder layout used by the cleaned pages, and removes the files the
# cleanup replaced. Safe to re-run: anything missing is skipped.
#
# Usage (from the repo root, after copying the cleaned files in):
#   bash migrate-assets.sh
# Then check `git status`, commit, and delete this script.
# =====================================================================
set -u

mv_if() {  # mv_if <from> <to>
  if [ -e "$1" ]; then
    mkdir -p "$(dirname "$2")"
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then git mv "$1" "$2"; else mv "$1" "$2"; fi
    echo "moved   $1 -> $2"
  fi
}
rm_if() {  # rm_if <path>
  if [ -e "$1" ]; then
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then git rm -rq "$1"; else rm -rf "$1"; fi
    echo "removed $1"
  fi
}

# ── Computational images ────────────────────────────────────────────
mv_if static/img/law-discovery-workflow.png static/img/computational/law-discovery-workflow.png
for f in current-project-1.jpg current-project-2.jpg current-project-3.jpg current-project-4.jpg \
         project-25-5.jpg project-24-52.jpg; do
  mv_if "static/img/$f" "static/img/computational/$f"
done

# ── Experimental images ─────────────────────────────────────────────
for f in exp-project-1.jpg exp-project-2.jpg exp-project-3.jpg exp-study-1.jpg exp-study-2.jpg; do
  mv_if "static/img/$f" "static/img/experimental/$f"
done

# ── Conference thumbnails + PDFs (were in static/projects/) ─────────
for slug in krakow2024 lausanne2022 krakow2021; do
  mv_if "static/projects/$slug.jpg" "static/img/conferences/$slug.jpg"
  mv_if "static/projects/$slug.pdf" "static/docs/conferences/$slug.pdf"
done
rmdir static/projects 2>/dev/null && echo "removed static/projects (empty)"

# ── CV documents (were in static/cv/) ───────────────────────────────
if [ -d static/cv ]; then
  for f in static/cv/*; do mv_if "$f" "static/docs/cv/$(basename "$f")"; done
  rmdir static/cv 2>/dev/null && echo "removed static/cv (empty)"
fi

# ── Law-discovery stage page (lowercase, hyphenated) ────────────────
mv_if computational/Stages/Literature_data.html computational/stages/literature-data.html
rmdir computational/Stages 2>/dev/null

# ── Files replaced by the cleanup ───────────────────────────────────
rm_if static/css/style.css        # old template stylesheet, unused by any page
rm_if projects                    # duplicate of conferences/
rm_if collaborate.html            # moved to collaborate/index.html

echo "Done. Review with: git status"
