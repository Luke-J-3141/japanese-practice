import requests
import PyPDF2
import re
import json
from io import BytesIO

def romaji_to_hiragana(romaji):
    """
    Convert romaji to hiragana with proper long vowel handling
    """
    if not romaji:
        return ""
    
    # Handle macrons and long vowels
    romaji = romaji.lower().strip()
    romaji = romaji.replace('ā', 'aa').replace('ī', 'ii').replace('ū', 'uu')
    romaji = romaji.replace('ē', 'ee').replace('ō', 'ou')
    
    # Basic romaji to hiragana mapping
    conversions = {
        # Single vowels
        'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
        
        # K sounds
        'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
        'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
        
        # S sounds
        'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
        'za': 'ざ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
        
        # T sounds
        'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
        'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
        
        # N sounds
        'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
        
        # H sounds
        'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
        'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
        'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
        
        # M sounds
        'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
        
        # Y sounds
        'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
        
        # R sounds
        'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
        
        # W sounds and N
        'wa': 'わ', 'wi': 'ゐ', 'we': 'ゑ', 'wo': 'を', 'n': 'ん',
        
        # Combinations for long vowels
        'aa': 'ああ', 'ii': 'いい', 'uu': 'うう', 'ee': 'ええ', 'ou': 'おう',
        
        # Special combinations
        'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
        'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ',
        'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ',
        'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
        'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
        'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
        'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ',
        'gya': 'ぎゃ', 'gyu': 'ぎゅ', 'gyo': 'ぎょ',
        'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ',
        'bya': 'びゃ', 'byu': 'びゅ', 'byo': 'びょ',
        'pya': 'ぴゃ', 'pyu': 'ぴゅ', 'pyo': 'ぴょ'
    }
    
    # Sort by length (longest first) to handle multi-character combinations
    sorted_keys = sorted(conversions.keys(), key=len, reverse=True)
    
    result = romaji
    for rom in sorted_keys:
        result = result.replace(rom, conversions[rom])
    
    return result

def download_pdf(url):
    """
    Download PDF from URL
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        return BytesIO(response.content)
    except Exception as e:
        print(f"Error downloading PDF: {e}")
        return None

def extract_text_from_pdf(pdf_file, start_page=47, end_page=None):
    """
    Extract text from specific pages of PDF file (starting from page 48-49)
    """
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        
        if end_page is None:
            end_page = len(pdf_reader.pages)
        
        print(f"Processing pages {start_page + 1} to {min(end_page, len(pdf_reader.pages))}...")
        
        for page_num in range(start_page, min(end_page, len(pdf_reader.pages))):
            if page_num % 10 == 0:  # Progress indicator
                print(f"Processing page {page_num + 1}...")
            
            page_text = pdf_reader.pages[page_num].extract_text()
            text += f"\n--- PAGE {page_num + 1} ---\n" + page_text + "\n"
        
        return text
    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        return None

def find_kanji_section_start(text):
    """
    Find where the kanji entries actually start
    """
    # Look for "THE 80 FIRST GRADE CHARACTERS" or similar markers
    markers = [
        "THE 80 FIRST GRADE CHARACTERS",
        "FIRST GRADE CHARACTERS",
        "THE KANJI"
    ]
    
    for marker in markers:
        if marker in text:
            start_pos = text.find(marker)
            print(f"Found section marker: '{marker}' at position {start_pos}")
            return start_pos
    
    return 0

def parse_kanji_entries(text):
    """
    Parse kanji entries from the PDF text based on the actual structured format
    """
    entries = []
    
    # Find the start of kanji entries
    start_pos = find_kanji_section_start(text)
    text = text[start_pos:]
    
    # Split into potential entry blocks - look for the number + L? pattern
    # Pattern: number (1-2 digits), possibly followed by L? grade indicator
    entry_pattern = r'\n(\d{1,2})\s*\n(L\d+)?\s*\n'
    
    # Split text using the entry pattern
    parts = re.split(entry_pattern, text)
    
    print(f"Split text into {len(parts)} parts")
    
    # Process every 3rd part (number, grade, content)
    i = 1
    while i < len(parts):
        if i + 2 < len(parts):
            entry_number = parts[i].strip()
            grade_level = parts[i + 1].strip() if parts[i + 1] else None
            entry_content = parts[i + 2].strip()
            
            if entry_number and entry_content:
                entry = parse_single_kanji_entry(entry_content, entry_number, grade_level)
                if entry:
                    entries.append(entry)
                    print(f"Parsed entry {entry_number}: {entry.get('kanji', 'Unknown')}")
                
                # Parse compounds from this entry
                compounds = parse_compound_words_from_entry(entry_content, entry_number, 
                                                          entry.get('kanji') if entry else None)
                entries.extend(compounds)
            
            i += 3
        else:
            break
    
    return entries

def parse_single_kanji_entry(content, entry_number, grade_level):
    """
    Parse a single kanji entry from the content block
    """
    lines = [line.strip() for line in content.split('\n') if line.strip()]
    
    if not lines:
        return None
    
    # Find the kanji character - should be a single Japanese character
    kanji_char = None
    kanji_line_idx = -1
    
    for i, line in enumerate(lines):
        # Look for a line with a single Japanese character
        if len(line) == 1 and ord(line) > 127:  # Japanese character
            kanji_char = line
            kanji_line_idx = i
            break
    
    if not kanji_char:
        return None
    
    # Look for readings and meaning on the next line
    on_reading = None
    kun_reading = None
    meaning = None
    strokes = None
    mnemonic = None
    
    # Parse readings and meaning - format like "ICHI, ITSU, hito- one"
    if kanji_line_idx + 1 < len(lines):
        reading_line = lines[kanji_line_idx + 1]
        
        # Try to extract readings and meaning
        # Pattern: UPPERCASE (on-reading), lowercase (kun-reading), meaning
        reading_match = re.match(r'([A-ZŌŪĪĀĒ,\s]+)(?:\s+([a-z\-,\s]+))?\s+(.+)', reading_line)
        
        if reading_match:
            on_part = reading_match.group(1).strip()
            kun_part = reading_match.group(2).strip() if reading_match.group(2) else None
            meaning = reading_match.group(3).strip()
            
            # Clean up readings
            if on_part:
                on_reading = on_part.replace(',', '').strip()
            if kun_part:
                kun_reading = kun_part.replace(',', '').strip()
    
    # Look for stroke count
    for line in lines:
        stroke_match = re.search(r'(\d+)\s+strokes?', line, re.IGNORECASE)
        if stroke_match:
            strokes = int(stroke_match.group(1))
            break
    
    # Look for mnemonic
    for line in lines:
        if 'mnemonic:' in line.lower():
            mnemonic_match = re.search(r'mnemonic:\s*(.+)', line, re.IGNORECASE)
            if mnemonic_match:
                mnemonic = mnemonic_match.group(1).strip()
            break
    
    return {
        'type': 'kanji',
        'entry_number': entry_number,
        'kanji': kanji_char,
        'on_reading': on_reading,
        'kun_reading': kun_reading,
        'meaning': meaning,
        'mnemonic': mnemonic,
        'strokes': strokes,
        'level': grade_level,
        'source_text': content[:300] + '...' if len(content) > 300 else content
    }

def parse_compound_words_from_entry(content, entry_number, main_kanji):
    """
    Parse compound words from the entry content
    """
    if not main_kanji:
        return []
    
    compounds = []
    lines = content.split('\n')
    
    # Look for lines with Japanese text + romaji + meaning
    for line in lines:
        line = line.strip()
        if not line or len(line) < 3:
            continue
        
        # Skip the main kanji line and stroke/mnemonic lines
        if (line == main_kanji or 
            'stroke' in line.lower() or 
            'mnemonic' in line.lower() or
            line.startswith('L')):
            continue
        
        # Look for pattern: Japanese text + ROMAJI + meaning
        # The Japanese text should contain the main kanji
        japanese_chars = re.findall(r'[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+', line)
        
        for japanese_text in japanese_chars:
            if main_kanji in japanese_text and len(japanese_text) > 1:
                # Extract the rest of the line after the Japanese text
                remaining = line.split(japanese_text, 1)
                if len(remaining) > 1:
                    rest = remaining[1].strip()
                    
                    # Look for ROMAJI (uppercase) and meaning
                    romaji_match = re.search(r'([A-ZŌŪĪĀĒ]+)\s+(.+)', rest)
                    if romaji_match:
                        romaji = romaji_match.group(1).strip()
                        meaning = romaji_match.group(2).strip()
                        
                        compound = {
                            'type': 'compound',
                            'entry_number': entry_number,
                            'kanji': japanese_text,
                            'main_kanji': main_kanji,
                            'romaji': romaji,
                            'meaning': meaning,
                            'hiragana': romaji_to_hiragana(romaji.lower()),
                            'source_text': line
                        }
                        
                        compounds.append(compound)
    
    return compounds

def convert_to_vocabulary_format(entry, base_id_prefix="kanji"):
    """
    Convert parsed entry to vocabulary format
    """
    if not entry:
        return None
    
    # Generate unique ID
    if entry['type'] == 'kanji':
        vocab_id = f"{base_id_prefix}_{entry['kanji']}_{entry['entry_number']}"
    else:  # compound
        clean_kanji = re.sub(r'[^\w]', '', entry['kanji'])
        vocab_id = f"compound_{clean_kanji}_{entry['entry_number']}"
    
    # Determine frequency based on level and type
    frequency_score = 3  # default
    if entry.get('level') == 'L1':
        frequency_score = 5
    elif entry.get('level') == 'L2':
        frequency_score = 4
    elif entry.get('level') == 'L3':
        frequency_score = 3
    elif entry['type'] == 'compound':
        frequency_score = 2  # compounds are generally less frequent
    
    # Create tags
    tags = [entry['type']]
    if entry.get('level'):
        tags.append(entry['level'].lower())
    if entry.get('strokes'):
        if entry['strokes'] <= 5:
            tags.append("simple")
        elif entry['strokes'] >= 15:
            tags.append("complex")
    
    # Handle different entry types
    if entry['type'] == 'kanji':
        vocab_entry = {
            "id": vocab_id,
            "english": entry.get('meaning', ''),
            "hiragana": romaji_to_hiragana(entry.get('kun_reading', '') or ''),
            "katakana": romaji_to_hiragana(entry.get('on_reading', '') or ''),
            "kanji": entry['kanji'],
            "romaji": (entry.get('kun_reading') or entry.get('on_reading') or '').lower(),
            "commonWriting": entry['kanji'],
            "wordType": "kanji",
            "frequency": frequency_score,
            "jlptLevel": "",
            "pronunciation": "01",
            "tags": tags,
            "relatedWords": [],
            "mnemonic": entry.get('mnemonic', ''),
            "strokes": entry.get('strokes'),
            "level": entry.get('level', '')
        }
    else:  # compound
        vocab_entry = {
            "id": vocab_id,
            "english": entry.get('meaning', ''),
            "hiragana": entry.get('hiragana', ''),
            "katakana": "",
            "kanji": entry['kanji'],
            "romaji": entry.get('romaji', '').lower(),
            "commonWriting": entry['kanji'],
            "wordType": "compound",
            "frequency": frequency_score,
            "jlptLevel": "",
            "pronunciation": "01",
            "tags": tags,
            "relatedWords": [entry.get('main_kanji', '')],
            "mainKanji": entry.get('main_kanji', '')
        }
    
    return vocab_entry

def main():
    """
    Main function to download PDF and parse kanji entries from pages 48+
    """
    pdf_url = "https://safiria.net/nihongo/The%20Complete%20Guide%20to%20Japanese%20Kanji.pdf"
    
    print("Downloading PDF...")
    pdf_file = download_pdf(pdf_url)
    
    if not pdf_file:
        print("Failed to download PDF")
        return
    
    print("Extracting text from PDF (starting from page 48)...")
    # Start from page 47 (0-indexed) which is page 48
    text = extract_text_from_pdf(pdf_file, start_page=47, end_page=60)  # Limit for testing
    
    if not text:
        print("Failed to extract text from PDF")
        return
    
    print(f"Extracted {len(text)} characters of text")
    
    # Save raw text for debugging
    with open('./raw_pdf_text.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Saved raw text to './raw_pdf_text.txt' for debugging")
    
    print("Parsing kanji entries and compounds...")
    entries = parse_kanji_entries(text)
    
    print(f"Found {len(entries)} total entries")
    
    # Separate main kanji and compounds
    kanji_entries = [e for e in entries if e['type'] == 'kanji']
    compound_entries = [e for e in entries if e['type'] == 'compound']
    
    print(f"- {len(kanji_entries)} main kanji entries")
    print(f"- {len(compound_entries)} compound word entries")
    
    # Convert to vocabulary format
    vocab_entries = []
    for entry in entries:
        vocab_entry = convert_to_vocabulary_format(entry)
        if vocab_entry:
            vocab_entries.append(vocab_entry)
    
    # Save results
    output_data = {
        'kanji': [v for v in vocab_entries if v['wordType'] == 'kanji'],
        'compounds': [v for v in vocab_entries if v['wordType'] == 'compound'],
        'total_entries': len(vocab_entries),
        'raw_entries': entries  # Include raw parsed data for debugging
    }
    
    with open('./pdf_kanji_vocabulary.json', 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(vocab_entries)} entries to './pdf_kanji_vocabulary.json'")
    
    # Show examples
    if output_data['kanji']:
        print("\nSample main kanji entries:")
        for entry in output_data['kanji'][:3]:
            print(f"- {entry['kanji']}: {entry['english']} ({entry['romaji']})")
            if entry.get('mnemonic'):
                print(f"  Mnemonic: {entry['mnemonic']}")
    
    if output_data['compounds']:
        print("\nSample compound entries:")
        for entry in output_data['compounds'][:3]:
            print(f"- {entry['kanji']}: {entry['english']} ({entry['romaji']})")
            print(f"  Contains kanji: {entry.get('mainKanji', '')}")

# Test the parsing with the sample format you provided
def test_with_sample():
    """
    Test with sample data matching your PDF format
    """
    sample_text = """--- PAGE 48 ---
THE KANJI 
THE 80 FIRST GRADE CHARACTERS

1
L5
一
ICHI, ITSU, hito-
one
1 stroke

ICHIGATSU January
KIN'ITSU uniformity 
hitori* one person

Mnemonic: ONE FINGER

2
L5
右
U, YŪ, migi
right
5 strokes

UHA rightist faction
SAYŪ control
migi right hand

Mnemonic: RIGHT HAND TO THE MOUTH"""
    
    print("Testing with sample data:")
    entries = parse_kanji_entries(sample_text)
    
    print(f"\nFound {len(entries)} entries:")
    for entry in entries:
        print(f"\n{entry['type'].upper()}: {entry}")
        if entry['type'] == 'kanji':
            vocab = convert_to_vocabulary_format(entry)
            print(f"VOCAB FORMAT: {vocab}")

if __name__ == "__main__":
    print("Testing with sample data first...")
    test_with_sample()
    
    print("\n" + "="*70)
    print("Running full PDF processing...")
    main()