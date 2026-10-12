#!/usr/bin/env bash
# Compiles the resume with XeLaTeX and puts the PDF where the site serves it.
# Run via `npm run resume`, then commit the PDF; prints the LaTeX log if compilation fails.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p build
if ! xelatex -interaction=nonstopmode -halt-on-error -output-directory=build resume-Yi-Zhang.tex >/dev/null; then
  tail -40 build/resume-Yi-Zhang.log
  exit 1
fi
cp build/resume-Yi-Zhang.pdf ../public/resume_yi_zhang.pdf
