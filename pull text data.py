import requests
import json
import re
from io import BytesIO
from collections import Counter

def download_pdf(url):
    """
    Download PDF from URL
    """
    try:
        print("Downloading PDF...")
        response = requests.get(url)
        response.raise_for_status()
        print(f"Downloaded {len(response.content)} bytes")
        return BytesIO(response.content)
    except Exception as e:
        print(f"Error downloading PDF: {e}")
        return None

def extract_with_pymupdf(pdf_bytes, start_page=47, end_page=650):
    """
    Extract text using PyMuPDF
    """
    try:
        import fitz  # PyMuPDF
        print("Using PyMuPDF for extraction...")
        
        doc = fitz.open(stream=pdf_bytes.getvalue(), filetype="pdf")
        total_pages = len(doc)
        end_page = min(end_page, total_pages)
        
        print(f"Extracting pages {start_page + 1} to {end_page}...")
        
        all_text = ""
        
        for page_num in range(start_page, end_page):
            if page_num % 50 == 0:
                print(f"Processing page {page_num + 1}/{end_page}...")
            
            try:
                page = doc[page_num]
                page_text = page.get_text()
                all_text += f"\n=== PAGE {page_num + 1} ===\n{page_text}\n"
            except Exception as e:
                print(f"Error extracting page {page_num + 1}: {e}")
                all_text += f"\n=== PAGE {page_num + 1} ===\nERROR: {e}\n"
        
        doc.close()
        return all_text
        
    except ImportError:
        print("PyMuPDF not installed. Installing...")
        import subprocess
        import sys
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pymupdf"])
        
        import fitz
        return extract_with_pymupdf(pdf_bytes, start_page, end_page)
    except Exception as e:
        print(f"PyMuPDF extraction failed: {e}")
        return None

def find_section_boundaries(text):
    """
    Find the start and end positions of our target section
    """
    start_markers = [
        "THE 80 FIRST GRADE CHARACTERS",
        "80 FIRST GRADE CHARACTERS",
        "FIRST GRADE CHARACTERS"
    ]
    
    start_pos = -1
    start_marker_found = None
    
    for marker in start_markers:
        pos = text.find(marker)
        if pos != -1:
            start_pos = pos
            start_marker_found = marker
            print(f"Found start marker: '{marker}' at position {pos}")
            break
    
    end_markers = [
        "READINGS INDEX & STROKE COUNT",
        "READINGS INDEX",
        "STROKE COUNT"
    ]
    
    end_pos = -1
    end_marker_found = None
    
    for marker in end_markers:
        pos = text.find(marker, start_pos if start_pos != -1 else 0)
        if pos != -1:
            end_pos = pos
            end_marker_found = marker
            print(f"Found end marker: '{marker}' at position {pos}")
            break
    
    if end_pos == -1:
        end_pos = len(text)
        end_marker_found = "END_OF_DOCUMENT"
    
    return start_pos, end_pos, start_marker_found, end_marker_found

def is_kanji(char):
    """
    Check if a character is a kanji
    """
    return 0x4E00 <= ord(char) <= 0x9FAF

def extract_compound_words(text):
    """
    Extract compound words (Japanese text + romaji + meaning) from the text
    """
    lines = text.split('\n')
    compound_words = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Look for lines that contain Japanese characters followed by romaji and meaning
        # Pattern: Japanese characters, then uppercase romaji, then lowercase meaning
        # Example: "一月 ICHIGATSU   January" or "右派 UHA   rightist faction"
        
        # Split line into parts
        parts = line.split()
        if len(parts) < 3:
            continue
        
        # First part should contain Japanese characters
        japanese_part = parts[0]
        if not any(is_kanji(char) for char in japanese_part):
            continue
        
        # Second part should be uppercase romaji
        romaji_part = parts[1]
        if not romaji_part.isupper():
            continue
        
        # Rest should be the meaning
        meaning = ' '.join(parts[2:])
        
        compound_words.append({
            'japanese': japanese_part,
            'romaji': romaji_part,
            'meaning': meaning,
            'source_line': line
        })
    
    return compound_words

def extract_pronunciation_lines(text):
    """
    Extract standalone pronunciation lines (ON and kun readings)
    """
    lines = text.split('\n')
    pronunciation_lines = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Look for lines that are purely pronunciation
        # Pattern: UPPERCASE (on-reading), lowercase with hyphens (kun-reading)
        # Example: "ICHI, ITSU, hito-" or "U, YŪ, migi"
        
        # Check if line contains both uppercase and lowercase romaji patterns
        has_uppercase = bool(re.search(r'[A-ZŌŪĪĀĒĚǑĚǓ]', line))
        has_lowercase = bool(re.search(r'[a-z\-]', line))
        
        # Should not contain Japanese characters (since main kanji is an image)
        has_japanese = any(ord(char) > 127 and not char.isascii() for char in line)
        
        # Should not contain English meaning words
        meaning_words = ['january', 'february', 'march', 'right', 'left', 'rain', 'heavy', 'cloud', 'control', 'faction', 'uniformity', 'person', 'hand', 'season']
        has_meaning = any(word in line.lower() for word in meaning_words)
        
        if has_uppercase and not has_japanese and not has_meaning:
            # This looks like a pronunciation line
            pronunciation_lines.append({
                'pronunciation': line,
                'source_line': line
            })
    
    return pronunciation_lines

def group_kanji_entries(compound_words, pronunciation_lines):
    """
    Group compound words by their common kanji and associate with pronunciations
    """
    # Count frequency of each kanji character across all compound words
    kanji_frequency = Counter()
    kanji_compounds = {}
    
    for compound in compound_words:
        japanese = compound['japanese']
        for char in japanese:
            if is_kanji(char):
                kanji_frequency[char] += 1
                if char not in kanji_compounds:
                    kanji_compounds[char] = []
                kanji_compounds[char].append(compound)
    
    # Get the most frequent kanji (these are likely the main kanji being taught)
    most_common_kanji = kanji_frequency.most_common(100)  # Top 100 most frequent
    
    print(f"Found {len(most_common_kanji)} unique kanji characters")
    print(f"Top 10 most frequent: {[k for k, c in most_common_kanji[:10]]}")
    
    # Create kanji entries
    kanji_entries = []
    
    for i, (kanji_char, frequency) in enumerate(most_common_kanji):
        compounds = kanji_compounds[kanji_char]
        
        # Try to find a matching pronunciation line
        # This is tricky since we don't have direct association
        # We'll use the index/position as a rough guide
        associated_pronunciation = None
        if i < len(pronunciation_lines):
            associated_pronunciation = pronunciation_lines[i]['pronunciation']
        
        entry = {
            'kanji': kanji_char,
            'frequency_in_compounds': frequency,
            'compounds': compounds,
            'pronunciation': associated_pronunciation,
            'entry_index': i + 1
        }
        
        kanji_entries.append(entry)
    
    return kanji_entries

def extract_mnemonics(text):
    """
    Extract mnemonic lines from the text
    """
    lines = text.split('\n')
    mnemonics = []
    
    for line in lines:
        line = line.strip()
        if line.startswith('Mnemonic:'):
            mnemonic_text = line.replace('Mnemonic:', '').strip()
            mnemonics.append(mnemonic_text)
    
    return mnemonics

def analyze_extracted_data(kanji_entries, compound_words, pronunciation_lines, mnemonics):
    """
    Analyze the extracted data
    """
    return {
        'total_kanji_entries': len(kanji_entries),
        'total_compound_words': len(compound_words),
        'total_pronunciation_lines': len(pronunciation_lines),
        'total_mnemonics': len(mnemonics),
        'sample_kanji': [entry['kanji'] for entry in kanji_entries[:10]],
        'sample_compounds': [comp['japanese'] for comp in compound_words[:10]],
        'sample_pronunciations': [pron['pronunciation'] for pron in pronunciation_lines[:5]]
    }

def main():
    """
    Main function to extract kanji data from compound words
    """
    pdf_url = "https://safiria.net/nihongo/The%20Complete%20Guide%20to%20Japanese%20Kanji.pdf"
    
    # Download PDF
    pdf_bytes = download_pdf(pdf_url)
    if not pdf_bytes:
        print("Failed to download PDF")
        return
    
    # Extract text
    print("Extracting text with PyMuPDF...")
    all_text = extract_with_pymupdf(pdf_bytes)
    
    if not all_text:
        print("Failed to extract text")
        return
    
    # Find section boundaries
    print("Finding section boundaries...")
    start_pos, end_pos, start_marker, end_marker = find_section_boundaries(all_text)
    
    if start_pos == -1:
        print("Could not find target section!")
        return
    
    # Extract target section
    target_text = all_text[start_pos:end_pos]
    print(f"Target section length: {len(target_text)} characters")
    
    # Extract different types of data
    print("Extracting compound words...")
    compound_words = extract_compound_words(target_text)
    print(f"Found {len(compound_words)} compound words")
    
    print("Extracting pronunciation lines...")
    pronunciation_lines = extract_pronunciation_lines(target_text)
    print(f"Found {len(pronunciation_lines)} pronunciation lines")
    
    print("Extracting mnemonics...")
    mnemonics = extract_mnemonics(target_text)
    print(f"Found {len(mnemonics)} mnemonics")
    
    # Group into kanji entries
    print("Grouping data into kanji entries...")
    kanji_entries = group_kanji_entries(compound_words, pronunciation_lines)
    
    # Analyze results
    analysis = analyze_extracted_data(kanji_entries, compound_words, pronunciation_lines, mnemonics)
    
    print(f"\nExtraction complete!")
    print(f"  - {analysis['total_kanji_entries']} kanji entries identified")
    print(f"  - {analysis['total_compound_words']} compound words extracted")
    print(f"  - {analysis['total_pronunciation_lines']} pronunciation lines found")
    print(f"  - {analysis['total_mnemonics']} mnemonics extracted")
    
    # Prepare output
    output_data = {
        'extraction_info': {
            'pdf_url': pdf_url,
            'method': 'Compound word analysis (main kanji extracted from examples)',
            'section_markers': {
                'start': start_marker,
                'end': end_marker
            }
        },
        'analysis': analysis,
        'kanji_entries': kanji_entries,
        'raw_data': {
            'compound_words': compound_words,
            'pronunciation_lines': pronunciation_lines,
            'mnemonics': mnemonics
        },
        'notes': [
            'Main kanji characters are images in PDF, so extracted from compound words',
            'Pronunciations are associated by position/frequency',
            'Each kanji entry includes all compound words containing that kanji'
        ]
    }
    
    # Save results
    output_filename = 'kanji_from_compounds.json'
    with open(output_filename, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"\nSaved extracted data to '{output_filename}'")
    
    # Show preview
    print("\n" + "="*60)
    print("PREVIEW OF EXTRACTED KANJI ENTRIES:")
    print("="*60)
    
    for i, entry in enumerate(kanji_entries[:5]):  # Show first 5 entries
        print(f"\nEntry {i+1}: {entry['kanji']}")
        print(f"  Pronunciation: {entry['pronunciation']}")
        print(f"  Appears in {entry['frequency_in_compounds']} compounds")
        print(f"  Sample compounds:")
        for comp in entry['compounds'][:3]:  # Show first 3 compounds
            print(f"    {comp['japanese']} {comp['romaji']} - {comp['meaning']}")
    
    print(f"\nCheck '{output_filename}' for complete results!")

if __name__ == "__main__":
    main()