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

function getTimesFromTimes(times) {
    // times is array of times
    // Ex. times = [0, '13:30','16:45']
    // Return ['13:30','16:45']
    return times.slice(1, times.length);
}

finals = [
    {name: "Rex", matches: [
                        {name: "Nancy", times: [[0, '13:30','16:45'],[4, '10:00','12:00']]},
                        {name: "Walter", times: [[5, '13:00','14:00'],[6, '15:00','19:00']]}
                  ] },
    {name: "Molly", matches: [
                        {name: "Nancy", times: [[0, '13:30','16:45'],[4, '10:00','12:00']]},
                        {name: "Walter", times: [[5, '13:00','14:00'],[6, '15:00','19:00']]}
                  ] }
    ];

function matchByPreference(finals){

    function getIntExByName(role, name){
        for (let i = 0; i < role.length; i++){
            if (role[i].name == name){
                score = role[i].intEx;
                return score;
            }
        }
    }
    results = []

// For every volunteer in finals, find their intex score using their name

    for (var i = 0; i < finals.length; i++){
        volunteerName = finals[i].name;
        volunteerIntEx = getIntExByName(volunteers, volunteerName);
        seniorPaired = "";
        smallestDiff = 100;
        console.log(1111);
        num = finals[i].matches.length;
        for (var j = 0; j < num+1, j++;){ 
            console.log(56534);
            seniorIntEx = getIntExByName(seniors, finals[i].matches[j].name);
            diff = Math.abs(volunteerIntEx - seniorIntEx);
            console.log(diff);
            if (diff < smallestDiff){
                smallestDiff = diff;
                seniorPaired = finals[i].matches[j].name;
            }
            appointmentTimes = []
            for (let x = 0; x < finals[i].matches[j].times.length; x++){
                appointmentTimes.push(getTimesFromTimes(finals[i].matches[j].times[0]));
            }
            item = {name: volunteerName, match: {name: seniorPaired, times: appointmentTimes}};
            console.log(volunteerName);
            console.log(seniorPaired);
            console.log(appointmentTimes);
            results.push(item);
            console.log(results);
        }


        }
return results;
}
matchByPreference(finals);
// trial = finals[0].matches[0].times[0]
// console.log(getTimesFromTimes(trial));
// console.log(matchByPreference(finals));
// console.log(finals);



    // For every senior in matches, find their intex score using their name
    // Create variable called smallest diff
    // Calculate the difference in intex score between volunteer and senior
    // If smaller than smallest diff, seniorwithsmallestdiff = diff !! this is the senior's name. 

    // Return the match in the format of volunteer = [
    // name:"Molly", match: {name: "Nancy", times: [[0, '13:30','16:45'],[4, '10:00','12:00']]}
    // ]