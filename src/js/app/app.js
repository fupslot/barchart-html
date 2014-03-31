$(function () {
    var settings
      , getRandom;

    
    settings = {
        // compare: true,
        breakdown: [0,1,2],
        // breakdown: false,
        
        events: ['Sign up', 'Add item', 'View cart', 'Purchase', 'Enjoyed'],
        labels: ['did not bounce', 'looked at a product', 'put an item in a cart', 'completed a sale'],
        
        sections: [
            {
                name:    'Landing page #1',
                actual:  [198, 167, 110, 89, 12],
                compare: [187, 143, 100, 34, 17]
            },
            {
                name:    'Landing page #2',
                actual:  [243, 201, 134, 32, 10],
                compare: [241, 208, 173, 90, 26]
            },
            {
                name:    'Landing page #3',
                actual:  [143, 132, 98, 65, 8],
                compare: [176, 154, 120, 78, 2]
            },
        ]
    };

    $('#funnel-viz-default').BarChartHTML(settings);
    $('#destroy').on('click', function () {
        $('#funnel-viz-default').BarChartHTML('destroy');
    });
    $('#init').on('click', function () {
        $('#funnel-viz-default').BarChartHTML(settings);
    });

});