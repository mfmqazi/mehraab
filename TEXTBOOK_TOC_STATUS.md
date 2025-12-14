# Textbook Page Numbers - Update Required

This document tracks which textbooks need their table of contents (TOC) updated with correct PDF page numbers.

## ✅ Completed
- **DC Dutta Obstetrics** - All 42 chapters mapped with correct PDF page numbers (offset: +23 pages)

## ⏳ Pending TOC Updates

### 1. SRB Surgery (`textbook-srb.html`)
- **PDF File**: `content/srb-surgery-6th.pdf`
- **Current Status**: Has 33 placeholder chapters with approximate page numbers
- **Action Needed**: Provide table of contents with actual page numbers
- **Page Offset**: TBD (check if Chapter 1 starts at PDF page X)

### 2. Ghai Pediatrics (`textbook-ghai.html`)
- **PDF File**: `content/ghai-pediatrics-8th.pdf`
- **Current Status**: Has 25 placeholder chapters with approximate page numbers
- **Action Needed**: Provide table of contents with actual page numbers
- **Page Offset**: TBD

### 3. Medicine - Archit Boloor (`textbook-medicine.html`)
- **PDF File**: `content/medicine-archit-boloor.pdf`
- **Current Status**: Has 3 placeholder chapters
- **Action Needed**: Provide complete table of contents with page numbers
- **Page Offset**: TBD

### 4. Ophthalmology - AK Khurana (`textbook-ophthalmology.html`)
- **PDF File**: `content/ophthalmology-khurana.pdf`
- **Current Status**: Has 3 placeholder chapters
- **Action Needed**: Provide complete table of contents with page numbers
- **Page Offset**: TBD

### 5. ENT - PL Dhingra (`textbook-ent.html`)
- **PDF File**: `content/ent-dhingra.pdf`
- **Current Status**: Has 3 placeholder chapters
- **Action Needed**: Provide complete table of contents with page numbers
- **Page Offset**: TBD

## How to Provide TOC

### Option 1: Paste the Table of Contents
Copy the table of contents from the PDF (like you did for DC Dutta) and paste it. Format:
```
Chapter Number | Chapter Title | Page Number
1 | Chapter Name | 1
2 | Another Chapter | 25
...
```

### Option 2: Provide Page Offset
If the TOC page numbers don't match PDF page numbers, just tell me:
- "Chapter 1 starts at PDF page X" (where X is the actual PDF page number)
- I'll calculate the offset and update all chapters automatically

### Option 3: Use the Page Finder Tool
1. Open: http://127.0.0.1:8001/find-page-numbers.html
2. Navigate through the PDF
3. For each chapter, select it and click "Set Page for This Chapter"
4. Click "Copy JavaScript Array" and paste the result

## Files Created

### New Textbook Viewers
- ✅ `textbook-medicine.html` - Medicine (Archit Boloor)
- ✅ `textbook-ophthalmology.html` - Ophthalmology (AK Khurana)
- ✅ `textbook-ent.html` - ENT (PL Dhingra)

### Updated Files
- ✅ `index.html` - Added "View Textbook" buttons for all 6 subjects
- ✅ `textbook-dcdutta.html` - Updated with correct page numbers

### PDF Files Copied
- ✅ `content/medicine-archit-boloor.pdf`
- ✅ `content/ophthalmology-khurana.pdf`
- ✅ `content/ent-dhingra.pdf`

## All Textbooks Summary

| Subject | Reference | Viewer Page | PDF File | Status |
|---------|-----------|-------------|----------|--------|
| Medicine | Archit Boloor | textbook-medicine.html | medicine-archit-boloor.pdf | ⏳ Need TOC |
| Surgery | SRB | textbook-srb.html | srb-surgery-6th.pdf | ⏳ Need TOC |
| Pediatrics | OP Ghai | textbook-ghai.html | ghai-pediatrics-8th.pdf | ⏳ Need TOC |
| ObGyn | DC Dutta | textbook-dcdutta.html | dc-dutta-obstetrics.pdf | ✅ Complete |
| ENT | PL Dhingra | textbook-ent.html | ent-dhingra.pdf | ⏳ Need TOC |
| Ophthalmology | AK Khurana | textbook-ophthalmology.html | ophthalmology-khurana.pdf | ⏳ Need TOC |

## Next Steps

When you're ready to update the page numbers:
1. Provide the TOC for any/all of the pending textbooks
2. I'll update the chapter arrays in each HTML file
3. Test the navigation to ensure chapters jump to correct pages
