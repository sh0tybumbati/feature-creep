import React from 'react';
import { Zap, Coins, Trash2, Check, X } from 'lucide-react';

/**
 * Unified Card Component
 * Handles rendering for all card types: creep, feature, shop, deck view, etc.
 */
const Card = ({ 
  card, 
  type = 'default', // 'creep', 'feature', 'shop', 'deck', 'booster'
  darkMode = false,
  // Card display options
  showIndex = false,
  index = 0,
  // Booster pack specific
  cardCategory = null, // 'creep' or 'feature' for booster packs
  // Interaction handlers
  onBuy = null,
  onDelete = null, 
  onImplement = null,
  // State
  canAfford = true,
  canDelete = true,
  isImplemented = false,
  // Style utilities passed from parent
  getRarityStyles,
  getCategoryColor,
  getTypeColor,
  getRarityMultiplier
}) => {
  const rarityStyles = getRarityStyles(card.rarity);
  
  // Calculate display values
  const getValue = () => {
    if (type === 'creep' || cardCategory === 'creep') {
      return card.boostedPower || Math.floor(card.cost * getRarityMultiplier(card.rarity));
    } else {
      return card.boostedGold || Math.floor(card.cost * getRarityMultiplier(card.rarity));
    }
  };

  const value = getValue();
  
  // Get category color (now standardized)
  const categoryColor = getCategoryColor(card.category, card.rarity);
  
  // Get rarity symbol
  const getRaritySymbol = (rarity) => {
    const symbols = {
      common: '●',
      uncommon: '▲',
      rare: '◆', 
      epic: '★',
      legendary: '☀'
    };
    return symbols[rarity] || '●';
  };
  
  // All fields are now standardized
  const categoryLabel = card.category;
  const description = card.text;

  // Determine opacity for implemented features
  const opacity = isImplemented ? 'opacity-75' : '';
  const disabledOpacity = !canAfford && type === 'shop' ? 'opacity-60' : '';
  
  // Booster pack specific styling
  const isBooster = type === 'booster';
  const cardSize = isBooster ? 'w-28 h-40' : 'w-24 h-36';
  const boosterOpacity = card.isDuplicate ? 'opacity-75' : '';
  const boosterRing = isBooster && card.isNew ? 'ring-4 ring-yellow-400/50' : 
                     isBooster && card.isDuplicate ? 'ring-4 ring-red-400/50' : '';

  return (
    <div className={`relative ${cardSize} ${opacity} ${disabledOpacity} ${boosterOpacity} ${boosterRing} transform hover:-translate-y-2 hover:scale-105 transition-all duration-300`}>
      {/* Outer ornate frame */}
      <div className={`absolute inset-0 bg-gradient-to-br ${rarityStyles.gradient} rounded-lg border-3 ${rarityStyles.border} ${rarityStyles.ring} ${rarityStyles.glow} hover:shadow-2xl transition-all duration-300`}></div>
      
      {/* Inner decorative frame */}
      <div className={`absolute inset-1 border ${rarityStyles.border} rounded-md opacity-60`}></div>
      
      {/* Decorative border elements */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className={`w-1 h-1 ${rarityStyles.border.replace('border-', 'bg-')} rounded-full opacity-70`}></div>
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className={`w-1 h-1 ${rarityStyles.border.replace('border-', 'bg-')} rounded-full opacity-70`}></div>
      </div>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <div className={`w-1 h-1 ${rarityStyles.border.replace('border-', 'bg-')} rounded-full opacity-70`}></div>
      </div>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <div className={`w-1 h-1 ${rarityStyles.border.replace('border-', 'bg-')} rounded-full opacity-70`}></div>
      </div>
      
      {/* Mystical particle effects for higher rarities */}
      {(card.rarity === 'epic' || card.rarity === 'legendary') && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          {/* Floating particles */}
          <div className={`absolute top-2 left-2 w-1 h-1 ${card.rarity === 'legendary' ? 'bg-yellow-400' : 'bg-purple-400'} rounded-full opacity-60 animate-bounce`} style={{animationDelay: '0s', animationDuration: '3s'}}></div>
          <div className={`absolute top-4 right-3 w-0.5 h-0.5 ${card.rarity === 'legendary' ? 'bg-orange-400' : 'bg-pink-400'} rounded-full opacity-80 animate-bounce`} style={{animationDelay: '1s', animationDuration: '2.5s'}}></div>
          <div className={`absolute bottom-3 left-4 w-0.5 h-0.5 ${card.rarity === 'legendary' ? 'bg-yellow-300' : 'bg-purple-300'} rounded-full opacity-70 animate-bounce`} style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
          <div className={`absolute bottom-5 right-2 w-1 h-1 ${card.rarity === 'legendary' ? 'bg-amber-400' : 'bg-indigo-400'} rounded-full opacity-50 animate-bounce`} style={{animationDelay: '0.5s', animationDuration: '4s'}}></div>
        </div>
      )}
      
      {/* Legendary magical aura overlay - optimized for readability */}
      {card.rarity === 'legendary' && (
        <div className="absolute inset-0 pointer-events-none rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/8 to-transparent animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-orange-400/3 to-transparent" style={{animationDelay: '1s'}}></div>
        </div>
      )}

      {/* Main card content container */}
      <div className="relative h-full flex flex-col">
      {/* Booster pack NEW badge */}
      {isBooster && card.isNew && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold text-[10px] shadow-md z-20 border-2 border-yellow-300">
          NEW!
        </div>
      )}
      
      {/* Booster pack DUP badge */}
      {isBooster && card.isDuplicate && (
        <div className="absolute -top-2 -right-2 bg-red-400 text-red-900 px-2 py-0.5 rounded-full font-bold text-[10px] shadow-md z-20 border-2 border-red-300">
          {cardCategory === 'creep' ? `DUP +${value}⚡` : `DUP +${card.duplicateGold || Math.floor(value / 2)}💰`}
        </div>
      )}
      {/* Elaborate Ornate Corner decorations */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none">
        <div className={`absolute top-1 left-1 w-4 h-0.5 bg-gradient-to-r ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-90`}></div>
        <div className={`absolute top-1 left-1 w-0.5 h-4 bg-gradient-to-b ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-90`}></div>
        <div className={`absolute top-0.5 left-0.5 w-2 h-0.5 bg-gradient-to-r ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-60`}></div>
        <div className={`absolute top-0.5 left-0.5 w-0.5 h-2 bg-gradient-to-b ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-60`}></div>
        <div className={`absolute top-2 left-2 w-1 h-1 ${rarityStyles.border.replace('border-', 'bg-')} rounded-full opacity-80`}></div>
      </div>
      
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
        <div className={`absolute top-1 right-1 w-4 h-0.5 bg-gradient-to-l ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-90`}></div>
        <div className={`absolute top-1 right-1 w-0.5 h-4 bg-gradient-to-b ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-90`}></div>
        <div className={`absolute top-0.5 right-0.5 w-2 h-0.5 bg-gradient-to-l ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-60`}></div>
        <div className={`absolute top-0.5 right-0.5 w-0.5 h-2 bg-gradient-to-b ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-60`}></div>
        <div className={`absolute top-2 right-2 w-1 h-1 ${rarityStyles.border.replace('border-', 'bg-')} rounded-full opacity-80`}></div>
      </div>
      
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none">
        <div className={`absolute bottom-1 left-1 w-4 h-0.5 bg-gradient-to-r ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-90`}></div>
        <div className={`absolute bottom-1 left-1 w-0.5 h-4 bg-gradient-to-t ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-90`}></div>
        <div className={`absolute bottom-0.5 left-0.5 w-2 h-0.5 bg-gradient-to-r ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-60`}></div>
        <div className={`absolute bottom-0.5 left-0.5 w-0.5 h-2 bg-gradient-to-t ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-60`}></div>
        <div className={`absolute bottom-2 left-2 w-1 h-1 ${rarityStyles.border.replace('border-', 'bg-')} rounded-full opacity-80`}></div>
      </div>
      
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none">
        <div className={`absolute bottom-1 right-1 w-4 h-0.5 bg-gradient-to-l ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-90`}></div>
        <div className={`absolute bottom-1 right-1 w-0.5 h-4 bg-gradient-to-t ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-90`}></div>
        <div className={`absolute bottom-0.5 right-0.5 w-2 h-0.5 bg-gradient-to-l ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-60`}></div>
        <div className={`absolute bottom-0.5 right-0.5 w-0.5 h-2 bg-gradient-to-t ${rarityStyles.border.replace('border-', 'from-')} to-transparent opacity-60`}></div>
        <div className={`absolute bottom-2 right-2 w-1 h-1 ${rarityStyles.border.replace('border-', 'bg-')} rounded-full opacity-80`}></div>
      </div>

      {/* Value (Power/Gold) at top right corner */}
      {value > 0 && (
        <div className={`absolute top-0.5 right-0.5 ${rarityStyles.badge} px-1 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-0.5 shadow-lg backdrop-blur-sm z-10 ${card.rarity === 'legendary' ? 'filter drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]' : ''}`}>
          {(type === 'creep' || cardCategory === 'creep') ? <Zap className="w-2 h-2" /> : <Coins className="w-2 h-2" />}
          {value}
        </div>
      )}

      {/* Category below cost */}
      <div className="flex justify-center mt-6">
        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${categoryColor} shadow-lg backdrop-blur-sm`}>
          {categoryLabel}
        </span>
      </div>

      {/* Card index for drawn creep cards */}
      {showIndex && type === 'creep' && (
        <div className="absolute top-0.5 left-0.5 bg-gray-800/90 border border-gray-600 text-white text-xs font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center z-10 text-[10px] shadow-lg backdrop-blur-sm">
          {index + 1}
        </div>
      )}

      {/* Icon in middle */}
      <div className="flex justify-center items-center mt-2">
        <div className={`relative ${(card.rarity === 'rare' || card.rarity === 'epic' || card.rarity === 'legendary') ? 'drop-shadow-lg' : ''}`}>
          {(card.rarity === 'epic' || card.rarity === 'legendary') && (
            <div className={`absolute inset-0 ${card.rarity === 'legendary' ? 'bg-yellow-400/20' : 'bg-purple-400/20'} rounded-full blur-sm animate-pulse`}></div>
          )}
          <span className={`relative text-xl ${card.rarity === 'legendary' ? 'filter drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : card.rarity === 'epic' ? 'filter drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]' : ''}`}>{card.icon}</span>
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 flex items-center justify-center p-1.5">
        <p className={`${
          card.rarity === 'legendary' ? 'text-amber-900 font-bold' :
          card.rarity === 'epic' ? 'text-purple-200 font-bold' :
          card.rarity === 'rare' ? 'text-blue-200 font-semibold' :
          card.rarity === 'uncommon' ? 'text-green-200 font-medium' :
          'text-gray-300 font-normal'
        } text-[10px] leading-tight text-center ${
          card.rarity === 'legendary' ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]' :
          card.rarity === 'epic' ? 'drop-shadow-lg filter drop-shadow-[0_0_3px_rgba(168,85,247,0.4)]' :
          card.rarity === 'rare' ? 'drop-shadow-lg filter drop-shadow-[0_0_2px_rgba(59,130,246,0.4)]' :
          card.rarity === 'uncommon' ? 'drop-shadow-lg filter drop-shadow-[0_0_2px_rgba(34,197,94,0.3)]' :
          'drop-shadow-md'
        }`}>{description}</p>
      </div>

      {/* UI Buttons at bottom */}
      <div className="relative flex justify-center items-center mb-1 px-1">
        {/* Buttons container - centered */}
        <div className="flex justify-center">
          {/* Shop: Buy button */}
          {type === 'shop' && onBuy && (
            <button
              onClick={() => onBuy(card)}
              disabled={!canAfford}
              className="bg-green-700 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs font-bold transition-all shadow-lg border border-green-500/50 backdrop-blur-sm"
            >
              Buy
            </button>
          )}

          {/* Drawn Creep: Delete button */}
          {type === 'creep' && onDelete && (
            <button
              onClick={() => onDelete(card.id)}
              disabled={!canDelete}
              className="bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-1 rounded transition-all text-xs shadow-lg border border-red-500/50 backdrop-blur-sm"
              title={!canDelete ? `Need ${value} power to delete` : `Delete card (costs ${value} power)`}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}

          {/* Owned Feature: Implement button */}
          {type === 'feature' && !isImplemented && onImplement && card.id !== 'addslot' && (
            <button
              onClick={() => onImplement(card.id)}
              className="bg-green-700 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-bold transition-all shadow-lg border border-green-500/50 backdrop-blur-sm"
            >
              <Check className="w-3 h-3" />
            </button>
          )}

          {/* Implemented Feature: Unimplement button */}
          {type === 'feature' && isImplemented && onImplement && (
            <button
              onClick={() => onImplement(card.id)}
              className="bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-bold transition-all shadow-lg border border-red-500/50 backdrop-blur-sm"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Deck view: No buttons needed */}
        </div>
        
        {/* Rarity symbol - fixed position bottom right */}
        <div className={`absolute bottom-0 right-1 text-xs font-bold ${card.rarity === 'common' ? 'text-gray-600' : card.rarity === 'uncommon' ? 'text-green-800' : card.rarity === 'rare' ? 'text-blue-800' : card.rarity === 'epic' ? 'text-purple-800' : 'text-yellow-600'} ${card.rarity === 'legendary' ? 'filter drop-shadow-[0_0_4px_rgba(251,191,36,0.8)] animate-pulse' : card.rarity === 'epic' ? 'filter drop-shadow-[0_0_3px_rgba(168,85,247,0.6)]' : ''}`}>
          {getRaritySymbol(card.rarity)}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Card;