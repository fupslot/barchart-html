$(function () {
    var settings
      , getRandom;

    
    settings = {
        compare: true,
        brakedown: false,
        events: ['Sign up', 'Add item', 'View cart', 'Purchase'],
        labels: ['did not bounce', 'looked at a product', 'put an item in a cart', 'completed a sale'],
        sections: [
            {
                name:    'Landing page #1',
                actual:  [198, 167, 110, 89],
                compare: [187, 143, 100, 34]
            },
            {
                name:    'Landing page #2',
                actual:  [243, 201, 134, 32],
                compare: [241, 208, 173, 90]
            },
            {
                name:    'Landing page #3',
                actual:  [143, 132, 98, 65],
                compare: [176, 154, 120, 78]
            },
        ]
    };

    $('#funnel-viz-default').FunnelViz(settings);
});