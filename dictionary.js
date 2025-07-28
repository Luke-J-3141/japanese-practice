
// Speech function
function speakJapanese(text, lang = 'ja') {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
}

// Play Button Component
function PlayButton({ text, className = "" }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speakJapanese(text);
      }}
      className={`p-1 rounded-full hover:bg-gray-600 transition-colors ${className}`}
      title="Play pronunciation"
    >
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" className="text-blue-400">
        <polygon points="5,3 19,12 5,21" fill="currentColor" />
      </svg>
    </button>
  );
}

// Clickable Text Component for conjugations
function ClickableText({ japanese, romaji, label }) {
  return (
    <div className="flex items-center justify-between group">
      <div>
        <strong className="text-gray-200">{label}:</strong>{' '}
        <span 
          className="cursor-pointer hover:text-blue-300 transition-colors"
          onClick={() => speakJapanese(japanese)}
          title="Click to hear pronunciation"
        >
          {japanese}
        </span>
        <span className="ml-2 text-xs text-gray-400">({romaji})</span>
      </div>
      <svg 
        width={14} 
        height={14} 
        viewBox="0 0 24 24" 
        fill="none"
        className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-blue-400"
        onClick={() => speakJapanese(japanese)}
      >
        <polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5" fill="currentColor"/>
        <path d="M19.07,4.93A10,10,0,0,1,23,12a10,10,0,0,1-3.93,7.07" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M15.54,8.46A5,5,0,0,1,18,12a5,5,0,0,1-2.46,3.54" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    </div>
  );
}
// Dictionary Component
function Dictionary({ words, onSelectWord, selectedWord }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Word List */}
      <div className="bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-100">Vocabulary List</h2>
        <div className="h-96 overflow-y-auto" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#2563eb #1f2937'
        }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 8px;
            }
            div::-webkit-scrollbar-track {
              background: #1f2937;
              border-radius: 4px;
            }
            div::-webkit-scrollbar-thumb {
              background: #263b68ff;
              border-radius: 4px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: #3b83f698;
            }
          `}</style>
          <div className="space-y-2 pr-2">
            {words.map(word => (
              <div
                key={word.id}
                onClick={() => onSelectWord(word)}
                className={`p-3 rounded-md cursor-pointer border transition-colors ${
                  selectedWord?.id === word.id
                    ? 'border-blue-400 bg-blue-900/60 shadow-lg shadow-blue-900/20'
                    : 'border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div>
                      <span className="font-medium text-lg text-blue-100">{word.commonWriting}</span>
                      <span className="ml-2 text-gray-400">({word.romaji})</span>
                    </div>
                    <PlayButton text={word.hiragana} />
                  </div>
                  <span className="text-sm text-blue-200">{word.english}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Word Details */}
      <div className="bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-100">Word Details</h2>
        <div>
          {selectedWord ? (
            <WordDetails word={selectedWord} />
          ) : (
            <p className="text-gray-400">Select a word to see details</p>
          )}
        </div>
      </div>
    </div>
  );
}


// Word Details Component
function WordDetails({ word }) {
  const conjugations = getConjugations(word);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-2 text-white flex items-center gap-2">
          Writing Systems
          <PlayButton text={word.hiragana} />
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
          <div><strong className="text-gray-200">Kanji:</strong> {word.kanji}</div>
          <div><strong className="text-gray-200">Hiragana:</strong> {word.hiragana}</div>
          <div><strong className="text-gray-200">Katakana:</strong> {word.katakana}</div>
          <div><strong className="text-gray-200">Romaji:</strong> {word.romaji}</div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-white">Information</h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
          <div><strong className="text-gray-200">Type:</strong> {word.wordType}</div>
          <div><strong className="text-gray-200">JLPT/Difficulty:</strong> {word.jlptLevel}</div>
          <div><strong className="text-gray-200">Frequency:</strong> {word.frequency}/5</div>
          <div><strong className="text-gray-200">English:</strong> {word.english}</div>
        </div>
      </div>

      {word.tags && (
        <div>
          <h3 className="font-semibold mb-2 text-white">Tags</h3>
          <div className="flex flex-wrap gap-1">
            {word.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-blue-800 text-blue-200 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {conjugations && (
        <div>
          <h3 className="font-semibold mb-2 text-white">Conjugations</h3>
          <div className="text-sm space-y-2 text-gray-300">
            {word.wordType === 'godan-verb' && (
              <>
                <ClickableText 
                  japanese={conjugations.polite.present}
                  romaji={conjugations.polite.present.replace('ます', 'masu')}
                  label="Present"
                />
                <ClickableText 
                  japanese={conjugations.polite.past}
                  romaji={conjugations.polite.past.replace('ました', 'mashita')}
                  label="Past"
                />
                <ClickableText 
                  japanese={conjugations.polite.negative}
                  romaji={conjugations.polite.negative.replace('ません', 'masen')}
                  label="Negative"
                />
                <ClickableText 
                  japanese={conjugations.teForm}
                  romaji={conjugations.teForm.replace('て', 'te')}
                  label="Te-form"
                />
              </>
            )}
            {word.wordType === 'i-adjective' && (
              <>
                <ClickableText 
                  japanese={conjugations.present}
                  romaji={word.romaji}
                  label="Present"
                />
                <ClickableText 
                  japanese={conjugations.past}
                  romaji={conjugations.past.replace('かった', 'katta')}
                  label="Past"
                />
                <ClickableText 
                  japanese={conjugations.negative}
                  romaji={conjugations.negative.replace('くない', 'kunai')}
                  label="Negative"
                />
                <ClickableText 
                  japanese={conjugations.adverb}
                  romaji={conjugations.adverb.replace('く', 'ku')}
                  label="Adverb"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

