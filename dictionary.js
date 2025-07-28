// Dictionary Component
function Dictionary({ words, onSelectWord, selectedWord }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Word List */}
        <div className="bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Vocabulary List</h2>
            <div className="space-y-2">
            {words.map(word => (
                <div
                key={word.id}
                onClick={() => onSelectWord(word)}
                className={`p-3 rounded-md cursor-pointer border transition-colors ${
                    selectedWord?.id === word.id
                    ? 'border-blue-500 bg-blue-900/50'
                    : 'border-gray-600 hover:bg-gray-700'
                }`}
                >
                <div className="flex justify-between items-center">
                    <div>
                    <span className="font-medium text-lg text-white">{word.commonWriting}</span>
                    <span className="ml-2 text-gray-400">({word.romaji})</span>
                    </div>
                    <span className="text-sm text-gray-300">{word.english}</span>
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* Word Details */}
        <div className="bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Word Details</h2>
            {selectedWord ? (
            <WordDetails word={selectedWord} />
            ) : (
            <p className="text-gray-400">Select a word to see details</p>
            )}
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
            <h3 className="font-semibold text-lg mb-2 text-white">Writing Systems</h3>
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
            <div><strong className="text-gray-200">JLPT:</strong> {word.jlptLevel}</div>
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
                    <div><strong className="text-gray-200">Present:</strong> {conjugations.polite.present}</div>
                    <div><strong className="text-gray-200">Past:</strong> {conjugations.polite.past}</div>
                    <div><strong className="text-gray-200">Negative:</strong> {conjugations.polite.negative}</div>
                    <div><strong className="text-gray-200">Te-form:</strong> {conjugations.teForm}</div>
                </>
                )}
                {word.wordType === 'i-adjective' && (
                <>
                    <div><strong className="text-gray-200">Present:</strong> {conjugations.present}</div>
                    <div><strong className="text-gray-200">Past:</strong> {conjugations.past}</div>
                    <div><strong className="text-gray-200">Negative:</strong> {conjugations.negative}</div>
                    <div><strong className="text-gray-200">Adverb:</strong> {conjugations.adverb}</div>
                </>
                )}
            </div>
            </div>
        )}
        </div>
    );
}

