import json
import requests
import zipfile
import os
from typing import List, Dict, Optional

class JMDictJSONReader:
    def __init__(self, json_file_path: str = None):
        """
        Initialize JMDict JSON reader (uses simplified JSON format)
        
        Args:
            json_file_path: Path to JMDict JSON file
        """
        self.json_file = json_file_path
        self.entries = []
        self.loaded = False
        
    def download_jmdict_json(self, save_path: str = "jmdict-eng.json"):
        """
        Download simplified JMDict JSON file from GitHub
        """
        # Using the latest release from the GitHub releases page
        version = "3.6.1+20250630122532"
        url = f"https://github.com/scriptin/jmdict-simplified/releases/download/{version}/jmdict-eng-{version}.json.zip"
        zip_path = "jmdict-eng.json.zip"
        
    def download_jmdict_json(self, save_path: str = "jmdict-eng.json"):
        """
        Download simplified JMDict JSON file from GitHub
        """
        # Try multiple recent versions in case one fails
        versions = [
            "3.6.1+20250630122532",
            "3.6.1+20250623122643", 
            "3.6.1+20250616123022"
        ]
        
        zip_path = "jmdict-eng.json.zip"
        
        for version in versions:
            url = f"https://github.com/scriptin/jmdict-simplified/releases/download/{version}/jmdict-eng-{version}.json.zip"
            
            try:
                print(f"Trying to download JMDict JSON from {url}...")
                response = requests.get(url, stream=True, timeout=60)
                response.raise_for_status()
                
                # Download zip file
                with open(zip_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                
                # Extract JSON file
                with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                    # Extract all files (should contain the JSON file)
                    zip_ref.extractall(".")
                    # Find the JSON file in extracted files
                    for file_name in zip_ref.namelist():
                        if file_name.endswith('.json'):
                            extracted_file = file_name
                            # Rename to our desired name
                            if os.path.exists(extracted_file):
                                os.rename(extracted_file, save_path)
                                break
                
                # Clean up zip file
                if os.path.exists(zip_path):
                    os.remove(zip_path)
                
                if os.path.exists(save_path):
                    print(f"Successfully downloaded and extracted JMDict JSON to {save_path}")
                    self.json_file = save_path
                    return True
                else:
                    print("Failed to extract JSON file from archive")
                    continue
                    
            except Exception as e:
                print(f"Failed to download version {version}: {e}")
                continue
    
    def load_jmdict_json(self, limit: int = None):
        """
        Load simplified JMDict JSON file (single JSON object with 'words' array)
        
        Args:
            limit: Limit number of entries to load (for testing)
        """
        if not self.json_file or not os.path.exists(self.json_file):
            print("JMDict JSON file not found. Attempting to download...")
            if not self.download_jmdict_json():
                return False
        
        print("Loading JMDict JSON entries...")
        
        try:
            with open(self.json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Check the structure
            if not isinstance(data, dict):
                print("ERROR: Expected JSON object at root level")
                return False
            
            print(f"DEBUG: JSON structure keys: {list(data.keys())}")
            print(f"DEBUG: Dictionary version: {data.get('version', 'unknown')}")
            print(f"DEBUG: Dictionary date: {data.get('dictDate', 'unknown')}")
            
            # Get the words array
            words = data.get('words', [])
            if not words:
                print("ERROR: No 'words' array found in JSON")
                return False
            
            print(f"DEBUG: Found {len(words)} total words in dictionary")
            
            count = 0
            for i, entry in enumerate(words):
                if limit and count >= limit:
                    break
                
                if i == 0:  # Debug first entry
                    print(f"DEBUG: First entry structure: {list(entry.keys())}")
                    print(f"DEBUG: Sample kanji: {entry.get('kanji', [])}")
                    print(f"DEBUG: Sample kana: {entry.get('kana', [])}")
                    print(f"DEBUG: Sample sense: {entry.get('sense', [])[:1]}")
                
                parsed_entry = self._parse_json_entry(entry)
                if parsed_entry:
                    self.entries.append(parsed_entry)
                    count += 1
                    
                    # Show progress for large files
                    if count % 5000 == 0:
                        print(f"Processed {count} entries...")
            
            print(f"Loaded {len(self.entries)} valid entries from JMDict JSON")
            self.loaded = True
            return True
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            return False
        except Exception as e:
            print(f"Error loading JMDict JSON: {e}")
            return False
    
    def _parse_json_entry(self, entry) -> Optional[Dict]:
        """
        Parse a single JMDict JSON entry (actual format from jmdict-simplified)
        """
        try:
            # Get kanji forms
            kanji_forms = []
            for kanji in entry.get('kanji', []):
                text = kanji.get('text', '')
                if text:
                    kanji_forms.append(text)
            
            # Get reading forms (kana - both hiragana and katakana)  
            reading_forms = []
            for kana in entry.get('kana', []):
                text = kana.get('text', '')
                if text:
                    reading_forms.append(text)
            
            # Get meanings/senses
            meanings = []
            for sense in entry.get('sense', []):
                # Get English glosses
                english_defs = []
                for gloss in sense.get('gloss', []):
                    if gloss.get('lang') == 'eng':
                        text = gloss.get('text', '')
                        if text:
                            english_defs.append(text)
                
                # Get parts of speech
                pos_list = sense.get('partOfSpeech', [])
                
                if english_defs:
                    meanings.append({
                        'definitions': english_defs,
                        'pos': pos_list
                    })
            
            # Only return entries that have meanings
            if not meanings:
                return None
            
            # Skip entries that are just punctuation marks or symbols (for cleaner data)
            if not kanji_forms and reading_forms:
                # Check if it's just a single character symbol
                if len(reading_forms) == 1 and len(reading_forms[0]) == 1:
                    first_char = reading_forms[0]
                    # Skip single symbol entries unless they're common kana
                    if first_char in 'ヽヾゝゞー・':
                        return None
            
            # Skip entries with no kanji and very short kana (likely symbols)
            if not kanji_forms and reading_forms:
                if all(len(reading) <= 1 for reading in reading_forms):
                    return None
            
            return {
                'id': str(entry.get('id', 'unknown')),
                'kanji': kanji_forms,
                'readings': reading_forms,
                'meanings': meanings
            }
            
        except Exception as e:
            print(f"Error parsing JSON entry: {e}")
            return None
    
    def search_word(self, query: str, max_results: int = 10) -> List[Dict]:
        """
        Search for words in the loaded dictionary
        """
        if not self.loaded:
            print("Dictionary not loaded. Please call load_jmdict_json() first.")
            return []
        
        results = []
        query_lower = query.lower()
        
        for entry in self.entries:
            if len(results) >= max_results:
                break
            
            # Check kanji forms
            if any(query in kanji for kanji in entry['kanji']):
                results.append(entry)
                continue
            
            # Check readings
            if any(query in reading for reading in entry['readings']):
                results.append(entry)
                continue
            
            # Check English definitions
            for meaning in entry['meanings']:
                if any(query_lower in definition.lower() for definition in meaning['definitions']):
                    results.append(entry)
                    break
        
        return results
    
    def display_entry(self, entry: Dict):
        """
        Display a single dictionary entry in a formatted way
        """
        print(f"\n{'='*50}")
        print(f"Entry ID: {entry['id']}")
        
        # Display kanji forms
        if entry['kanji']:
            print(f"Kanji: {' | '.join(entry['kanji'])}")
        
        # Display readings (hiragana/katakana)
        if entry['readings']:
            print(f"Readings: {' | '.join(entry['readings'])}")
        
        # Display meanings
        print("Meanings:")
        for i, meaning in enumerate(entry['meanings'], 1):
            pos_str = f" [{', '.join(meaning['pos'])}]" if meaning['pos'] else ""
            print(f"  {i}. {'; '.join(meaning['definitions'])}{pos_str}")
    
    def display_search_results(self, query: str, max_results: int = 5):
        """
        Search and display results for a query
        """
        print(f"\nSearching for: '{query}'")
        results = self.search_word(query, max_results)
        
        if not results:
            print("No results found.")
            return
        
        print(f"\nFound {len(results)} result(s):")
        for entry in results:
            self.display_entry(entry)
    
    def get_random_entries(self, count: int = 5) -> List[Dict]:
        """
        Get random entries for quiz generation
        """
        import random
        if not self.loaded:
            return []
        
        return random.sample(self.entries, min(count, len(self.entries)))
    
    def export_for_quiz_app(self, output_file: str = "quiz_data.json"):
        """
        Export data in a format suitable for your quiz app
        """
        if not self.loaded:
            print("Dictionary not loaded.")
            return False
        
        quiz_data = []
        for entry in self.entries:
            # Only include entries that have both kanji and readings
            if entry['kanji'] and entry['readings'] and entry['meanings']:
                quiz_entry = {
                    'kanji': entry['kanji'][0],  # Primary kanji
                    'hiragana': entry['readings'][0],  # Primary reading
                    'english': entry['meanings'][0]['definitions'][0],  # Primary definition
                    'all_kanji': entry['kanji'],
                    'all_readings': entry['readings'],
                    'all_meanings': [m['definitions'] for m in entry['meanings']]
                }
                quiz_data.append(quiz_entry)
        
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(quiz_data, f, ensure_ascii=False, indent=2)
            
            print(f"Exported {len(quiz_data)} entries to {output_file}")
            return True
        except Exception as e:
            print(f"Error exporting data: {e}")
            return False

# Example usage
def main():
    # Initialize JSON reader
    reader = JMDictJSONReader()
    
    # Load dictionary (limit to 1000 entries for demo)
    print("Loading JMDict JSON (demo limited to 1000 entries)...")
    if reader.load_jmdict_json():
        
        # Example searches
        test_queries = ["犬", "dog", "食べる", "eat", "本", "book"]
        
        for query in test_queries:
            reader.display_search_results(query, max_results=2)
            print("\n" + "-"*50)
        
        # Export data for quiz app
        reader.export_for_quiz_app("./word_data.json")
        
        # Show random entries
        print("\n" + "="*60)
        print("Random entries for quiz:")
        random_entries = reader.get_random_entries(3)
        for entry in random_entries:
            reader.display_entry(entry)
        
        # Interactive search
        # print("\nInteractive search (type 'quit' to exit):")
        while False:
            query = input("\nEnter search term: ").strip()
            if query.lower() == 'quit':
                break
            if query:
                reader.display_search_results(query, max_results=3)

if __name__ == "__main__":
    main()