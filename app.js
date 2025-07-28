// Your React component code goes here
const { useState, useEffect } = React;


// Main App Component
function JapaneseVocabApp() {
    const [currentView, setCurrentView] = useState('dictionary');
    const [selectedWord, setSelectedWord] = useState(null);

    return (
        <div className="min-h-screen bg-gray-900 p-4">
        <div className="max-w-6xl mx-auto">
            {/* Navigation */}
            <Navigation currentView={currentView} setCurrentView={setCurrentView} />
            
            {/* Main Content */}
            <div className="mt-6">
            {currentView === 'dictionary' && (
                <Dictionary 
                words={vocabularyData} 
                onSelectWord={setSelectedWord}
                selectedWord={selectedWord}
                />
            )}
            {currentView === 'translator' && <Translator words={vocabularyData} />}
            {currentView === 'quiz' && <Quiz words={vocabularyData} />}
            {currentView === 'conjugation' && <ConjugationTool words={vocabularyData} />}
            </div>
        </div>
        </div>
    );
}

// Navigation Component
function Navigation({ currentView, setCurrentView }) {
    const views = [
        { id: 'dictionary', name: 'Dictionary' },
        { id: 'translator', name: 'Translator' },
        { id: 'quiz', name: 'Quiz' },
        { id: 'conjugation', name: 'Conjugation' }
    ];

    return (
        <nav className="bg-gray-800 shadow-sm rounded-lg p-4">
        <div className="flex flex-wrap gap-2 sm:space-x-4 sm:gap-0">
            {views.map(view => (
            <button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={`px-3 py-2 sm:px-4 rounded-md font-medium transition-colors text-sm sm:text-base flex-1 sm:flex-none ${
                currentView === view.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
            >
                {view.name}
            </button>
            ))}
        </div>
        </nav>
    );
}
