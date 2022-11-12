var finances = [
    ['Jan-2010', 867884],
    ['Feb-2010', 984655],
    ['Mar-2010', 322013],
    ['Apr-2010', -69417],
    ['May-2010', 310503],
    ['Jun-2010', 522857],
    ['Jul-2010', 1033096],
    ['Aug-2010', 604885],
    ['Sep-2010', -216386],
    ['Oct-2010', 477532],
    ['Nov-2010', 893810],
    ['Dec-2010', -80353],
    ['Jan-2011', 779806],
    ['Feb-2011', -335203],
    ['Mar-2011', 697845],
    ['Apr-2011', 793163],
    ['May-2011', 485070],
    ['Jun-2011', 584122],
    ['Jul-2011', 62729],
    ['Aug-2011', 668179],
    ['Sep-2011', 899906],
    ['Oct-2011', 834719],
    ['Nov-2011', 132003],
    ['Dec-2011', 309978],
    ['Jan-2012', -755566],
    ['Feb-2012', 1170593],
    ['Mar-2012', 252788],
    ['Apr-2012', 1151518],
    ['May-2012', 817256],
    ['Jun-2012', 570757],
    ['Jul-2012', 506702],
    ['Aug-2012', -1022534],
    ['Sep-2012', 475062],
    ['Oct-2012', 779976],
    ['Nov-2012', 144175],
    ['Dec-2012', 542494],
    ['Jan-2013', 359333],
    ['Feb-2013', 321469],
    ['Mar-2013', 67780],
    ['Apr-2013', 471435],
    ['May-2013', 565603],
    ['Jun-2013', 872480],
    ['Jul-2013', 789480],
    ['Aug-2013', 999942],
    ['Sep-2013', -1196225],
    ['Oct-2013', 268997],
    ['Nov-2013', -687986],
    ['Dec-2013', 1150461],
    ['Jan-2014', 682458],
    ['Feb-2014', 617856],
    ['Mar-2014', 824098],
    ['Apr-2014', 581943],
    ['May-2014', 132864],
    ['Jun-2014', 448062],
    ['Jul-2014', 689161],
    ['Aug-2014', 800701],
    ['Sep-2014', 1166643],
    ['Oct-2014', 947333],
    ['Nov-2014', 578668],
    ['Dec-2014', 988505],
    ['Jan-2015', 1139715],
    ['Feb-2015', 1029471],
    ['Mar-2015', 687533],
    ['Apr-2015', -524626],
    ['May-2015', 158620],
    ['Jun-2015', 87795],
    ['Jul-2015', 423389],
    ['Aug-2015', 840723],
    ['Sep-2015', 568529],
    ['Oct-2015', 332067],
    ['Nov-2015', 989499],
    ['Dec-2015', 778237],
    ['Jan-2016', 650000],
    ['Feb-2016', -1100387],
    ['Mar-2016', -174946],
    ['Apr-2016', 757143],
    ['May-2016', 445709],
    ['Jun-2016', 712961],
    ['Jul-2016', -1163797],
    ['Aug-2016', 569899],
    ['Sep-2016', 768450],
    ['Oct-2016', 102685],
    ['Nov-2016', 795914],
    ['Dec-2016', 60988],
    ['Jan-2017', 138230],
    ['Feb-2017', 671099]
];

// given the debate in class over this challenge I have implemented three different ways of calculating the greatest increase / decrease in profits
// given_solution calculates the output provided by Noah Hoffman, updating the highest_increase and highest_decrease with the difference
// highest_profit_with_difference uses the difference in amount between this month and the previous month and outputs the difference
// highest_profit_with_amount uses the difference in amount between this month and the previous month and outputs the amount
const evaluation_methods = { given_solution:1 , highest_profit_with_difference:2, highest_profit_with_amount:3 };
var evaluation_method = evaluation_methods.given_solution;

var highest_increase = { month:'', amount:0, difference:0 }; // entry for highest increase in profits
var highest_decrease = { month:'', amount:0, difference:0 }; // entry for highest decrease in profits
var previous_month; // profit / loss amount for the previous month
var average_change = 0; // running average of change from month to month
var total_months = 0; // months counter
var total_profit_loss = 0; // total profit and loss
var debug_level = 0; // set positive for debug

function analyse_entry(m, a) {
    let entry = { month: m, amount: a };

    if (debug_level > 0) console.log("Month:" + entry.month + " Profit/Loss:" + entry.amount);

    if (undefined == previous_month) { // previous month is undefined so first month only
        average_change = entry.amount; // initialise with the value for the first month
    }
    else { // only calculate difference if we have the profit/loss from the previous month
        var difference = entry.amount - previous_month; // calculate difference from previous month
        if (debug_level > 1) console.log("difference: " + difference + " previous month:" + previous_month + " amount:" + entry.amount);
        var increase, decrease;
        switch (evaluation_method) {
            case evaluation_methods.given_solution:
                increase = highest_increase.amount;
                decrease = highest_decrease.amount;
                break;
            case evaluation_methods.highest_profit_with_amount:
            case evaluation_methods.highest_profit_with_difference:
                increase = highest_increase.difference;
                decrease = highest_decrease.difference;
                break;
            default: console.log("ERROR: Unexpected evaluation method");
        }
        if (difference > increase) {
            highest_increase.month = entry.month;
            highest_increase.amount = entry.amount;
            highest_increase.difference = difference;
            if (debug_level > 2) console.log("New MAX positive");
        }
        if (difference < decrease) {
            highest_decrease.month = entry.month;
            highest_decrease.amount = entry.amount;
            highest_decrease.difference = difference;
            if (debug_level > 2) console.log("New MAX negative");
        }
        average_change += difference;
    }
    total_profit_loss += entry.amount; // running total of profit / loss
    total_months++; // month counter
    previous_month = entry.amount; // update previous month so next month this month will be the previous month
}

function analyse_dataset() {
    finances.forEach(function (entry) {
        analyse_entry.apply(this, entry);
    });
    average_change = average_change / total_months; // having traversed the array finally divide sum by total to give average
}

function output_results() {
    var increase, decrease;
    switch (evaluation_method) {
        case evaluation_methods.given_solution:
        case evaluation_methods.highest_profit_with_amount:
            increase = highest_increase.amount;
            decrease = highest_decrease.amount;
            break;
        case evaluation_methods.highest_profit_with_difference:
            increase = highest_increase.difference;
            decrease = highest_decrease.difference;
            break;
        default:
            console.log("ERROR: Unexpected evaluation method");
            break;
    }

    console.log(
        "Financial Analysis\n" +
        "----------------------------\n" +
        "Total Months: " + total_months + "\n" +
        "Total: $" + total_profit_loss + "\n" +
        "Average Change: $" + average_change.toFixed(2) + "\n" + // display to 2 decimal places
        "Greatest Increase in Profits: " + highest_increase.month + " ($" + increase + ")\n" +
        "Greatest Decrease in Profits: " + highest_decrease.month + " ($" + decrease + ")"
        );
}

function solution() {
    analyse_dataset();
    output_results();
}

// calculate solution
window.onload = solution();
