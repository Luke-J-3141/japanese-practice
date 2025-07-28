// Translator Component
function Translator({ words }) {
    const [fromSystem, setFromSystem] = useState('english');
    const [toSystem, setToSystem] = useState('kanji');
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const systems = [
        { id: 'english', name: 'English' },
        { id: 'kanji', name: 'Kanji' },
        { id: 'hiragana', name: 'Hiragana' },
        { id: 'katakana', name: 'Katakana' },
        { id: 'romaji', name: 'Romaji' }
    ];

    const translate = () => {
        const word = words.find(w => 
        w[fromSystem]?.toLowerCase() === input.toLowerCase()
        );
        
        if (word) {
        setResult(word[toSystem] || 'Not available');
        } else {
        setResult('Word not found');
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-white">Translator</h2>
        
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">From</label>
                <select
                value={fromSystem}
                onChange={(e) => setFromSystem(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                >
                {systems.map(system => (
                    <option key={system.id} value={system.id}>{system.name}</option>
                ))}
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">To</label>
                <select
                value={toSystem}
                onChange={(e) => setToSystem(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                >
                {systems.map(system => (
                    <option key={system.id} value={system.id}>{system.name}</option>
                ))}
                </select>
            </div>
            </div>

            <div>
            <label className="block text-sm font-medium mb-2 text-gray-200">Input</label>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter word to translate"
            />
            </div>

            <button
            onClick={translate}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors text-base font-medium"
            >
            Translate
            </button>

            {result && (
            <div className="p-4 bg-gray-700 rounded-md">
                <strong className="text-gray-200">Result:</strong> <span className="text-white">{result}</span>
            </div>
            )}
        </div>
        </div>
    );
}
