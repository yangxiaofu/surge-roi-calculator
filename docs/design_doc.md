Design Document: ERICO EDT2 ROI & TCO Calculator App
1. Project Overview & Objective
    • Project Name: ERICO EDT2 - ROI & Total Cost of Ownership (TCO) Calculator
    • Objective: To create a standalone, offline-capable web application for the nVent ERICO sales team. The tool will be used on iPads or laptops during client meetings to visually and financially demonstrate the superiority of the ERICO EDT2 surge protection device, with its proprietary Transient Discriminating (TD) Technology, over competing products.
    • Core Value Proposition: The app must clearly translate the technical advantages of TD Technology (specifically its ability to withstand Temporary Overvoltages) into a compelling financial argument based on ROI and lower TCO.
2. Target Audience & Use Case
    • Primary Users: nVent ERICO Sales Representatives.
    • Environment: Face-to-face client meetings, potentially in locations without internet access.
    • Device: Primarily designed for iPad, but must be fully responsive for laptop use.
    • User Interaction: The salesperson will input client-specific data into the app. The app will instantly update results, facilitating a dynamic and persuasive conversation about risk and cost avoidance.
3. Visual Design & Branding
The application must strictly adhere to the nVent corporate brand guidelines.
    • Color Palette:
        ○ Primary/Accent (ERICO): nVent Orange (#ff6319) - Used for headers, ERICO's TCO bar, interactive elements (sliders), and key highlights in summary text.
        ○ Competitor/Risk: nVent Red (#c4262e) - Used for competitor's TCO bar and the "Cost of Failure" KPI.
        ○ Dark Red Accent: nVent Dark Red (#772432) - Used for sub-text in risk-related KPIs.
        ○ Positive ROI: nVent Gold (#eeaf00) - Used for the ROI percentage KPI.
        ○ Typography & Structure:
            § nVent Dark Gray (#3D3E3F) for primary section headers.
            § Standard grays (slate-500, slate-700) for body copy and labels.
    • Typography:
        ○ Font: Inter (loaded from Google Fonts).
        ○ Hierarchy: Clear hierarchy with h1, h2, h3, labels, and paragraph styles. Key numbers in results should be large and bold to draw attention.
    • Layout:
        ○ Clean, professional, and spacious.
        ○ Use rounded corners on all cards, inputs, and buttons.
        ○ Employ shadows and borders to create depth and clearly define sections.
4. UI/UX & Component Specification
The application is a single-page interface divided into two main columns for seamless interaction.
4.1. Left Column: Inputs (lg:col-span-2)
This column is dedicated to user-configurable data.
    • Section 1: Initial Investment
        ○ ERICO EDT2 Unit Cost: Number input, pre-filled with $350.
        ○ Competitor Unit Cost: Number input, pre-filled with $250.
        ○ Installation & Extra Costs: Number input, pre-filled with $150. Includes a note about ERICO potentially not needing external fusing.
    • Section 2: Cost of a Single Failure Event
        ○ Header & Description: This section must explicitly mention and bold "Transient Discriminating (TD) Technology" as the enabler for avoiding these costs.
        ○ Downtime Cost per Hour: A synchronized slider and number input.
            § Range: $500 - $20,000. Default: $2000.
        ○ Hours of Downtime per Event: A synchronized slider and number input.
            § Range: 1 - 48 hours. Default: 4.
        ○ Value of Damaged Equipment: Number input. Default: $2500.
4.2. Right Column: Results (lg:col-span-3)
This column dynamically displays all calculated results. All elements here must update in real-time as inputs are changed.
    • Section 1: The ERICO Advantage Callout
        ○ A visually distinct banner (light orange background, orange border) with a shield/success icon.
        ○ Headline: "The ERICO Advantage: TD Technology"
        ○ Body: Reinforces that the results are due to the proprietary Transient Discriminating (TD) Technology.
    • Section 2: Key Metrics (KPI Cards)
        ○ A 2-column grid displaying two prominent cards:
            § Cost of ONE Failure Event: Red-themed card. Displays totalFailureCost.
            § Return on Investment (ROI): Gold-themed card. Displays roi.
    • Section 3: TCO Comparison Chart
        ○ A horizontal bar chart comparing ERICO vs. Competitor.
        ○ ERICO Bar:
            § Color: nvent-orange.
            § Text: "Initial Cost" (Black, bold text for contrast).
            § Value: ericoTco.
        ○ Competitor Bar:
            § Color: nvent-red.
            § Text: "Initial Cost + Cost of One Failure" (White, bold text).
            § Value: competitorTco.
    • Section 4: Summary & Value Proposition
        ○ A final summary text block that dynamically updates.
        ○ Content: The text must clearly state the initial investment difference and the total loss avoided, explicitly crediting the "Transient Discriminating (TD) Technology" as the reason for the powerful ROI.
5. Calculation Logic (JavaScript)
The core logic resides in the calculate() function.
    • Inputs: All values are parsed from the input fields as floats.
    • Formulas:
        1. ericoInitialInvestment = ericoUnitCost + installCost
        2. competitorInitialInvestment = competitorUnitCost + installCost
        3. additionalCostForErico = ericoInitialInvestment - competitorInitialInvestment
        4. totalDowntimeCost = downtimeCostPerHour * downtimeHours
        5. competitorReplacementCost = competitorUnitCost + installCost
        6. totalFailureCost = totalDowntimeCost + equipmentDamageCost + competitorReplacementCost
        7. roi = ((totalFailureCost - additionalCostForErico) / additionalCostForErico) * 100
            § Edge Case: If additionalCostForErico is zero or negative (ERICO is cheaper) and totalFailureCost is positive, ROI is Infinity.
        8. ericoTco = ericoInitialInvestment
        9. competitorTco = competitorInitialInvestment + totalFailureCost
    • UI Updates: All output fields and chart bars are updated at the end of the calculate() function. Values should be formatted as currency where appropriate.
6. Technical Specifications
    • Architecture: Single, self-contained index.html file. No server-side processing.
    • Frontend Frameworks: None. Plain HTML and JavaScript.
    • Styling: Tailwind CSS loaded via CDN. A <style> block contains minor custom overrides and animations.
    • Dependencies:
        1. Tailwind CSS: https://cdn.tailwindcss.com
        2. Google Fonts (Inter): https://fonts.googleapis.com/css2?family=Inter...
    • Animations: Subtle fadeIn animation on result elements to provide a smooth user experience on data change. Bar charts should animate their width change.
