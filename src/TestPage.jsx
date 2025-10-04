import React from 'react';
import { X } from 'lucide-react';
import Card from './Card.jsx';
import { creepCards, featureCards } from './cardData.js';

const TestPage = ({ darkMode, onClose, getRarityStyles, getCategoryColor, getRarityMultiplier }) => {
  // Create a test array with random cards from different rarities
  const getTestCards = () => {
    const testCards = [];
    
    // Get cards of each rarity for testing
    const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    
    rarities.forEach(rarity => {
      // Add 2 creep cards of each rarity
      const creepCardsOfRarity = creepCards.filter(card => card.rarity === rarity);
      if (creepCardsOfRarity.length > 0) {
        testCards.push(creepCardsOfRarity[0]);
        if (creepCardsOfRarity.length > 1) {
          testCards.push(creepCardsOfRarity[1]);
        }
      }
      
      // Add 2 feature cards of each rarity
      const featureCardsOfRarity = featureCards.filter(card => card.rarity === rarity);
      if (featureCardsOfRarity.length > 0) {
        testCards.push(featureCardsOfRarity[0]);
        if (featureCardsOfRarity.length > 1) {
          testCards.push(featureCardsOfRarity[1]);
        }
      }
    });
    
    return testCards;
  };

  const testCards = getTestCards();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`rounded-xl shadow-2xl p-6 max-w-7xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              🎨 Card Design Test Page
            </h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Testing cards across all rarities and types for design iteration
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Rarity Sections */}
        {['common', 'uncommon', 'rare', 'epic', 'legendary'].map(rarity => {
          const cardsOfRarity = testCards.filter(card => card.rarity === rarity);
          if (cardsOfRarity.length === 0) return null;
          
          return (
            <div key={rarity} className="mb-8">
              <h3 className={`text-xl font-bold mb-4 capitalize ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {rarity} Cards ({cardsOfRarity.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {cardsOfRarity.map((card, index) => (
                  <Card
                    key={`test-${card.id}-${index}`}
                    card={card}
                    type={creepCards.includes(card) ? 'creep' : 'feature'}
                    darkMode={darkMode}
                    getRarityStyles={getRarityStyles}
                    getCategoryColor={getCategoryColor}
                    getRarityMultiplier={getRarityMultiplier}
                  />
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-lg font-semibold text-lg transition-colors ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            Close Test Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;