import React, { useState, useEffect } from 'react';
import { Shuffle, Coins, Gamepad2, Zap, Eye, X, Moon, Sun, Package, Trash2, Check, RefreshCw, Palette } from 'lucide-react';
import Card from './Card.jsx';
import TestPage from './TestPage.jsx';
import { creepCards, featureCards } from './cardData.js';

const FeatureCreep = () => {
  const [power, setPower] = useState(0); // Power points
  const [gold, setGold] = useState(0); // Gold for buying booster packs

  // Creep Cards (formerly restrictions)
  const [drawnCreepCards, setDrawnCreepCards] = useState<any[]>([]);
  const [creepDeck, setCreepDeck] = useState<any[]>([]);
  const [creepDiscard, setCreepDiscard] = useState<any[]>([]);

  // Feature Cards (shop-style)
  const [featureDeck, setFeatureDeck] = useState<any[]>([]);
  const [purchasedFeatures, setPurchasedFeatures] = useState<any[]>([]);
  const [shopSlots, setShopSlots] = useState(3);
  const [shopFeatures, setShopFeatures] = useState<any[]>([]);

  const [boosterPacks, setBoosterPacks] = useState(1); // Unopened booster packs
  const [darkMode, setDarkMode] = useState(false);
  const [viewingCreepDeck, setViewingCreepDeck] = useState(false);
  const [viewingCreepDiscard, setViewingCreepDiscard] = useState(false);
  const [viewingFeatureDeck, setViewingFeatureDeck] = useState(false);
  const [revealingPack, setRevealingPack] = useState(false);
  const [revealedCards, setRevealedCards] = useState<{ creep: any[], feature: any[] }>({ creep: [], feature: [] });
  const [showingTestPage, setShowingTestPage] = useState(false);

  // Legendary card bonuses - permanent bonuses from legendary cards
  const [legendaryBonuses, setLegendaryBonuses] = useState<{ powerMultiplier: number, goldMultiplier: number, extraCards: number }>({
    powerMultiplier: 1,
    goldMultiplier: 1,
    extraCards: 0
  });

  const [reshuffleCount, setReshuffleCount] = useState(0);


  // Initialize shop on first load
  useEffect(() => {
    if (shopFeatures.length === 0 && featureDeck.length > 0) {
      fillShopSlots();
    }
  }, [featureDeck]);

  // Helper function to select cards based on rarity weights
  const selectCardsByRarity = (cards, count) => {
    const rarityWeights = {
      common: 45,
      uncommon: 30,
      rare: 18,
      epic: 6,
      legendary: 1
    };

    const selectedCards = [];

    for (let i = 0; i < count; i++) {
      // Generate random number between 0-100
      const roll = Math.random() * 100;

      // Determine rarity based on roll
      let targetRarity;
      if (roll < rarityWeights.legendary) {
        targetRarity = 'legendary';
      } else if (roll < rarityWeights.legendary + rarityWeights.epic) {
        targetRarity = 'epic';
      } else if (roll < rarityWeights.legendary + rarityWeights.epic + rarityWeights.rare) {
        targetRarity = 'rare';
      } else if (roll < rarityWeights.legendary + rarityWeights.epic + rarityWeights.rare + rarityWeights.uncommon) {
        targetRarity = 'uncommon';
      } else {
        targetRarity = 'common';
      }

      // Filter cards by target rarity
      let cardsOfRarity = cards.filter(card => card.rarity === targetRarity);

      // If no cards of this rarity exist, fall back to any card
      if (cardsOfRarity.length === 0) {
        cardsOfRarity = [...cards];
      }

      // Select random card from filtered list
      if (cardsOfRarity.length > 0) {
        const randomIndex = Math.floor(Math.random() * cardsOfRarity.length);
        selectedCards.push(cardsOfRarity[randomIndex]);
      }
    }

    return selectedCards;
  };

  const fillShopSlots = () => {
    const availableCards = featureDeck.filter(card =>
      !shopFeatures.find(s => s.id === card.id) &&
      !purchasedFeatures.find(p => p.id === card.id)
    );

    const slotsToFill = shopSlots - shopFeatures.length;
    const newCards = [];

    for (let i = 0; i < slotsToFill && availableCards.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const card = availableCards.splice(randomIndex, 1)[0];
      newCards.push(card);
    }

    setShopFeatures([...shopFeatures, ...newCards]);
  };

  const openBoosterPack = () => {
    if (boosterPacks <= 0) return;

    // Get 8 random creep cards based on rarity weights
    const newCreepCards = selectCardsByRarity(creepCards, 8);

    // Get 4 random feature cards based on rarity weights
    const newFeatureCards = selectCardsByRarity(featureCards, 4);

    // Check all owned creep cards
    const allOwnedCreepCards = [...creepDeck, ...creepDiscard, ...drawnCreepCards];
    // Check all owned feature cards (excluding special cards like addslot)
    const allOwnedFeatureCards = [...featureDeck, ...purchasedFeatures];

    let powerGained = 0;
    let goldGained = 0;
    const creepCardsToAdd = [];
    const creepCardsWithNewFlag = [];

    // Process creep cards
    newCreepCards.forEach(card => {
      const isDuplicate = allOwnedCreepCards.some(owned => owned.id === card.id);
      const multiplier = getRarityMultiplier(card.rarity);
      const boostedPower = Math.floor(card.cost * multiplier);

      if (isDuplicate) {
        powerGained += boostedPower;
        creepCardsWithNewFlag.push({ ...card, boostedPower, isNew: false, isDuplicate: true });
      } else {
        const boostedCard = { ...card, boostedPower };
        creepCardsToAdd.push(boostedCard);
        creepCardsWithNewFlag.push({ ...boostedCard, isNew: true, isDuplicate: false });
      }
    });

    const featureCardsToAdd = [];
    const featureCardsWithNewFlag = [];

    // Process feature cards
    newFeatureCards.forEach(card => {
      // Special cards (like addslot) are never considered duplicates
      const isDuplicate = !card.isSpecial && allOwnedFeatureCards.some(owned => owned.id === card.id);
      const multiplier = getRarityMultiplier(card.rarity);
      const boostedGold = Math.floor(card.cost * multiplier);

      if (isDuplicate) {
        // Duplicates give half the boosted gold value (rounded down)
        const duplicateGold = Math.floor(boostedGold / 2);
        goldGained += duplicateGold;
        featureCardsWithNewFlag.push({ ...card, boostedGold, isNew: false, isDuplicate: true, duplicateGold });
      } else {
        const boostedCard = { ...card, boostedGold };
        featureCardsToAdd.push(boostedCard);
        featureCardsWithNewFlag.push({ ...boostedCard, isNew: true, isDuplicate: false });
      }
    });

    // Show reveal modal
    setRevealedCards({ creep: creepCardsWithNewFlag, feature: featureCardsWithNewFlag });
    setRevealingPack(true);

    // Add only new cards to decks and give power/gold for duplicates
    setCreepDeck([...creepDeck, ...creepCardsToAdd]);
    setFeatureDeck([...featureDeck, ...featureCardsToAdd]);
    setPower(power + powerGained);
    setGold(gold + goldGained);
    setBoosterPacks(boosterPacks - 1);
  };

  const buyBoosterPack = () => {
    const packCost = 30;
    if (gold >= packCost) {
      setGold(gold - packCost);
      setBoosterPacks(boosterPacks + 1);
    }
  };

  const drawCreepCard = () => {
    if (creepDeck.length === 0) {
      if (creepDiscard.length === 0) return;
      const shuffledDiscard = [...creepDiscard].sort(() => Math.random() - 0.5);
      setCreepDeck(shuffledDiscard);
      setCreepDiscard([]);
      return;
    }

    const randomIndex = Math.floor(Math.random() * creepDeck.length);
    const drawnCard = creepDeck[randomIndex];

    // Use boosted power if available, otherwise calculate it
    let powerValue = drawnCard.boostedPower || Math.floor(drawnCard.cost * getRarityMultiplier(drawnCard.rarity));

    // Apply legendary bonus multiplier
    powerValue = Math.floor(powerValue * legendaryBonuses.powerMultiplier);

    // Legendary card special effect: grant permanent +5% power bonus
    if (drawnCard.rarity === 'legendary') {
      setLegendaryBonuses({
        ...legendaryBonuses,
        powerMultiplier: legendaryBonuses.powerMultiplier + 0.05
      });
    }

    const newDeck = creepDeck.filter((_, index) => index !== randomIndex);
    setCreepDeck(newDeck);
    setDrawnCreepCards([...drawnCreepCards, drawnCard]);
    setPower(power + powerValue);
  };

  const purchaseFeature = (feature) => {
    if (power < feature.cost) return;

    setPower(power - feature.cost);

    // Add feature with implemented: false (needs to be marked as complete to get gold)
    if (feature.id === 'addslot') {
      setShopSlots(shopSlots + 1);
      setPurchasedFeatures([...purchasedFeatures, { ...feature, implemented: true }]);
    } else {
      setPurchasedFeatures([...purchasedFeatures, { ...feature, implemented: false }]);
    }

    // Remove from shop and draw a new card to replace it
    const newShopFeatures = shopFeatures.filter(f => f.id !== feature.id);
    setShopFeatures(newShopFeatures);

    // Draw a new card to fill the slot
    const availableCards = featureDeck.filter(card =>
      !newShopFeatures.find(s => s.id === card.id) &&
      !purchasedFeatures.find(p => p.id === card.id) &&
      card.id !== feature.id
    );

    if (availableCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const newCard = availableCards[randomIndex];
      setShopFeatures([...newShopFeatures, newCard]);
    }
  };

  const toggleImplemented = (featureId) => {
    const feature = purchasedFeatures.find(f => f.id === featureId);
    if (!feature) return;

    const newImplemented = !feature.implemented;
    const updatedFeatures = purchasedFeatures.map(f =>
      f.id === featureId ? { ...f, implemented: newImplemented } : f
    );
    setPurchasedFeatures(updatedFeatures);

    // Use boosted gold if available, otherwise use base gold
    let goldValue = feature.boostedGold || feature.cost;

    // Apply legendary bonus multiplier
    goldValue = Math.floor(goldValue * legendaryBonuses.goldMultiplier);

    // Legendary card special effect: grant permanent +5% gold bonus when implemented
    if (newImplemented && feature.rarity === 'legendary') {
      setLegendaryBonuses({
        ...legendaryBonuses,
        goldMultiplier: legendaryBonuses.goldMultiplier + 0.05
      });
    }

    // Add or subtract gold based on implementation status
    if (newImplemented && goldValue) {
      setGold(gold + goldValue);
    } else if (!newImplemented && goldValue) {
      setGold(gold - goldValue);
    }
  };

  const deleteCreepCard = (cardId) => {
    const cardToDelete = drawnCreepCards.find(c => c.id === cardId);
    const powerValue = cardToDelete?.boostedPower || Math.floor((cardToDelete?.cost || 0) * getRarityMultiplier(cardToDelete?.rarity));
    if (!cardToDelete || power < powerValue) return;

    const newDrawnCards = drawnCreepCards.filter(c => c.id !== cardId);
    setDrawnCreepCards(newDrawnCards);
    setCreepDiscard([...creepDiscard, cardToDelete]);
    setPower(power - powerValue);
  };

  const reshuffleCreepDeck = () => {
    if (creepDeck.length > 0 || creepDiscard.length === 0) return;

    const shuffledDiscard = [...creepDiscard].sort(() => Math.random() - 0.5);
    setCreepDeck(shuffledDiscard);
    setCreepDiscard([]);
  };

  const drawFeatureCardToShop = () => {
    if (shopFeatures.length >= shopSlots) return;

    const availableCards = featureDeck.filter(card =>
      !shopFeatures.find(s => s.id === card.id) &&
      !purchasedFeatures.find(p => p.id === card.id)
    );

    if (availableCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const newCard = availableCards[randomIndex];
      setShopFeatures([...shopFeatures, newCard]);
    }
  };

  const getReshuffleCost = () => {
    return 5 + (reshuffleCount * 2);
  };

  const handleReshuffle = () => {
    const cost = getReshuffleCost();
    if (power < cost) return;

    setPower(power - cost);
    setReshuffleCount(reshuffleCount + 1);
    
    // Clear shop and fill with new cards in one operation
    const availableCards = featureDeck.filter(card =>
      !purchasedFeatures.find(p => p.id === card.id)
    );

    const newCards = [];
    for (let i = 0; i < shopSlots && availableCards.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const card = availableCards.splice(randomIndex, 1)[0];
      newCards.push(card);
    }

    setShopFeatures(newCards); // Replace all shop cards at once
  };

  const getShopSlotCost = () => {
    const slotsBought = shopSlots - 3; // Starting with 3 slots available
    return 5 + (slotsBought * 5);
  };

  const buyShopSlot = () => {
    const cost = getShopSlotCost();
    if (power < cost || shopSlots >= 8) return;

    setPower(power - cost);
    setShopSlots(shopSlots + 1);
  };

  const getCategoryColor = (category: string, rarity?: string) => {
    // For legendary cards, use darker text for better contrast
    const isLegendary = rarity === 'legendary';
    
    const colors: { [key: string]: string } = {
      // Creep card categories (formerly types)
      theme: isLegendary ? 'bg-purple-800/90 text-purple-900 border border-purple-700' : 'bg-purple-800/80 text-purple-200 border border-purple-600',
      art: isLegendary ? 'bg-blue-800/90 text-blue-900 border border-blue-700' : 'bg-blue-800/80 text-blue-200 border border-blue-600',
      character: isLegendary ? 'bg-green-800/90 text-green-900 border border-green-700' : 'bg-green-800/80 text-green-200 border border-green-600',
      gameplay: isLegendary ? 'bg-red-800/90 text-red-900 border border-red-700' : 'bg-red-800/80 text-red-200 border border-red-600',
      audio: isLegendary ? 'bg-yellow-800/90 text-yellow-900 border border-yellow-700' : 'bg-yellow-800/80 text-yellow-200 border border-yellow-600',
      story: isLegendary ? 'bg-indigo-800/90 text-indigo-900 border border-indigo-700' : 'bg-indigo-800/80 text-indigo-200 border border-indigo-600',
      technical: isLegendary ? 'bg-gray-800/90 text-gray-900 border border-gray-700' : 'bg-gray-800/80 text-gray-200 border border-gray-600',
      meta: isLegendary ? 'bg-pink-800/90 text-pink-900 border border-pink-700' : 'bg-pink-800/80 text-pink-200 border border-pink-600',
      // Feature card categories
      Movement: isLegendary ? 'bg-blue-800/90 text-blue-900 border border-blue-700' : 'bg-blue-800/80 text-blue-200 border border-blue-600',
      Visual: isLegendary ? 'bg-purple-800/90 text-purple-900 border border-purple-700' : 'bg-purple-800/80 text-purple-200 border border-purple-600',
      Audio: isLegendary ? 'bg-yellow-800/90 text-yellow-900 border border-yellow-700' : 'bg-yellow-800/80 text-yellow-200 border border-yellow-600',
      Gameplay: isLegendary ? 'bg-red-800/90 text-red-900 border border-red-700' : 'bg-red-800/80 text-red-200 border border-red-600',
      Interface: isLegendary ? 'bg-green-800/90 text-green-900 border border-green-700' : 'bg-green-800/80 text-green-200 border border-green-600',
      Advanced: isLegendary ? 'bg-indigo-800/90 text-indigo-900 border border-indigo-700' : 'bg-indigo-800/80 text-indigo-200 border border-indigo-600',
      Combat: isLegendary ? 'bg-orange-800/90 text-orange-900 border border-orange-700' : 'bg-orange-800/80 text-orange-200 border border-orange-600',
      World: isLegendary ? 'bg-teal-800/90 text-teal-900 border border-teal-700' : 'bg-teal-800/80 text-teal-200 border border-teal-600',
      Progression: isLegendary ? 'bg-pink-800/90 text-pink-900 border border-pink-700' : 'bg-pink-800/80 text-pink-200 border border-pink-600',
      Environment: isLegendary ? 'bg-cyan-800/90 text-cyan-900 border border-cyan-700' : 'bg-cyan-800/80 text-cyan-200 border border-cyan-600',
      Shop: isLegendary ? 'bg-amber-800/90 text-amber-900 border border-amber-700' : 'bg-amber-800/80 text-amber-200 border border-amber-600'
    };
    return colors[category] || (isLegendary ? 'bg-gray-800/90 text-gray-900 border border-gray-700' : 'bg-gray-800/80 text-gray-200 border border-gray-600');
  };

  const getRarityStyles = (rarity: string) => {
    const styles: { [key: string]: { border: string; glow: string; gradient: string; badge: string; ring: string } } = {
      common: {
        border: 'border-gray-600',
        glow: 'shadow-xl shadow-gray-800/50',
        gradient: 'from-amber-100 via-gray-600 to-gray-700',
        badge: 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-200 border border-gray-500',
        ring: 'ring-2 ring-gray-600/30'
      },
      uncommon: {
        border: 'border-green-500',
        glow: 'shadow-xl shadow-green-800/60',
        gradient: 'from-green-100 via-gray-600 to-gray-700',
        badge: 'bg-gradient-to-r from-green-600 to-green-700 text-green-100 border border-green-400',
        ring: 'ring-2 ring-green-500/40'
      },
      rare: {
        border: 'border-blue-400',
        glow: 'shadow-xl shadow-blue-800/70',
        gradient: 'from-blue-100 via-gray-600 to-gray-700',
        badge: 'bg-gradient-to-r from-blue-600 to-blue-700 text-blue-100 border border-blue-400',
        ring: 'ring-2 ring-blue-400/50'
      },
      epic: {
        border: 'border-purple-400',
        glow: 'shadow-2xl shadow-purple-800/80',
        gradient: 'from-purple-100 via-gray-600 to-gray-700',
        badge: 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-purple-100 border border-purple-400',
        ring: 'ring-3 ring-purple-400/60'
      },
      legendary: {
        border: 'border-yellow-400',
        glow: 'shadow-2xl shadow-yellow-600/90 drop-shadow-2xl',
        gradient: 'from-yellow-200 via-amber-200 to-gray-600',
        badge: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-yellow-100 border border-yellow-400 animate-pulse',
        ring: 'ring-4 ring-yellow-400/70 animate-pulse'
      }
    };
    return styles[rarity] || styles.common;
  };

  const getRarityMultiplier = (rarity: string) => {
    const multipliers: { [key: string]: number } = {
      common: 1,
      uncommon: 1.25,
      rare: 1.5,
      epic: 2,
      legendary: 3
    };
    return multipliers[rarity] || 1;
  };

  const getSortedCreepDeck = () => {
    return [...creepDeck].sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.text.localeCompare(b.text);
    });
  };

  const getSortedFeatureDeck = () => {
    // Only show remaining cards (not in shop or purchased)
    const availableCards = featureDeck.filter(card =>
      !shopFeatures.find(s => s.id === card.id) &&
      !purchasedFeatures.find(p => p.id === card.id)
    );
    return [...availableCards].sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.text.localeCompare(b.text);
    });
  };

  useEffect(() => {
    fillShopSlots();
  }, [shopSlots]);

  return (
    <div className={`max-w-7xl mx-auto p-6 min-h-screen transition-colors ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
      <div className="text-center mb-8 relative">
        <div className="absolute right-0 top-0 flex gap-2">
          <button
            onClick={() => setShowingTestPage(true)}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 text-purple-400 hover:bg-gray-600' : 'bg-white text-purple-600 hover:bg-gray-100'} shadow-lg`}
            aria-label="Open card design test page"
          >
            <Palette className="w-6 h-6" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'} shadow-lg`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
        <h1 className={`text-4xl font-bold mb-2 flex items-center justify-center gap-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Gamepad2 className={darkMode ? 'text-indigo-400' : 'text-indigo-600'} />
          Feature Creep
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Draw creep cards for power, buy features for gold, build your game!</p>
      </div>

      {/* Currency Display */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`rounded-xl shadow-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`flex items-center justify-center gap-2 text-xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            <Zap className="w-7 h-7" />
            {power} Power
          </div>
          <p className={`text-center text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>From creep cards</p>
        </div>
        <div className={`rounded-xl shadow-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`flex items-center justify-center gap-2 text-xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
            <Coins className="w-7 h-7" />
            {gold} Gold
          </div>
          <p className={`text-center text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>From feature cards</p>
        </div>
      </div>

      {/* Legendary Bonuses Display */}
      {(legendaryBonuses.powerMultiplier > 1 || legendaryBonuses.goldMultiplier > 1) && (
        <div className={`rounded-xl shadow-lg p-4 mb-6 ${darkMode ? 'bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-2 border-yellow-500/50' : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400/50'}`}>
          <h3 className={`text-center text-sm font-bold mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
            ✨ Legendary Bonuses ✨
          </h3>
          <div className="flex justify-center gap-6">
            {legendaryBonuses.powerMultiplier > 1 && (
              <div className={`text-center ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                <p className="text-xs">Power Multiplier</p>
                <p className="text-lg font-bold">×{legendaryBonuses.powerMultiplier.toFixed(2)}</p>
              </div>
            )}
            {legendaryBonuses.goldMultiplier > 1 && (
              <div className={`text-center ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                <p className="text-xs">Gold Multiplier</p>
                <p className="text-lg font-bold">×{legendaryBonuses.goldMultiplier.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booster Packs Section */}
      <div className={`rounded-xl shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-4 flex items-center justify-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Package className={darkMode ? 'text-green-400' : 'text-green-600'} />
          Booster Packs
        </h2>
        <div className="flex flex-col gap-4 items-center justify-center">
          <button
            onClick={buyBoosterPack}
            disabled={gold < 30}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Coins className="w-4 h-4" />
            Buy Pack (30 Gold)
          </button>
          <button
            onClick={openBoosterPack}
            disabled={boosterPacks <= 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            Open Pack
          </button>
          <div className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="text-sm">Unopened Packs</p>
            <p className="text-3xl font-bold">{boosterPacks}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Creep Cards Section */}
        <div className="space-y-6">
          <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 flex items-center justify-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Shuffle className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
              Creep Cards
            </h2>

            <div className="text-center mb-4">
              <div className={`grid grid-cols-2 gap-2 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="text-center">
                  <p className="text-sm">Deck</p>
                  <p className="text-2xl font-bold">{creepDeck.length}</p>
                  <button
                    onClick={() => setViewingCreepDeck(true)}
                    disabled={creepDeck.length === 0}
                    className={`text-xs mt-1 px-2 py-1 rounded transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Eye className="w-3 h-3 inline mr-1" />
                    View
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-sm">Discard</p>
                  <p className="text-2xl font-bold">{creepDiscard.length}</p>
                  <button
                    onClick={() => setViewingCreepDiscard(true)}
                    disabled={creepDiscard.length === 0}
                    className={`text-xs mt-1 px-2 py-1 rounded transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Eye className="w-3 h-3 inline mr-1" />
                    View
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={drawCreepCard}
                  disabled={creepDeck.length <= 0}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 mx-auto"
                >
                  <Shuffle className="w-5 h-5" />
                  Draw Creep Card
                </button>
                <button
                  onClick={reshuffleCreepDeck}
                  disabled={creepDeck.length > 0 || creepDiscard.length === 0}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reshuffle Discard into Deck
                </button>
              </div>
            </div>

            {/* Drawn Creep Cards */}
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 max-h-96 overflow-y-auto p-1">
              {drawnCreepCards.map((card, index) => {
                const powerValue = card.boostedPower || Math.floor(card.cost * getRarityMultiplier(card.rarity));
                return (
                  <Card
                    key={card.id}
                    card={card}
                    type="creep"
                    darkMode={darkMode}
                    showIndex={true}
                    index={index}
                    onDelete={deleteCreepCard}
                    canDelete={power >= powerValue}
                    getRarityStyles={getRarityStyles}
                    getCategoryColor={getCategoryColor}
                    getRarityMultiplier={getRarityMultiplier}
                  />
                );
              })}

              {drawnCreepCards.length === 0 && (
                <div className={`col-span-full text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="text-6xl mb-4">🎴</div>
                  <p className="text-lg font-medium">No creep cards drawn yet</p>
                  <p className="text-sm">Draw your first creep card to get power!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Shop Section */}
        <div className="space-y-6">
          <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 flex items-center justify-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Shuffle className={darkMode ? 'text-green-400' : 'text-green-600'} />
              Feature Shop
            </h2>

            <div className="mb-4 flex justify-center gap-2">
              <button
                onClick={() => setViewingFeatureDeck(true)}
                disabled={featureDeck.length === 0}
                className={`text-sm px-3 py-1 rounded transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1`}
              >
                <Eye className="w-3 h-3" />
                <div className="flex flex-col leading-tight">
                  <span>View Deck</span>
                  <span>({getSortedFeatureDeck().length} 🂠)</span>
                </div>
              </button>
              <button
                onClick={fillShopSlots}
                disabled={shopFeatures.length >= shopSlots || featureDeck.filter(card =>
                  !shopFeatures.find(s => s.id === card.id) &&
                  !purchasedFeatures.find(p => p.id === card.id)
                ).length === 0}
                className={`text-sm px-3 py-1 rounded transition-colors ${darkMode ? 'bg-green-700 hover:bg-green-600 text-gray-300' : 'bg-green-200 hover:bg-green-300 text-green-700'} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1`}
              >
                <Shuffle className="w-3 h-3" />
                Restock Shop
              </button>
              <button
                onClick={handleReshuffle}
                disabled={power < getReshuffleCost()}
                className={`text-sm px-3 py-1 rounded transition-colors ${darkMode ? 'bg-yellow-700 hover:bg-yellow-600 text-gray-300' : 'bg-yellow-200 hover:bg-yellow-300 text-yellow-700'} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1`}
              >
                <RefreshCw className="w-3 h-3" />
                Reshuffle ({getReshuffleCost()}⚡)
              </button>
              {shopSlots < 8 && (
                <button
                  onClick={buyShopSlot}
                  disabled={power < getShopSlotCost()}
                  className={`text-sm px-3 py-1 rounded transition-colors ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-gray-300' : 'bg-blue-200 hover:bg-blue-300 text-blue-700'} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1`}
                >
                  <Coins className="w-3 h-3" />
                  Buy Slot ({getShopSlotCost()}⚡)
                </button>
              )}
            </div>

            {/* Shop Slots */}
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
              {shopFeatures.map(feature => {
                const canAfford = power >= feature.cost;
                return (
                  <Card
                    key={feature.id}
                    card={feature}
                    type="shop"
                    darkMode={darkMode}
                    onBuy={purchaseFeature}
                    canAfford={canAfford}
                    getRarityStyles={getRarityStyles}
                    getCategoryColor={getCategoryColor}
                    getRarityMultiplier={getRarityMultiplier}
                  />
                );
              })}

              {/* Empty slots */}
              {Array.from({ length: Math.max(0, shopSlots - shopFeatures.length) }, (_, i) => (
                <div key={`empty-${i}`} className={`border-2 border-dashed rounded-lg w-24 h-36 flex items-center justify-center ${darkMode ? 'border-gray-600 bg-gray-800/50 text-gray-500' : 'border-gray-300 bg-gray-50 text-gray-400'}`}>
                  <span className="text-xs text-center">Empty<br/>Slot</span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchased Features */}
          {purchasedFeatures.length > 0 && (
            <div className={`rounded-xl shadow-lg p-4 ${darkMode ? 'bg-green-900/30 border-2 border-green-700' : 'bg-green-50 border-2 border-green-200'}`}>
              
              {/* Owned Features Zone */}
              {purchasedFeatures.filter(f => !f.implemented).length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-green-400' : 'text-green-800'}`}>
                    Owned Features ({purchasedFeatures.filter(f => !f.implemented).length})
                  </h3>
                  <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                    {purchasedFeatures.filter(f => !f.implemented).map((feature) => (
                      <Card
                        key={feature.id}
                        card={feature}
                        type="feature"
                        darkMode={darkMode}
                        isImplemented={false}
                        onImplement={toggleImplemented}
                        getRarityStyles={getRarityStyles}
                        getCategoryColor={getCategoryColor}
                        getRarityMultiplier={getRarityMultiplier}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Implemented Features Zone */}
              {purchasedFeatures.filter(f => f.implemented).length > 0 && (
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                    Implemented Features ({purchasedFeatures.filter(f => f.implemented).length})
                  </h3>
                  <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                    {purchasedFeatures.filter(f => f.implemented).map((feature) => (
                      <Card
                        key={feature.id}
                        card={feature}
                        type="feature"
                        darkMode={darkMode}
                        isImplemented={true}
                        onImplement={toggleImplemented}
                        getRarityStyles={getRarityStyles}
                        getCategoryColor={getCategoryColor}
                        getRarityMultiplier={getRarityMultiplier}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* View Creep Deck Modal */}
      {viewingCreepDeck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setViewingCreepDeck(false)}>
          <div className={`rounded-xl shadow-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Creep Deck ({creepDeck.length} cards)
              </h2>
              <button
                onClick={() => setViewingCreepDeck(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {getSortedCreepDeck().map((card, index) => (
                <Card
                  key={`deck-${card.id}-${index}`}
                  card={card}
                  type="deck"
                  darkMode={darkMode}
                  getRarityStyles={getRarityStyles}
                  getCategoryColor={getCategoryColor}
                  getRarityMultiplier={getRarityMultiplier}
                />
              ))}

            </div>
          </div>
        </div>
      )}

      {/* View Creep Discard Modal */}
      {viewingCreepDiscard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setViewingCreepDiscard(false)}>
          <div className={`rounded-xl shadow-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Creep Discard Pile ({creepDiscard.length} cards)
              </h2>
              <button
                onClick={() => setViewingCreepDiscard(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {creepDiscard.map((card, index) => (
                <Card
                  key={`discard-${card.id}-${index}`}
                  card={card}
                  type="deck"
                  darkMode={darkMode}
                  getRarityStyles={getRarityStyles}
                  getCategoryColor={getCategoryColor}
                  getRarityMultiplier={getRarityMultiplier}
                />
              ))}

            </div>
          </div>
        </div>
      )}

      {/* View Feature Deck Modal */}
      {viewingFeatureDeck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setViewingFeatureDeck(false)}>
          <div className={`rounded-xl shadow-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Feature Deck ({getSortedFeatureDeck().length} cards)
              </h2>
              <button
                onClick={() => setViewingFeatureDeck(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {getSortedFeatureDeck().map((card, index) => (
                <Card
                  key={`deck-${card.id}-${index}`}
                  card={card}
                  type="deck"
                  darkMode={darkMode}
                  getRarityStyles={getRarityStyles}
                  getCategoryColor={getCategoryColor}
                  getRarityMultiplier={getRarityMultiplier}
                />
              ))}

            </div>
          </div>
        </div>
      )}


      {/* Booster Pack Reveal Modal */}
      {revealingPack && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={() => setRevealingPack(false)}>
          <div className={`rounded-xl shadow-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  🎉 Booster Pack Opened!
                </h2>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="text-yellow-500 font-bold">Yellow</span> = New! | <span className="text-red-500 font-bold">Red</span> = Duplicate (instant power/half gold!)
                </p>
              </div>
              <button
                onClick={() => setRevealingPack(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Creep Cards (8)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center mb-6">
              {revealedCards.creep.map((card, index) => (
                <Card
                  key={`revealed-creep-${card.id}-${index}`}
                  card={card}
                  type="booster"
                  cardCategory="creep"
                  darkMode={darkMode}
                  getRarityStyles={getRarityStyles}
                  getCategoryColor={getCategoryColor}
                  getRarityMultiplier={getRarityMultiplier}
                />
              ))}

            </div>

            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Feature Cards (4)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
              {revealedCards.feature.map((card, index) => (
                <Card
                  key={`revealed-feature-${card.id}-${index}`}
                  card={card}
                  type="booster"
                  cardCategory="feature"
                  darkMode={darkMode}
                  getRarityStyles={getRarityStyles}
                  getCategoryColor={getCategoryColor}
                  getRarityMultiplier={getRarityMultiplier}
                />
              ))}

            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setRevealingPack(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Test Page Modal */}
      {showingTestPage && (
        <TestPage
          darkMode={darkMode}
          onClose={() => setShowingTestPage(false)}
          getRarityStyles={getRarityStyles}
          getCategoryColor={getCategoryColor}
          getRarityMultiplier={getRarityMultiplier}
        />
      )}
    </div>
  );
};

export default FeatureCreep;
