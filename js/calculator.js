// INDUSTRY PRESET DATA BASED ON DATA_POINTS.MD
const industryPresets = {
    bess: {
        name: 'BATTERY ENERGY STORAGE SYSTEMS',
        ericoUnitCost: 150,
        competitorUnitCost: 100,
        installCost: 150,
        downtimeCostPerHour: 5000,
        downtimeHours: 6,
        equipmentDamageCost: 15000,
        description: 'FREQUENT SWITCHING DURING CHARGE/DISCHARGE CYCLES, GRID SYNCHRONIZATION EVENTS, AND POWER CONDITIONING OPERATIONS CREATE TRANSIENT SURGES THAT THREATEN INVERTER AND CONTROL SYSTEM RELIABILITY'
    },
    renewables: {
        name: 'SOLAR & WIND FARMS',
        ericoUnitCost: 150,
        competitorUnitCost: 100,
        installCost: 150,
        downtimeCostPerHour: 3000,
        downtimeHours: 4,
        equipmentDamageCost: 8000,
        description: 'INVERTER SWITCHING DURING POWER CONVERSION, GRID CONNECTION/DISCONNECTION EVENTS, AND MPPT TRACKING OPERATIONS GENERATE TRANSIENTS THAT CAN DAMAGE POWER ELECTRONICS AND REDUCE ENERGY YIELD'
    },
    microgrid: {
        name: 'DISTRIBUTED ENERGY SYSTEMS',
        ericoUnitCost: 150,
        competitorUnitCost: 100,
        installCost: 150,
        downtimeCostPerHour: 4000,
        downtimeHours: 5,
        equipmentDamageCost: 12000,
        description: 'ISLANDING OPERATIONS, LOAD TRANSFER SWITCHING, AND GENERATOR SYNCHRONIZATION EVENTS CREATE COMPLEX TRANSIENT CONDITIONS THAT THREATEN DISTRIBUTED ENERGY RESOURCE COORDINATION AND GRID STABILITY'
    },
    datacenter: {
        name: 'HYPERSCALE DATA CENTERS',
        ericoUnitCost: 150,
        competitorUnitCost: 100,
        installCost: 150,
        downtimeCostPerHour: 100000,
        downtimeHours: 2,
        equipmentDamageCost: 50000,
        description: 'UPS TRANSFER SWITCHING, POWER DISTRIBUTION UNIT OPERATIONS, AND SERVER LOAD FLUCTUATIONS GENERATE TRANSIENTS THAT CAN TRIGGER CASCADING FAILURES IN MISSION-CRITICAL COMPUTING INFRASTRUCTURE'
    }
};

// ROI Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider synchronization
    initializeSliders();
    
    // Add event listeners to all inputs
    addEventListeners();
    
    // Add industry section event listeners
    addIndustryEventListeners();
    
    // Perform initial calculation
    calculate();
});

function initializeSliders() {
    // Sync ERICO unit cost slider and input
    const ericoUnitCostSlider = document.getElementById('ericoUnitCostSlider');
    const ericoUnitCostInput = document.getElementById('ericoUnitCost');
    
    ericoUnitCostSlider.addEventListener('input', function() {
        ericoUnitCostInput.value = this.value;
        calculate();
    });
    
    ericoUnitCostInput.addEventListener('input', function() {
        const value = Math.max(100, Math.min(500, parseInt(this.value) || 150));
        this.value = value;
        ericoUnitCostSlider.value = value;
        calculate();
    });
    
    // Sync competitor unit cost slider and input
    const competitorUnitCostSlider = document.getElementById('competitorUnitCostSlider');
    const competitorUnitCostInput = document.getElementById('competitorUnitCost');
    
    competitorUnitCostSlider.addEventListener('input', function() {
        competitorUnitCostInput.value = this.value;
        calculate();
    });
    
    competitorUnitCostInput.addEventListener('input', function() {
        const value = Math.max(50, Math.min(300, parseInt(this.value) || 100));
        this.value = value;
        competitorUnitCostSlider.value = value;
        calculate();
    });
    
    // Sync installation cost slider and input
    const installCostSlider = document.getElementById('installCostSlider');
    const installCostInput = document.getElementById('installCost');
    
    installCostSlider.addEventListener('input', function() {
        installCostInput.value = this.value;
        calculate();
    });
    
    installCostInput.addEventListener('input', function() {
        const value = Math.max(50, Math.min(400, parseInt(this.value) || 150));
        this.value = value;
        installCostSlider.value = value;
        calculate();
    });
    
    // Sync downtime cost slider and input
    const downtimeCostSlider = document.getElementById('downtimeCostSlider');
    const downtimeCostInput = document.getElementById('downtimeCostInput');
    
    downtimeCostSlider.addEventListener('input', function() {
        downtimeCostInput.value = this.value;
        calculate();
    });
    
    downtimeCostInput.addEventListener('input', function() {
        const value = Math.max(500, Math.min(200000, parseInt(this.value) || 500));
        this.value = value;
        downtimeCostSlider.value = value;
        calculate();
    });
    
    // Sync downtime hours slider and input
    const downtimeHoursSlider = document.getElementById('downtimeHoursSlider');
    const downtimeHoursInput = document.getElementById('downtimeHoursInput');
    
    downtimeHoursSlider.addEventListener('input', function() {
        downtimeHoursInput.value = this.value;
        calculate();
    });
    
    downtimeHoursInput.addEventListener('input', function() {
        const value = Math.max(1, Math.min(48, parseInt(this.value) || 1));
        this.value = value;
        downtimeHoursSlider.value = value;
        calculate();
    });
    
    // Sync equipment damage slider and input
    const equipmentDamageSlider = document.getElementById('equipmentDamageSlider');
    const equipmentDamageInput = document.getElementById('equipmentDamageCost');
    
    equipmentDamageSlider.addEventListener('input', function() {
        equipmentDamageInput.value = this.value;
        calculate();
    });
    
    equipmentDamageInput.addEventListener('input', function() {
        const value = Math.max(1000, Math.min(100000, parseInt(this.value) || 2500));
        this.value = value;
        equipmentDamageSlider.value = value;
        calculate();
    });
}

function addEventListeners() {
    // Add event listeners to all input fields
    const inputs = [
        'ericoUnitCost',
        'competitorUnitCost', 
        'installCost',
        'equipmentDamageCost'
    ];
    
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', calculate);
    });
}

function addIndustryEventListeners() {
    // Add click event listeners to industry buttons
    const industryButtons = ['bess-btn', 'renewables-btn', 'microgrid-btn', 'datacenter-btn'];
    
    industryButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        const industryKey = buttonId.replace('-btn', '');
        
        button.addEventListener('click', function() {
            loadIndustryPreset(industryKey);
            setActiveIndustryButton(buttonId);
        });
    });
}

function loadIndustryPreset(industryKey) {
    const preset = industryPresets[industryKey];
    if (!preset) return;
    
    // Update all input fields and sliders with preset values
    document.getElementById('ericoUnitCost').value = preset.ericoUnitCost;
    document.getElementById('ericoUnitCostSlider').value = preset.ericoUnitCost;
    document.getElementById('competitorUnitCost').value = preset.competitorUnitCost;
    document.getElementById('competitorUnitCostSlider').value = preset.competitorUnitCost;
    document.getElementById('installCost').value = preset.installCost;
    document.getElementById('installCostSlider').value = preset.installCost;
    document.getElementById('downtimeCostInput').value = preset.downtimeCostPerHour;
    document.getElementById('downtimeCostSlider').value = preset.downtimeCostPerHour;
    document.getElementById('downtimeHoursInput').value = preset.downtimeHours;
    document.getElementById('downtimeHoursSlider').value = preset.downtimeHours;
    document.getElementById('equipmentDamageCost').value = preset.equipmentDamageCost;
    document.getElementById('equipmentDamageSlider').value = preset.equipmentDamageCost;
    
    // Update section description to show current selection
    updateSectionDescription(preset.name, preset.description);
    
    // Recalculate with new values
    calculate();
}

function setActiveIndustryButton(activeButtonId) {
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.industry-btn');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to clicked button
    document.getElementById(activeButtonId).classList.add('active');
}

function updateSectionDescription(name, description) {
    // Update the section selector description text
    const selectorDescription = document.getElementById('industry-description');
    if (selectorDescription) {
        selectorDescription.innerHTML = `
            <div class="flex items-center justify-center space-x-2">
                <span class="text-lg">⚡</span>
                <span class="text-sm uppercase tracking-wider font-bold">CURRENT SELECTION:</span>
                <span class="text-base font-extrabold">${name}</span>
            </div>
            <div class="text-sm mt-2 italic opacity-90">${description}</div>
        `;
    }
}

function calculate() {
    // Get input values
    const ericoUnitCost = parseFloat(document.getElementById('ericoUnitCost').value) || 0;
    const competitorUnitCost = parseFloat(document.getElementById('competitorUnitCost').value) || 0;
    const installCost = parseFloat(document.getElementById('installCost').value) || 0;
    const downtimeCostPerHour = parseFloat(document.getElementById('downtimeCostInput').value) || 0;
    const downtimeHours = parseFloat(document.getElementById('downtimeHoursInput').value) || 0;
    const equipmentDamageCost = parseFloat(document.getElementById('equipmentDamageCost').value) || 0;
    
    // Perform calculations according to design spec
    const ericoInitialInvestment = ericoUnitCost + installCost;
    const competitorInitialInvestment = competitorUnitCost + installCost;
    const additionalCostForErico = ericoInitialInvestment - competitorInitialInvestment;
    const totalDowntimeCost = downtimeCostPerHour * downtimeHours;
    const competitorReplacementCost = competitorUnitCost + installCost;
    const totalFailureCost = totalDowntimeCost + equipmentDamageCost + competitorReplacementCost;
    
    // Calculate ROI with edge case handling
    let roi;
    if (additionalCostForErico <= 0 && totalFailureCost > 0) {
        roi = Infinity;
    } else if (additionalCostForErico > 0) {
        roi = ((totalFailureCost - additionalCostForErico) / additionalCostForErico) * 100;
    } else {
        roi = 0;
    }
    
    const ericoTco = ericoInitialInvestment;
    const competitorTco = competitorInitialInvestment + totalFailureCost;
    
    // Update UI
    updateResults({
        totalFailureCost,
        roi,
        ericoTco,
        competitorTco,
        additionalCostForErico,
        ericoInitialInvestment,
        competitorInitialInvestment
    });
}

function updateResults(results) {
    // Update KPI cards with fade-in animation
    const totalFailureCostElement = document.getElementById('totalFailureCost');
    const roiElement = document.getElementById('roi');
    
    totalFailureCostElement.textContent = formatCurrency(results.totalFailureCost);
    totalFailureCostElement.classList.add('fade-in');
    
    if (results.roi === Infinity) {
        roiElement.textContent = '%';
    } else {
        roiElement.textContent = formatPercentage(results.roi);
    }
    roiElement.classList.add('fade-in');
    
    // Update TCO display values
    document.getElementById('ericoTcoDisplay').textContent = formatCurrency(results.ericoTco);
    document.getElementById('competitorTcoDisplay').textContent = formatCurrency(results.competitorTco);
    
    // Update cost comparison in Initial Investment section
    const ericoTotalElement = document.getElementById('ericoTotalCost');
    const competitorTotalElement = document.getElementById('competitorTotalCost');
    const costComparisonBarElement = document.getElementById('costComparisonBar');
    
    if (ericoTotalElement && competitorTotalElement && costComparisonBarElement) {
        ericoTotalElement.textContent = formatCurrency(results.ericoInitialInvestment);
        competitorTotalElement.textContent = formatCurrency(results.competitorInitialInvestment);
        
        // Calculate percentage for comparison bar
        const maxCost = Math.max(results.ericoInitialInvestment, results.competitorInitialInvestment);
        const ericoPercentage = (results.ericoInitialInvestment / maxCost) * 100;
        costComparisonBarElement.style.width = `${ericoPercentage}%`;
    }
    
    // Update damage meter
    updateDamageMeter(results.totalFailureCost);
    
    // Update breakdown displays
    updateBreakdownDisplays(results);
    
    // Update chart bars
    updateChart(results.ericoTco, results.competitorTco);
    
    // Remove fade-in class after animation
    setTimeout(() => {
        totalFailureCostElement.classList.remove('fade-in');
        roiElement.classList.remove('fade-in');
    }, 300);
}

function updateDamageMeter(totalFailureCost) {
    const damageMeterElement = document.getElementById('damageMeters');
    const riskLevelElement = document.getElementById('riskLevel');
    
    if (!damageMeterElement || !riskLevelElement) return;
    
    // Calculate risk level based on total failure cost
    let riskLevel, riskText, riskPercentage;
    
    if (totalFailureCost <= 10000) {
        riskLevel = 'LOW';
        riskText = 'text-yellow-600';
        riskPercentage = 25;
    } else if (totalFailureCost <= 50000) {
        riskLevel = 'MODERATE';
        riskText = 'text-orange-600';
        riskPercentage = 50;
    } else if (totalFailureCost <= 200000) {
        riskLevel = 'HIGH';
        riskText = 'text-red-600';
        riskPercentage = 75;
    } else {
        riskLevel = 'CRITICAL';
        riskText = 'text-red-800';
        riskPercentage = 100;
    }
    
    // Update risk level text and color
    riskLevelElement.textContent = riskLevel;
    riskLevelElement.className = `font-bold ${riskText}`;
    
    // Update damage meter bar
    damageMeterElement.style.width = `${riskPercentage}%`;
}

function updateBreakdownDisplays(results) {
    // Update ERICO breakdown
    const ericoInitialBreakdown = document.getElementById('ericoInitialBreakdown');
    const ericoTotalBreakdown = document.getElementById('ericoTotalBreakdown');
    
    if (ericoInitialBreakdown && ericoTotalBreakdown) {
        ericoInitialBreakdown.textContent = formatCurrency(results.ericoInitialInvestment);
        ericoTotalBreakdown.textContent = formatCurrency(results.ericoTco);
    }
    
    // Update Competitor breakdown
    const competitorInitialBreakdown = document.getElementById('competitorInitialBreakdown');
    const competitorFailureBreakdown = document.getElementById('competitorFailureBreakdown');
    const competitorTotalBreakdown = document.getElementById('competitorTotalBreakdown');
    
    if (competitorInitialBreakdown && competitorFailureBreakdown && competitorTotalBreakdown) {
        competitorInitialBreakdown.textContent = formatCurrency(results.competitorInitialInvestment);
        competitorFailureBreakdown.textContent = formatCurrency(results.totalFailureCost);
        competitorTotalBreakdown.textContent = formatCurrency(results.competitorTco);
    }
}

function updateChart(ericoTco, competitorTco) {
    // Update the new vertical bars
    const maxValue = Math.max(ericoTco, competitorTco);
    const ericoBarVertical = document.getElementById('ericoBarVertical');
    const competitorBarVertical = document.getElementById('competitorBarVertical');
    
    if (ericoBarVertical && competitorBarVertical) {
        // Calculate percentages for bar heights
        const ericoHeight = (ericoTco / maxValue) * 100;
        const competitorHeight = (competitorTco / maxValue) * 100;
        
        // Update bar heights with animation
        ericoBarVertical.style.height = `${Math.max(ericoHeight, 10)}%`; // Minimum 10% for visibility
        competitorBarVertical.style.height = `${competitorHeight}%`;
    }
    
    // Also update legacy horizontal bars if they exist
    const ericoBar = document.getElementById('ericoBar');
    const competitorBar = document.getElementById('competitorBar');
    
    if (ericoBar && competitorBar) {
        const ericoWidth = (ericoTco / maxValue) * 100;
        const competitorWidth = (competitorTco / maxValue) * 100;
        ericoBar.style.width = `${Math.max(ericoWidth, 15)}%`;
        competitorBar.style.width = `${competitorWidth}%`;
    }
}

function updateSummary(results) {
    const summaryElement = document.getElementById('summaryText');
    const additionalCost = Math.abs(results.additionalCostForErico);
    const costDifference = results.additionalCostForErico;
    
    let summaryText;
    
    if (costDifference > 0) {
        // ERICO is more expensive
        summaryText = `
            <p>
                While the ERICO EDT2 requires an additional investment of <strong class="text-nvent-orange">${formatCurrency(additionalCost)}</strong> 
                compared to the competitor, this investment pays for itself immediately. 
                The <strong>Transient Discriminating (TD) Technology</strong> prevents failure events 
                that would cost <strong class="text-nvent-red">${formatCurrency(results.totalFailureCost)}</strong>, delivering an 
                exceptional <strong class="text-nvent-gold">${results.roi === Infinity ? '' : formatPercentage(results.roi)}</strong> ROI on your additional investment.
            </p>
        `;
    } else if (costDifference < 0) {
        // ERICO is cheaper
        summaryText = `
            <p>
                The ERICO EDT2 costs <strong class="text-nvent-gold">${formatCurrency(additionalCost)} less</strong> 
                than the competitor while providing superior protection. 
                The <strong>Transient Discriminating (TD) Technology</strong> prevents failure events 
                that would cost <strong class="text-nvent-red">${formatCurrency(results.totalFailureCost)}</strong>, 
                making this an exceptional value proposition with immediate savings and risk reduction.
            </p>
        `;
    } else {
        // Same cost
        summaryText = `
            <p>
                The ERICO EDT2 costs the same as the competitor but provides vastly superior protection. 
                The <strong>Transient Discriminating (TD) Technology</strong> prevents failure events 
                that would cost <strong class="text-nvent-red">${formatCurrency(results.totalFailureCost)}</strong>, 
                making this a no-brainer choice for risk reduction at no additional cost.
            </p>
        `;
    }
    
    summaryElement.innerHTML = summaryText;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatPercentage(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value / 100);
}