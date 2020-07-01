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
    return times.slice(1, times.length - 1);
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
            roleTimes = getTimeByName(role, roleName);
            roleDays = [];
            for (let i = 0; i < roleTimes.length; i++) {
                roleDays.push(roleTimes[i][0]);
            }
            return roleDays;
        };

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
                    if (calculateSlotTime(getStartTime(times2[index2]), getEndTime(times1[index1])) >= sessionLength) {
                        timesToget.push([getStartTime(times2[index2]), getEndTime(times1[index1])]);
                    }
                    if (index1 != times1.length - 2 && (calculateSlotTime(getStartTime(times1[index1 + 1]), getEndTime(times2[index2])) >= sessionLength)) {
                            timesToget.push([getStartTime(times1[index1 + 1]), getEndTime(times2[index2])]);
                    }
                    
                } else {
                    if (calculateSlotTime(getStartTime(times1[index1]), getEndTime(times2[index2])) >= sessionLength) {
                        timesToget.push([getStartTime(times1[index1]), getEndTime(times2[index2])]);
                    }
                    if (index1 != times2.length - 2 && (calculateSlotTime(getStartTime(times2[index2 + 1]), getEndTime(times1[index1])) >= sessionLength)) {
                            timesToget.push([getStartTime(times2[index2 + 1]), getEndTime(times1[index1])]);
                    }
                }
                index1 += 1;
                index2 += 1;
            }
            return timesToget;
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
                    var volunteerTime = getTimeOnWeekDay(volunteers, volunteerName, seniorsNameDayed[i][0]);
                    var seniorTime = getTimeOnWeekDay(seniors,seniorsNameDayed[i][j],seniorsNameDayed[i][0]);
                    console.log("volunteerTime", volunteerName, volunteerTime);
                    console.log("seniorTime",seniorsNameDayed[i][j], seniorTime);
                    console.log("day week", seniorsNameDayed[i][0]);
                    if (volunteerTime === [[]] || seniorTime === [[]]) {
                        var x = mainTimeMatcher(volunteerTime, seniorTime);
                        if (x.length != 0) {
                            allTimes.push({ name: seniorsNameDayed[j], times: x });
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
        finals.push({name: volunteerName, matches: getSeniorsbyTimeAvailability(seniors, volunteers, seniorsNameDayed, volunteerName) });
    }

   return finals;
}

console.log(matchByAvailability(volunteers, seniors));

