// Sample vocabulary data
const vocabularyData = [
{
    id: "water_001",
    english: "water",
    hiragana: "みず",
    katakana: "ミズ",
    kanji: "水",
    romaji: "mizu",
    commonWriting: "水",
    wordType: "noun",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "daily-life", "drinks", "essential"],
    relatedWords: ["drink", "tea"]
},
{
    id: "drink_001",
    english: "to drink",
    hiragana: "のむ",
    katakana: "ノム",
    kanji: "飲む",
    romaji: "nomu",
    commonWriting: "飲む",
    wordType: "godan-verb",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "daily-life", "verbs", "essential"],
    relatedWords: ["water", "tea", "eat"]
},
{
    id: "big_001",
    english: "big",
    hiragana: "おおきい",
    katakana: "オオキイ",
    kanji: "大きい",
    romaji: "ookii",
    commonWriting: "大きい",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0011",
    tags: ["basic", "adjectives", "size"],
    relatedWords: ["small", "size"]
}

];

// Conjugation functions
function conjugateGodanVerb(verb) {
    const stem = verb.slice(0, -1);
    const ending = verb.slice(-1);
    
    const conjugationMap = {
        'う': { a: 'わ', i: 'い', u: 'う', e: 'え', o: 'お', te: 'っ' },
        'く': { a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ', te: 'い' },
        'ぐ': { a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご', te: 'い' },
        'す': { a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ', te: 'し' },
        'つ': { a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と', te: 'っ' },
        'ぬ': { a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の', te: 'ん' },
        'ぶ': { a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ', te: 'ん' },
        'む': { a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も', te: 'ん' },
        'る': { a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ', te: 'っ' }
    };

    const forms = conjugationMap[ending];
    if (!forms) return null;

    return {
        dictionary: verb,
        polite: {
        present: stem + forms.i + 'ます',
        past: stem + forms.i + 'ました',
        negative: stem + forms.i + 'ません',
        pastNegative: stem + forms.i + 'ませんでした'
        },
        casual: {
        present: verb,
        past: stem + forms.te + 'た',
        negative: stem + forms.a + 'ない',
        pastNegative: stem + forms.a + 'なかった'
        },
        teForm: stem + forms.te + 'て',
        potential: stem + forms.e + 'る',
        passive: stem + forms.a + 'れる',
        causative: stem + forms.a + 'せる',
        imperative: stem + forms.e,
        volitional: stem + forms.o + 'う'
    };
}

function conjugateIAdjective(adjective) {
    const stem = adjective.slice(0, -1);
    return {
        present: adjective,
        past: stem + 'かった',
        negative: stem + 'くない',
        pastNegative: stem + 'くなかった',
        adverb: stem + 'く',
        teForm: stem + 'くて',
        conditional: stem + 'ければ',
        polite: {
        present: adjective + 'です',
        past: stem + 'かったです',
        negative: stem + 'くないです',
        pastNegative: stem + 'くなかったです'
        }
    };
}

function conjugateNaAdjective(adjective) {
    return {
        present: adjective,
        presentBe: adjective + 'だ',
        past: adjective + 'だった',
        negative: adjective + 'じゃない',
        pastNegative: adjective + 'じゃなかった',
        adverb: adjective + 'に',
        teForm: adjective + 'で',
        conditional: adjective + 'なら',
        polite: {
        present: adjective + 'です',
        past: adjective + 'でした',
        negative: adjective + 'じゃないです',
        pastNegative: adjective + 'じゃなかったです'
        }
    };
}

function getConjugations(word) {
    if (!word || !word.commonWriting || !word.wordType) {
        return null;
    }
    
    switch(word.wordType) {
        case 'godan-verb':
        return conjugateGodanVerb(word.commonWriting);
        case 'i-adjective':
        return conjugateIAdjective(word.commonWriting);
        case 'na-adjective':
        return conjugateNaAdjective(word.commonWriting);
        default:
        return null;
    }
}

// Conjugation Tool Component
function ConjugationTool({ words }) {
    const [selectedWord, setSelectedWord] = useState('');
    const [conjugations, setConjugations] = useState(null);

    const handleWordChange = (wordId) => {
        const word = words.find(w => w.id === wordId);
        setSelectedWord(wordId);
        setConjugations(getConjugations(word));
    };

    const conjugatableWords = words.filter(word => 
        ['godan-verb', 'ichidan-verb', 'i-adjective', 'na-adjective'].includes(word.wordType)
    );

    return (
        <div className="bg-gray-800 rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-white">Conjugation Tool</h2>
        
        <div className="space-y-6">
            <div>
            <label className="block text-sm font-medium mb-2 text-gray-200">Select Word</label>
            <select
                value={selectedWord}
                onChange={(e) => handleWordChange(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
            >
                <option value="">Choose a word...</option>
                {conjugatableWords.map(word => (
                <option key={word.id} value={word.id}>
                    {word.commonWriting} ({word.english}) - {word.wordType}
                </option>
                ))}
            </select>
            </div>

            {conjugations && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {conjugations.polite && (
                <div>
                    <h3 className="font-semibold mb-3 text-white">Polite Forms</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                    <div><strong className="text-gray-200">Present:</strong> {conjugations.polite.present}</div>
                    <div><strong className="text-gray-200">Past:</strong> {conjugations.polite.past}</div>
                    <div><strong className="text-gray-200">Negative:</strong> {conjugations.polite.negative}</div>
                    <div><strong className="text-gray-200">Past Negative:</strong> {conjugations.polite.pastNegative}</div>
                    </div>
                </div>
                )}

                {conjugations.casual && (
                <div>
                    <h3 className="font-semibold mb-3 text-white">Casual Forms</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                    <div><strong className="text-gray-200">Present:</strong> {conjugations.casual.present}</div>
                    <div><strong className="text-gray-200">Past:</strong> {conjugations.casual.past}</div>
                    <div><strong className="text-gray-200">Negative:</strong> {conjugations.casual.negative}</div>
                    <div><strong className="text-gray-200">Past Negative:</strong> {conjugations.casual.pastNegative}</div>
                    </div>
                </div>
                )}

                {(conjugations.teForm || conjugations.potential) && (
                <div>
                    <h3 className="font-semibold mb-3 text-white">Other Forms</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                    {conjugations.teForm && <div><strong className="text-gray-200">Te-form:</strong> {conjugations.teForm}</div>}
                    {conjugations.potential && <div><strong className="text-gray-200">Potential:</strong> {conjugations.potential}</div>}
                    {conjugations.passive && <div><strong className="text-gray-200">Passive:</strong> {conjugations.passive}</div>}
                    {conjugations.causative && <div><strong className="text-gray-200">Causative:</strong> {conjugations.causative}</div>}
                    {conjugations.adverb && <div><strong className="text-gray-200">Adverb:</strong> {conjugations.adverb}</div>}
                    </div>
                </div>
                )}
            </div>
            )}
        </div>
        </div>
    );
}
