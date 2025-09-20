---
title: "LUNARA PDF Generation Guide"
subtitle: "Pandoc and LaTeX Configuration Documentation"
author: 
  - Owen Lindsey
  - Carter Wright  
  - Andrew Mack
instructor: "Professor Amr Elchouemi"
revision: "1.0"
date: "September 20, 2025"
subject: "Software Engineering - Documentation Tools"
keywords: [Pandoc, LaTeX, PDF Generation, Documentation, LUNARA, Templates]
lang: "en"
titlepage: true
titlepage-color: "4B0082"
titlepage-text-color: "FFFFFF"
titlepage-rule-color: "DAA520"
titlepage-rule-height: 2
book: true
classoption: [oneside]
toc: true
toc-depth: 3
lof: false
lot: false
fontsize: 11pt
linestretch: 1.2
mainfont: "Times New Roman"
sansfont: "Arial"
monofont: "Courier New"
geometry: "paperwidth=11in,paperheight=17in,left=2.5cm,right=2.5cm,top=3cm,bottom=3cm"
header-left: "LUNARA PDF Generation"
header-right: "Documentation Tools"
footer-left: "Grand Canyon University"
footer-right: "Page \\thepage"
listings: true
listings-no-page-break: true
code-block-font-size: \footnotesize
listings-disable-line-numbers: false
tables: true
graphics: true
header-includes:
  - \usepackage{longtable}
  - \usepackage{booktabs}
  - \usepackage{array}
  - \usepackage{xcolor}
  - \definecolor{schoolpurple}{HTML}{4B0082}
  - \definecolor{schoolgold}{HTML}{DAA520}
  - \definecolor{schoolwhite}{HTML}{FFFFFF}
  - \lstset{breaklines=true,breakatwhitespace=false,columns=fullflexible,prebreak=\raisebox{0ex}[0ex][0ex]{\ensuremath{\hookleftarrow}},postbreak=\raisebox{0ex}[0ex][0ex]{\ensuremath{\hookrightarrow\space}},breakindent=1.5em,breakautoindent=true}
  - \lstset{basicstyle=\scriptsize\ttfamily,xleftmargin=1.5em,framexleftmargin=1em}
  - \lstset{showstringspaces=false,keepspaces=true}
  - \usepackage{makecell}
  - \setlength{\tabcolsep}{4pt}
  - \renewcommand{\arraystretch}{1.1}
colorlinks: true
linkcolor: purple
urlcolor: purple
toccolor: black
disable-header-and-footer: false
---

\newpage

# PDF GENERATION GUIDE

This directory contains scripts and templates for generating professional PDF documents from Markdown source files.

## Quick Start

### For Windows Users
```bash
generate_development_pdf.bat
```

### For Mac/Linux Users
```bash
chmod +x generate_development_pdf.sh
./generate_development_pdf.sh
```

\newpage

# CODE BLOCK OPTIMIZATION FEATURES

The PDF generation has been optimized to handle long code blocks that previously overflowed pages:

### ✅ **Fixed Issues:**
- **Horizontal Overflow**: Code lines now wrap properly within page margins
- **Vertical Overflow**: Long code blocks break across pages appropriately
- **Line Numbers**: Maintained while ensuring proper formatting
- **Syntax Highlighting**: Preserved for all supported languages

### 🔧 **Technical Improvements:**
1. **Reduced Page Margins**: From 3cm to 2.5cm for more code space
2. **Smart Line Breaking**: Lines break at whitespace when possible
3. **Visual Break Indicators**: Arrow symbols show where lines wrap
4. **Smaller Font Size**: `\footnotesize` for better fitting
5. **Flexible Column Layout**: Better spacing and alignment

### 📋 **Supported Languages:**
- TypeScript/JavaScript
- Java
- Python
- JSON
- XML
- Shell/Bash
- And more...

\newpage

# PREREQUISITES

### Required Software
- **Pandoc** (>= 2.0): Document converter
- **LaTeX Distribution**: 
  - Windows: MiKTeX or TeX Live
  - Mac: MacTeX
  - Linux: TeX Live

### Installation Commands

#### Windows (using Chocolatey)
```powershell
choco install pandoc
choco install miktex
```

#### Mac (using Homebrew)
```bash
brew install pandoc
brew install --cask mactex
```

#### Ubuntu/Debian
```bash
sudo apt-get install pandoc texlive-full
```

\newpage

# TEMPLATE STRUCTURE

```
Templates/
├── eisvogel.latex          # Main template
├── eisvogel-added.latex    # Extended features
├── common.latex            # Common settings
├── font-settings.latex     # Font configuration
├── hypersetup.latex        # Link settings
└── after-header-includes.latex
```

\newpage

# CUSTOMIZATION OPTIONS

### Code Block Font Size
Modify the YAML front matter in your Markdown file:
```yaml
code-block-font-size: \footnotesize   # Options: \tiny, \scriptsize, \footnotesize, \small
```

### Page Margins
```yaml
geometry: "left=2.5cm,right=2.5cm,top=3cm,bottom=3cm"
```

### Disable Line Numbers
```yaml
listings-disable-line-numbers: true
```

\newpage

# TROUBLESHOOTING

### Common Issues

#### "pandoc: command not found"
- Ensure Pandoc is installed and in your PATH
- Restart your terminal after installation

#### "xelatex: command not found"
- Install a complete LaTeX distribution
- The script will automatically fall back to pdflatex

#### Code Still Overflowing
1. Check that you're using the updated scripts
2. Verify the YAML front matter includes the new settings
3. Try reducing `code-block-font-size` to `\tiny`

#### PDF Generation Fails
- Ensure all LaTeX packages are installed
- Check file permissions
- Run with `--verbose` flag for detailed error messages

### Advanced Debugging

Enable verbose output:
```bash
# Add --verbose flag to pandoc command in the script
--verbose
```

Check LaTeX log:
```bash
# Look for .log files in the same directory
cat LUNARA_Development_Phase_Report.log
```

\newpage

# OUTPUT QUALITY

The generated PDF will feature:
- ✅ Professional formatting with proper margins
- ✅ Syntax-highlighted code blocks that fit within pages
- ✅ Line numbers for code reference
- ✅ Proper page breaks for long content
- ✅ Consistent typography and styling
- ✅ Working table of contents and cross-references

\newpage

# PERFORMANCE NOTES

- **Generation Time**: ~30-60 seconds for large documents
- **File Size**: Optimized for reasonable file sizes while maintaining quality
- **Memory Usage**: Requires ~500MB RAM during generation

## Version History

- **v1.1**: Added code block overflow fixes and improved formatting
- **v1.0**: Initial PDF generation with basic eisvogel template

For additional help, consult the [Pandoc documentation](https://pandoc.org/MANUAL.html) or the [Eisvogel template repository](https://github.com/Wandmalfarbe/pandoc-latex-template). 