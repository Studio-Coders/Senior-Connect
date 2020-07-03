// Make algorithm
// Get values from form input
// Matching
// For every volunteer, create a list of seniors free during their time
// Store the number of visits the senior already has in another list.
// Get the index number of the smallest number of visits from the visit list.
// If there are multiple smallest numbers, for each corresponding senior, compare the difference between the senior and volunteer’s introversion score. The pair with the least difference in score will be a match.
// Take the matched senior out of the grand list.
// Store the pair in a new list called matches
// Repeat with other volunteers until the pool of volunteers is deprecated
// Sending the matched pairs to the html’s table

if (true) {
    var volunteers = [
        {
            name: "Cleo",
            times: [
                [1, "15:00", "17:00"],
                [3, "9:00", "11:00"],
            ],
            intEx: 34,
        },
        {
            name: "Jonathan",
            times: [
                [2, "15:00", "17:00"],
                [4, "19:00", "20:00"],
            ],
            intEx: 77,
        },
        {
            name: "Marina",
            times: [
                [0, "9:00", "10:00"],
                [5, "17:50", "20:50"],
                [6, "13:45", "15:00"],
            ],
            intEx: 63,
        },
    ];

    var seniors = [
        {
            name: "Nancy",
            times: [
                [0, "13:30", "16:45"],
                [4, "10:00", "12:00"],
                [6, "18:00", "19:00"],
            ],
            intEx: 50,
            visits: 0,
        },
        {
            name: "Walter",
            times: [
                [3, "9:00", "12:00"],
                [5, "13:00", "14:00"],
                [6, "15:00", "19:00"],
            ],
            intEx: 30,
            visits: 1,
        },
        {
            name: "Philomena",
            times: [
                [0, "11:00", "12:00"],
                [1, "17:00", "19:00"],
                [2, "9:00", "10:30"],
            ],
            intEx: 90,
            visits: 0,
        },
    ];
}

var volunteers = [
    {
        name: "Cleo",
        times: [
            [0, "9:00", "11:00"],
            [0, "15:00", "17:00"],
        ],
        intEx: 34,
    },
    {
        name: "Jonathan",
        times: [
            [0, "15:00", "17:00"],
            [0, "19:00", "20:00"],
        ],
        intEx: 77,
    },
    {
        name: "Marina",
        times: [
            [0, "9:00", "10:00"],
            [0, "13:45", "15:00"],
            [0, "17:50", "20:50"],
        ],
        intEx: 63,
    },
];

var seniors = [
    {
        name: "Nancy",
        times: [
            [0, "10:00", "12:00"],
            [0, "13:30", "16:45"],
            [0, "18:00", "19:00"],
        ],
        intEx: 50,
        visits: 0,
    },
    {
        name: "Walter",
        times: [
            [0, "9:01", "12:00"],
            [0, "13:00", "14:00"],
            [0, "15:00", "19:00"],
        ],
        intEx: 30,
        visits: 1,
    },
    {
        name: "Philomena",
        times: [
            [0, "9:04", "10:30"],
            [0, "11:00", "12:00"],
            [0, "17:00", "19:00"],
        ],
        intEx: 90,
        visits: 0,
    },
];

function getTimeByName(type, name) {
    // type is array of objects, name is a string
    // return times array given the type and name of person
    for (var i = 0; i < type.length; i++) {
        if (type[i].name === name) {
            return type[i].times;
        }
    }
}

function getDayofWeekFromTime(times) {
    // times is array of times
    // Ex. times = [0, '13:30','16:45']
    // Return 0
    return times[0];
}

function getTimesFromTimes(times) {
    // times is array of times
    // Ex. times = [0, '13:30','16:45']
    // Return ['13:30','16:45']
    return times.slice(1, times.length);
}

function getTimeOnWeekDay(type, name, weekday) {
    // Given the type, name, and weekday, return array of times on that weekday only
    var times = getTimeByName(type, name);
    var returnTimes = [];
    for (var i = 0; i < times.length; i++) {
        if (times[i][0] === weekday) {
            returnTimes.push([times[i][1], times[i][2]]);
        }
    }
    return returnTimes;
}

function matchByAvailability(volunteers, seniors) {
    // Given 2 arrays, one of volunteers, and one of seniors, it returns array of objects of all possible matches
    // Addresses time

    function getSeniorsbyDayAvailability(roleName) {
        // Return names of seniors that matches volunteer's day as an array, daySeniorNameList.
        /* Example output below:
            [
        [ 0, 'Nancy', 'Philomena' ],
        [ 5, 'Walter' ],
        [ 6, 'Nancy', 'Walter' ]
            ]
        */

        function getRoleDays(role, roleName) {
            // Return the role's available days as an array
            var roleTimes = getTimeByName(role, roleName);
            var roleDays = [];
            for (let i = 0; i < roleTimes.length; i++) {
                roleDays.push(roleTimes[i][0]);
            }
            return roleDays;
        }

        volunteerDays = getRoleDays(volunteers, roleName);

        daySeniorNameList = []
        for (let i = 0; i < volunteerDays.length; i++) {
            daySeniorNameList.push([]);
        }

        for (let i = 0; i < volunteerDays.length; i++) {
            for (let j = 0; j < seniors.length; j++) {
                seniorDays = getRoleDays(seniors, seniors[j].name);
                for (let x = 0; x < seniorDays.length; x++) {
                    if (volunteerDays[i] == seniorDays[x]) {
                        if (daySeniorNameList[i].includes(volunteerDays[i]) == false) {
                            daySeniorNameList[i].push(volunteerDays[i]);
                        }
                        daySeniorNameList[i].push(seniors[j].name);
                    }
                }

            }
        }
        return daySeniorNameList;
    }

    function getSeniorsbyTimeAvailability(seniors, volunteers, seniorsNameDayed, volunteerName) {
        // Return names of seniors that matches volunteer's times as an array
        // seniorsNameDayed are all the seniors that are available on the same day as the volunteer as an array

        function mainTimeMatcher(times1, times2) {
            function getHours(time) {
                return time.slice(0, time.indexOf(":"));
            }

            function getMinutes(time) {
                return time.slice(time.indexOf(":") + 1, time.length - 1);
            }

            function calculateSlotTime(time1, time2) {
                var hours = getHours(time2) - getHours(time1);
                var minutes = 0;
                if (getMinutes(time1) > getMinutes(time2)) {
                    hours -= 1;
                    minutes = getMinutes(time2) + 60 - getMinutes(time1);
                } else {
                    minutes = getMinutes(time2) - getMinutes(time1);
                }
                return hours * 60 + minutes;
            }

            function getStartTime(time) {
                return time[0];
            }

            function getEndTime(time) {
                return time[1];
            }
            /*
                times1: [							true
                    ['9:00', '10:00'],
                    ['13:45', '15:00'],
                    ['17:50', '20:50']
                ]
                times2: [							false
                    ['10:00', '12:00'],
                    ['13:30', '16:45'],
                    ['18:00', '19:00']
                ]
            */
            var timesToget = [];
            var sessionLength = 10; // In minutes

            var index1 = 0;
            var index2 = 0;
            var main = true;
            while (index1 < times1.length && index2 < times2.length) {
                // Check which start time of the first time comes first
                if (getHours(times1[index1][0]) < getHours(times2[index2][0])) {
                    main = false;
                } else if (getHours(times1[index1][0]) === getHours(times2[index2][0])) {
                    if (getMinutes(times1[index1][0]) < getMinutes(times2[index2][0])) {
                        main = false;
                    }
                }

                if (!main) {
                    // Times 2 slot in fully inside Times 1 slot
                    if (calculateSlotTime(getStartTime(times2[index2]), getEndTime(times2[index2])) >= sessionLength && getStartTime(times1[index1]) <= getStartTime(times2[index2]) && getEndTime(times1[index1]) >= getEndTime(times2[index2])) {
                        timesToget.push([getStartTime(times2[index2]), getEndTime(times2[index2])]);
                    } else if (calculateSlotTime(getStartTime(times2[index2]), getEndTime(times1[index1])) >= sessionLength) {
                        timesToget.push([getStartTime(times2[index2]), getEndTime(times1[index1])]);
                    } else if (index1 < times1.length - 2) {
                        if (calculateSlotTime(getStartTime(times1[index1 + 1]), getEndTime(times2[index2])) >= sessionLength) {
                            timesToget.push([getStartTime(times1[index1 + 1]), getEndTime(times2[index2])]);
                        }
                    }

                } else {
                    if (calculateSlotTime(getStartTime(times1[index1]), getEndTime(times1[index1])) >= sessionLength && getStartTime(times2[index2]) <= getStartTime(times1[index1]) && getEndTime(times2[index2]) >= getEndTime(times1[index1])) {
                        timesToget.push([getStartTime(times1[index1]), getEndTime(times1[index1])]);
                    } else if (calculateSlotTime(getStartTime(times1[index1]), getEndTime(times2[index2])) >= sessionLength) {
                        timesToget.push([getStartTime(times1[index1]), getEndTime(times2[index2])]);
                    } else if (index2 < times2.length - 2) {
                        if (calculateSlotTime(getStartTime(times2[index2 + 1]), getEndTime(times1[index1])) >= sessionLength) {
                            timesToget.push([getStartTime(times2[index2 + 1]), getEndTime(times1[index1])]);
                        }
                    }
                }
                index1 += 1;
                index2 += 1;
            }
            return timesToget;
            /* 
                [['13:30','16:45'],['10:00','12:00']]
            */
        }
        // END OF MainTimeMatcher

        var allTimes = [];
        /* Example 
              allTimes = [
                    {name: "Nancy", times: [[0, '13:30','16:45'],[4, '10:00','12:00']]}
                    {name: "Walter", times: [[5, '13:00','14:00'],[6, '15:00','19:00']]}
              ]
        */
        for (var i = 0; i < seniorsNameDayed.length; i++) {
            for (var j = 1; j < seniorsNameDayed[i].length; j++) {
                var weekday = seniorsNameDayed[i][0];
                var seniorsName = seniorsNameDayed[i][j];
                var volunteerTime = getTimeOnWeekDay(volunteers, volunteerName, weekday);
                var seniorTime = getTimeOnWeekDay(seniors, seniorsName, weekday);
                if (volunteerTime != [[]] && seniorTime != [[]]) {
                    var x = mainTimeMatcher(volunteerTime, seniorTime);
                    if (x.length != 0) {
                        // x = [['13:30','16:45'],['10:00','12:00']]
                        // Iterate through the time slots
                        var p = [];
                        for (var z = 0; z < x.length; z++) {
                            var y = [weekday];
                            y.push(x[z][0]);
                            y.push(x[z][1]);
                            p.push(y);
                        }
                        allTimes.push({ name: seniorsName, times: p});
                    }
                }
            }
        }
        return allTimes;
    }

    var finals = [];

    for (var i = 0; i < volunteers.length; i++) {
        var volunteerName = volunteers[i].name;
        var seniorsNameDayed = getSeniorsbyDayAvailability(volunteerName);
        var x = getSeniorsbyTimeAvailability(seniors, volunteers, seniorsNameDayed, volunteerName);
        finals.push({ name: volunteerName, matches: x });
    }

    return finals;
}

var results = matchByAvailability(volunteers, seniors);
// for loop to print
function printSeniorNameDayedFormat(results) {
    //Iterate through the volunteers
    for (var i = 0; i < results.length; i++) {
        console.log(results[i].name);
        //Iterate through the seniors matched with volunteers
        for (var j = 0; j < results[i].matches.length; j++) {
            console.log("     " + results[i].matches[j].name);
            //Iterate through the times of the seniors
            for (var k = 0; k < results[i].matches[j].times.length; k++) {
                console.log("          " + results[i].matches[j].times[k][0], results[i].matches[j].times[k][1], results[i].matches[j].times[k][2]);
            }

        }
    }
}

// -------------------------------------------------------
function matchByNumVisits(finals, seniors) {
    function getVisits(seniorName) {
        for (var j = 0; j < seniors.length; j++) {
            if (seniors[j].name === seniorName) {
                return seniors[j].visits;
            }
        }
    }

    var returningFinals = [];
    // Iterate through the volunteers
    for (var i = 0; i < finals.length; i++) {
        var volunteerTemplate = finals[i];
        /* volunteerTemplate
        {name: "Rex", matches: [
                        {name: "Nancy", times: [[0, '13:30','16:45'],[4, '10:00','12:00']]}
                         {name: "Walter", times: [[5, '13:00','14:00'],[6, '15:00','19:00']]}
                   ] }
        */
        var seniorTemplate = finals[i].matches;
        /* seniorTemplate
            [
                {name: "Nancy", times: [[0, '13:30','16:45'],[4, '10:00','12:00']]}
                {name: "Walter", times: [[5, '13:00','14:00'],[6, '15:00','19:00']]}
            ] 
        */

        // Array of the Senior Names who have the lowest visit numbers
        var minimumSeniorsArr = [];
        var minimumVisits = 0;
        // Iterate through the seniors for that volunteer
        for (var j = 0; j < seniorTemplate.length; j++) {
            var x = getVisits(seniorTemplate[i].name);
            if (x < minimumVisits) {
                minimumVisits = x;
                minimumSeniorsArr = [];
                minimumSeniorsArr.push(seniorTemplate[i].name);
            } else if (x === minimumVisits) {
                minimumSeniorsArr.push(seniorTemplate[i].name);
            }
        }
        var matches = [];
        // Iterate through the seniors for that volunteer
        for (var k = 0; k < seniorTemplate.length; k++) {
            if (minimumSeniorsArr.includes(seniorTemplate[k].name)) {
                matches.push(seniorTemplate[k].times);
            }
        }
        returningFinals.push({ name: volunteerTemplate.name, matches: matches });
    }
    return returningFinals;
}

var results = matchByNumVisits(results, seniors);
console.log(printSeniorNameDayedFormat(results));


// finals = [
//     {name: "Rex", matches: [
//                         {name: "Nancy", times: [[0, '13:30','16:45'],[4, '10:00','12:00']]}
//                         {name: "Walter", times: [[5, '13:00','14:00'],[6, '15:00','19:00']]}
//                   ] }
//     {name: "Molly", matches: [
//                         {name: "Nancy", times: [[0, '13:30','16:45'],[4, '10:00','12:00']]}
//                         {name: "Walter", times: [[5, '13:00','14:00'],[6, '15:00','19:00']]}
//                   ] }
//     ];

function matchByPreference(finals) {

    function getIntExByName(role, name) {
        for (let i = 0; i < role.length; i++) {
            if (role[i].name == name) {
                score = role[i].intEx;
                return score;
            }
        }
    }

    // For every volunteer in finals, find their intex score using their name

    // 0630 note to self: need to clean up the formatting for final answer
    for (let i = 0; i < finals.length; i++) {
        volunteerName = finals[i].name;
        volunteerIntEx = getIntExByName(volunteers, volunteerName);
        seniorPaired = "";
        smallestDiff = 100;
        for (let j = 0; j < finals[j].matches.length, j++;) {
            seniorIntEx = getIntExByName(seniors, finals[i].matches[j].name);
            diff = Math.abs(volunteerIntEx - seniorIntEx);
            if (diff < smallestDiff) {
                smallestDiff = diff;
                seniorPaired = finals[i].matches[j].name;
            }
        }
        matches = []
        matches.push()
    }
    return seniorPaired;
}
    // For every senior in matches, find their intex score using their name
    // Create variable called smallest diff
    // Calculate the difference in intex score between volunteer and senior
    // If smaller than smallest diff, seniorwithsmallestdiff = diff !! this is the senior's name. 

    // Return the match in the format of volunteer = [
    // name:"Molly", match: {name: "Nancy", times: [[0, '13:30','16:45'],[4, '10:00','12:00']]}
    // ]



// console.log(matchByAvailability(volunteers, seniors));

/* Front and backend connect todo:
- use JS to display the name of matched senior and time slots for the volunteer to choose (radio buttons).
  If volunteer doesnt choose before set date (eg. sunday), then we will automatically choose one for them
- Generate scheduled table for manager
*/
