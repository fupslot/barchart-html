$(function () {
    var real
      , settings_bad
      , settings
      , getRandom
      , us
      , q;

    real = {"compare":true,"breakdown":[0,1],"events":["Play song","Next song","Previous song","Create playlist"],"labels":[],"sections":[{"name":"IT","actual":[6,6,3,3],"compare":[0,0,0,0]},{"name":"SE","actual":[5,5,4,2],"compare":[0,0,0,0]},{"name":"ES","actual":[18,17,11,1],"compare":[0,0,0,0]},{"name":"AU","actual":[3,2,2,1],"compare":[0,0,0,0]},{"name":"BR","actual":[4,4,1,1],"compare":[0,0,0,0]},{"name":"AR","actual":[1,1,1,1],"compare":[0,0,0,0]},{"name":"NO","actual":[10,7,4,2],"compare":[0,0,0,0]},{"name":"MX","actual":[14,14,12,6],"compare":[0,0,0,0]},{"name":"GB","actual":[24,24,21,7],"compare":[0,0,0,0]},{"name":"FI","actual":[10,10,7,3],"compare":[0,0,0,0]},{"name":"DE","actual":[19,18,12,3],"compare":[0,0,0,0]},{"name":"US","actual":[62,59,47,15],"compare":[0,0,0,0]},{"name":"IE","actual":[6,6,6,2],"compare":[0,0,0,0]},{"name":"CA","actual":[27,26,21,7],"compare":[0,0,0,0]},{"name":"PL","actual":[5,5,4,1],"compare":[0,0,0,0]},{"name":"FR","actual":[15,14,7,2],"compare":[0,0,0,0]},{"name":"DK","actual":[6,6,5,3],"compare":[0,0,0,0]},{"name":"NL","actual":[10,9,8,2],"compare":[0,0,0,0]},{"name":"KR","actual":[2,2,2,0],"compare":[0,0,0,0]},{"name":"JP","actual":[2,2,2,0],"compare":[0,0,0,0]},{"name":"IL","actual":[1,1,1,0],"compare":[0,0,0,0]},{"name":"RU","actual":[4,4,3,0],"compare":[0,0,0,0]},{"name":"AT","actual":[3,3,1,0],"compare":[0,0,0,0]},{"name":"NZ","actual":[4,4,4,0],"compare":[0,0,0,0]},{"name":"GR","actual":[4,4,2,0],"compare":[0,0,0,0]}]};
    us = {"compare":true,"breakdown":[25],"events":["Search","Play song","Next song","Like"],"labels":[],"sections":[{"name":"RU","actual":[2,2,2,2],"compare":[2,2,2,2]},{"name":"AU","actual":[3,3,3,2],"compare":[3,2,2,1]},{"name":"IE","actual":[6,6,6,3],"compare":[4,4,2,1]},{"name":"KR","actual":[3,3,3,2],"compare":[2,2,2,1]},{"name":"SE","actual":[4,4,4,3],"compare":[5,4,4,3]},{"name":"GR","actual":[7,7,7,4],"compare":[2,2,2,0]},{"name":"ES","actual":[15,15,14,9],"compare":[8,8,8,5]},{"name":"BE","actual":[3,3,3,2],"compare":[1,1,1,0]},{"name":"NO","actual":[4,4,4,4],"compare":[2,2,2,2]},{"name":"NZ","actual":[7,7,7,6],"compare":[5,5,4,1]},{"name":"AT","actual":[4,4,4,3],"compare":[3,3,3,2]},{"name":"NL","actual":[4,4,3,2],"compare":[4,4,4,1]},{"name":"DE","actual":[20,19,19,14],"compare":[10,10,10,6]},{"name":"DK","actual":[11,11,11,8],"compare":[3,3,3,2]},{"name":"MX","actual":[11,11,11,7],"compare":[5,4,2,2]},{"name":"GB","actual":[19,18,18,15],"compare":[11,10,9,5]},{"name":"FI","actual":[6,6,5,3],"compare":[2,2,2,1]},{"name":"US","actual":[47,45,45,31],"compare":[37,35,35,18]},{"name":"IT","actual":[10,10,10,6],"compare":[0,0,0,0]},{"name":"BR","actual":[3,3,2,2],"compare":[2,1,1,1]},{"name":"FR","actual":[19,19,19,13],"compare":[20,18,18,9]},{"name":"CA","actual":[26,26,26,19],"compare":[8,8,8,5]},{"name":"IL","actual":[2,2,2,1],"compare":[0,0,0,0]},{"name":"JP","actual":[1,1,1,0],"compare":[1,1,1,1]},{"name":"PL","actual":[2,2,2,0],"compare":[2,2,2,2]},{"name":"AR","actual":[0,0,0,0],"compare":[1,1,1,1]}]};
    q = {"compare":true,"onlyOneEventCanBeSelected":true,"onlyChartCanBeSelected":true,"breakdown":[],"events":["Play song","Play song","Next song","Play song"],"labels":[],"sections":[{"name":"NZ","actual":[10,10,10,9],"compare":[8,7,7,7]},{"name":"RU","actual":[4,4,4,3],"compare":[4,4,4,4]},{"name":"FI","actual":[12,10,10,10],"compare":[4,4,3,3]},{"name":"KR","actual":[6,5,4,4],"compare":[2,2,2,2]},{"name":"JP","actual":[2,2,2,2],"compare":[1,1,1,1]},{"name":"MX","actual":[14,14,14,14],"compare":[13,13,12,11]},{"name":"GR","actual":[8,8,8,8],"compare":[4,3,3,3]},{"name":"AT","actual":[6,6,6,6],"compare":[4,4,4,4]},{"name":"SE","actual":[6,6,6,6],"compare":[6,6,6,5]},{"name":"AU","actual":[4,4,4,4],"compare":[4,4,4,3]},{"name":"NO","actual":[7,7,7,7],"compare":[3,3,3,3]},{"name":"GB","actual":[36,35,35,33],"compare":[21,21,19,18]},{"name":"ES","actual":[20,20,20,18],"compare":[16,15,14,14]},{"name":"DE","actual":[29,28,28,25],"compare":[13,13,10,10]},{"name":"IE","actual":[10,10,10,10],"compare":[6,6,5,5]},{"name":"IL","actual":[3,3,3,3],"compare":[0,0,0,0]},{"name":"BE","actual":[5,5,5,5],"compare":[1,1,1,1]},{"name":"NL","actual":[6,6,5,5],"compare":[7,7,7,7]},{"name":"BR","actual":[4,4,4,4],"compare":[2,2,2,2]},{"name":"US","actual":[80,79,77,76],"compare":[49,49,48,47]},{"name":"PL","actual":[3,3,3,3],"compare":[3,3,3,3]},{"name":"IT","actual":[14,14,14,14],"compare":[6,5,5,5]},{"name":"FR","actual":[34,33,31,31],"compare":[27,25,23,22]},{"name":"DK","actual":[14,14,14,14],"compare":[11,11,11,11]},{"name":"CA","actual":[36,36,36,36],"compare":[23,23,22,21]},{"name":"AR","actual":[0,0,0,0],"compare":[2,2,2,1]}]};
    
    settings_bad = {
        "compare": true,
        "breakdown": false,
        "events": ["Play song","Next song"],
        "labels": [],
        "sections": [
            {
                "name":"Total",
                "actual":[0,0],
                "compare":[0,0]
            }
        ]
    };
    
    settings = {
        compare: true,
        breakdown: [],
        // It breakes default color order
        colorIndexes: [2,0,1],
        onlyOneEventCanBeSelected: true,
        // onlyChartCanBeSelected: true,
        
        events: ['Sign up', 'Add item', 'View cart', 'Purchase', 'Enjoyed'],
        
        sections: [
            {
                name:    'Landing page #1',
                actual:  [503, 167, 110, 89, 12],
                compare: [187, 143, 100, 34, 17]
            },
            {
                name:    'Landing page #2',
                actual:  [739, 201, 134, 32, 10],
                compare: [241, 208, 173, 90, 26]
            },
            {
                name:    'Landing page #3',
                actual:  [932, 132, 98, 65, 8],
                compare: [176, 154, 120, 78, 2]
            },
        ]
    };

    $('#funnel-viz-default')
        .BarChartHTML(settings)
        .on('highlight', function (e, sectionName, eventName, part, isSection, isHighlighted) {
            console.log(sectionName, eventName, part, isSection, isHighlighted);
        });

    $('#destroy').on('click', function () {
        $('#funnel-viz-default').BarChartHTML('destroy');
    });
    $('#init').on('click', function () {
        $('#funnel-viz-default').BarChartHTML(settings);
    });

});