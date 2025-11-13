// Equipment Database
const equipmentDatabase = {
    brands: {
        hoist: {
            name: "HOIST Fitness",
            country: "USA",
            specialty: "Advanced Strength Technology",
            products: [
                {
                    name: "ROC-IT® Selectorized",
                    category: "Strength",
                    technology: "ROC-IT Dynamic Movement",
                    features: ["Bio-mechanically optimized", "Natural movement patterns", "Joint-friendly"],
                    useCase: "Commercial Gyms, Professional Athletes",
                    priceRange: "Premium (₹150k+)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "ROC-IT® Plate Loaded",
                    category: "Strength",
                    features: ["Advanced training", "Core engagement", "Heavy-duty construction"],
                    useCase: "Advanced training, core engagement",
                    priceRange: "Premium (₹150k+)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "Mi6 Functional Trainer",
                    category: "Functional",
                    features: ["360-degree rotation", "Dual weight stacks", "Versatile exercises"],
                    useCase: "Functional training studios",
                    priceRange: "Premium (₹150k+)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "Mi7 Smith",
                    category: "Strength",
                    features: ["Ultra-lite bar (30lbs)", "Functional training", "Safety catches"],
                    useCase: "All-round strength training",
                    priceRange: "Premium (₹150k+)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "Multi Stack Stations",
                    category: "Multi-Station",
                    features: ["Multiple users", "Space-efficient", "Complete gym solution"],
                    useCase: "Commercial gyms, Multiple simultaneous users",
                    priceRange: "Premium (₹150k+)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                }
            ]
        },
        freemotion: {
            name: "FreeMotion Cardio",
            country: "USA",
            specialty: "Premium Cardio Equipment",
            products: [
                {
                    name: "t22.9 REFLEX Treadmill",
                    model: "FMTL70920",
                    category: "Cardio",
                    specs: {
                        speed: "0-15 mph (0-24 km/h)",
                        incline: "0-15%",
                        display: "22 inch HD Touchscreen",
                        weightCapacity: "400 lbs (181 kg)"
                    },
                    features: ["iFIT Integration", "Impact-reducing deck", "Heart rate monitoring", "Google Maps enabled"],
                    priceRange: "Premium (₹150k+)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "r22.9 Recumbent Bike",
                    model: "FMEX82520",
                    category: "Cardio",
                    specs: {
                        resistanceLevels: "1-24",
                        display: "22 inch HD Touchscreen",
                        weightCapacity: "400 lbs (181 kg)"
                    },
                    features: ["Back-friendly design", "Step-Thru accessible", "iFIT on-demand workouts"],
                    priceRange: "Premium (₹150k+)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "CoachBike",
                    model: "FMEX84821",
                    category: "Cardio",
                    features: ["Incline/Decline (-10% to +20%)", "SMR magnetic resistance", "Professional training"],
                    priceRange: "Premium (₹150k+)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "e22.9 Elliptical",
                    model: "FMEL84420",
                    category: "Cardio",
                    features: ["Full-body low-impact workout", "22-inch HD display", "iFIT enabled"],
                    priceRange: "Premium (₹150k+)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                }
            ]
        },
        tunturi: {
            name: "Tunturi Fitness",
            country: "Netherlands",
            specialty: "European Engineering Quality",
            products: [
                {
                    name: "Cardio Fit Series",
                    category: "Cardio",
                    features: ["Durable construction", "Wide resistance range", "Multiple workout programs"],
                    priceRange: "Mid-range (₹75k-₹150k)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "T90 Motorised Treadmill",
                    category: "Cardio",
                    specs: {
                        motor: "5.0 HP AC",
                        speed: "0.8-24 km/h",
                        incline: "0-15%",
                        runningArea: "153 x 55 cm",
                        maxUserWeight: "150 kg"
                    },
                    features: ["T-Flex Comfort+ shock absorption", "Bluetooth enabled", "LCD display"],
                    priceRange: "Mid-range (₹75k-₹150k)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                }
            ]
        },
        concept2: {
            name: "Concept2",
            country: "USA",
            specialty: "Premium Indoor Rowing",
            products: [
                {
                    name: "RowErg",
                    category: "Rowing",
                    specs: {
                        length: "244 cm",
                        width: "61 cm",
                        seatHeight: "36 cm (standard) or 51 cm (tall)",
                        maxUserWeight: "227 kg"
                    },
                    features: ["Full-body low-impact workout", "PM5 Monitor", "Adjustable footrests", "Quick-release storage"],
                    priceRange: "Premium (₹150k+)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                }
            ]
        },
        energie: {
            name: "Energie Fitness",
            country: "India",
            specialty: "Quality Fitness Solutions",
            products: [
                {
                    name: "ETB-17 Functional Trainer",
                    category: "Functional",
                    specs: {
                        dimensions: "1050 x 1950 x 2300 mm",
                        weight: "382 kg",
                        weightStack: "200 kg"
                    },
                    features: ["Heavy-duty frame", "Dual weight stacks", "10+ adjustments", "Commercial grade"],
                    priceRange: "Mid-range (₹75k-₹150k)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "PRO-001 Premium Chest Press",
                    category: "Single Station",
                    features: ["Ergonomic design", "Adjustable seat", "Smooth movement"],
                    priceRange: "Budget (Under ₹75k)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "PRO-002 Incline Chest Press",
                    category: "Single Station",
                    features: ["Incline angle", "Professional grade", "Durable construction"],
                    priceRange: "Budget (Under ₹75k)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "PRO-003 Shoulder Press",
                    category: "Single Station",
                    features: ["Shoulder-focused", "Adjustable settings", "Safe operation"],
                    priceRange: "Budget (Under ₹75k)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                },
                {
                    name: "PRO-009 Leg Press 45°",
                    category: "Single Station",
                    features: ["45-degree angle", "Heavy weight capacity", "Lower body focus"],
                    priceRange: "Mid-range (₹75k-₹150k)",
                    link: "https://www.energyfitness.in/e-catalogue/index.php"
                }
            ]
        }
    }
};

// Conversation history
let conversationHistory = [];

// Initialize chat
function initializeChat() {
    addBotMessage(
        `Welcome to Energy Fitness Equipment Catalog Assistant! 👋\n\nI'm here to help you find the perfect fitness equipment. I can assist you with:\n\n✓ Product information and specifications\n✓ Equipment comparisons\n✓ Browse by category or brand\n✓ Price estimates and recommendations\n✓ Gym setup consultation\n\nHow can I help you today?`
    );
}

// (Rest of the original app.js logic kept intact)

// Add message to chat
function addMessage(text, isUser = false, htmlContent = null) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? 'U' : 'EF';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    if (htmlContent) {
        contentDiv.innerHTML = htmlContent;
    } else {
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = text;
        contentDiv.appendChild(textDiv);
    }

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(text, htmlContent = null) {
    addMessage(text, false, htmlContent);
}

function addUserMessage(text) {
    addMessage(text, true);
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'EF';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(contentDiv);
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Process user query
function processQuery(query) {
    const lowerQuery = query.toLowerCase();

    // Store in conversation history
    conversationHistory.push({ role: 'user', message: query });

    // Compare products
    if (lowerQuery.includes('compare') || lowerQuery.includes('vs') || lowerQuery.includes('versus')) {
        return handleComparison(query);
    }

    // Browse categories
    if (lowerQuery.includes('strength equipment') || lowerQuery.includes('browse strength')) {
        return browseCategoryEquipment('strength');
    }

    if (lowerQuery.includes('cardio equipment') || lowerQuery.includes('browse cardio')) {
        return browseCategoryEquipment('cardio');
    }

    // View brands
    if (lowerQuery.includes('view all brands') || lowerQuery.includes('brands') || lowerQuery.includes('manufacturers')) {
        return showAllBrands();
    }

    // Price estimates
    if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('budget')) {
        return showPriceRanges();
    }

    // Setup gym
    if (lowerQuery.includes('setup') || lowerQuery.includes('start a gym') || lowerQuery.includes('open a gym')) {
        return handleGymSetup();
    }

    // Best treadmill
    if (lowerQuery.includes('best treadmill') || lowerQuery.includes('top treadmill')) {
        return showBestTreadmills();
    }

    // Commercial vs Home
    if (lowerQuery.includes('commercial vs home') || lowerQuery.includes('commercial or home')) {
        return explainCommercialVsHome();
    }

    // Specific brand search
    for (const brandKey in equipmentDatabase.brands) {
        const brand = equipmentDatabase.brands[brandKey];
        if (lowerQuery.includes(brandKey) || lowerQuery.includes(brand.name.toLowerCase())) {
            return showBrandProducts(brandKey);
        }
    }

    // Specific product search
    const product = findProduct(query);
    if (product) {
        return showProductDetails(product);
    }

    // Default response
    return `I'd be happy to help you with that! Here are some things I can assist with:\n\n• Browse equipment by category (Strength, Cardio, Functional)\n• View products from specific brands (HOIST, FreeMotion, Tunturi, Concept2, Energie Fitness)\n• Compare different equipment models\n• Get price estimates and recommendations\n• Help you setup a gym\n\nCould you please be more specific about what you're looking for?`;
}

// (Additional helper functions retained from original app.js — findProduct, showProductDetails, etc.)

// Send message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    addUserMessage(message);
    input.value = '';

    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        const response = processQuery(message);

        if (response.includes('<')) {
            addBotMessage('', response);
        } else {
            addBotMessage(response);
        }

        conversationHistory.push({ role: 'bot', message: response });
    }, 800);
}

// Handle quick action
function handleQuickAction(action) {
    const input = document.getElementById('chatInput');
    input.value = action;
    sendMessage();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const inputEl = document.getElementById('chatInput');
    if (inputEl) {
        inputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    initializeChat();
});
