define(['managerAPI',
		'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'], function(Manager){


	//You can use the commented-out code to get parameters from the URL.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pt = urlParams.get('pt') || 'unknown';

	var API    = new Manager();
	const subid = Date.now().toString(16)+Math.floor(Math.random()*10000).toString(16);
	init_data_pipe(API, 'N1NLIFf6LdYh',  {
		file_type:'csv',
		file_name: 'iat_${pt}_${subid}.csv'
	});

    API.setName('mgr');
    API.addSettings('skip',true);

    //Assign labels to both groups
    let groupSet = ['Yes'];
    let localLabels = ['Slovenci'];
    let foreignLabels = ['Neslovenci'];

    API.addGlobal({
        raceiat:{},
        //YBYB: change when copying back to the correct folder
        //baseURL: './images/',
        //raceSet:raceSet,
	groupSet:groupSet,
        localLabels:localLabels,
        foreignLabels:foreignLabels,
	//Select randomly what name to see.
	slovenianNames: API.shuffle([
	    'Aljaž', 'Anja', 'Andrej', 'Anže',
	    'Brigita', 'Ema', 'Filip', 'Hana',
	    'Jakob', 'Jan', 'Jurij', 'Katja',
	    'Klara', 'Klavdija', 'Maja', 'Mihael',
	    'Neža', 'Roman', 'Rok', 'Sara'
	]),
    	foreignNames: API.shuffle([
	    'Aisha', 'Ajdin', 'Amir', 'Emina',
	    'Esma', 'Gavin', 'Hrvoje', 'Ingrid',
	    'Jacqueline', 'Jelena', 'Kenji', 'Mirsad',
	    'Mohamed', 'Nenad', 'Pierre', 'Sanela',
	    'Snježana', 'Stjepan', 'Suki', 'Zorana'
	]),
        //Select randomly what attribute words to see.
        posWords : API.shuffle([
            'smeh', 'veselje', 'sreča', 'ljubezen',
	    'lepota', 'užitek', 'mir', 'očaranost'
        ]), 
        negWords : API.shuffle([
            'poraz', 'trpljenje', 'groza', 'gnus',
	    'obup', 'strah', 'zloba'
        ])
    });


    API.addTasksSet({
        instructions: [{
            type: 'message',
            buttonText: 'Nadaljuj'
        }],

        intro: [{
            inherit: 'instructions',
            name: 'intro',
            templateUrl: 'intro.jst',
            title: 'Uvod',
            header: 'Dobrodošli'
        }],

        raceiat_instructions: [{
            inherit: 'instructions',
            name: 'raceiat_instructions',
            templateUrl: 'raceiat_instructions.jst',
            title: 'Navodila',
            header: 'Implicitni test'
        }],

	demographics: [{
            type: 'quest',
            name: 'demographics',
            scriptUrl: 'demographics.js'
        }],

        explicits: [{
            type: 'quest',
            name: 'explicits',
            scriptUrl: 'explicits.js'
        }],

        raceiat: [{
            type: 'time',
            name: 'raceiat',
            scriptUrl: 'raceiat.js'
        }],

        lastpage: [{
            type: 'message',
            name: 'lastpage',
            templateUrl: 'lastpage.jst',
            title: 'Konec',
            //Uncomment the following if you want to end the study here.
            //last:true, 
            header: 'Dokončali ste raziskavo'
        }], 
        
        //Use if you want to redirect the participants elsewhere at the end of the study
        redirect:
        [{ 
			//Replace with any URL you need to put at the end of your study, or just remove this task from the sequence below
            type:'redirect', name:'redirecting', url: 'https://www.google.com/search' 
        }],
		
		//This task waits until the data are sent to the server.
        uploading: uploading_task({header: 'Samo trenutek', body:'Prosimo, počakajte, podatki se pošiljajo ...'})
    });

    API.addSequence([
        { type: 'isTouch',
	  text: 'Zaznali smo, da uporabljate zaslon na dotik. Želite nadaljevati?',
    	  yesText: 'Da, rad/a bi uporabljal/a zaslon na dotik.',
    	  noText: 'Ne, raje bom uporabljal/a tipkovnico.' }, //Use Minno's internal touch detection mechanism. 
        
        { type: 'post', path: ['$isTouch', 'groupSet', 'localLabels', 'foreignLabels'] },

        // apply touch only styles
        {
            mixer:'branch',
            conditions: {compare:'global.$isTouch', to: true},
            data: [
                {
                    type: 'injectStyle',
                    css: [
                        '* {color:red}',
                        '[piq-page] {background-color: #fff; border: 1px solid transparent; border-radius: 4px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); margin-bottom: 20px; border-color: #bce8f1;}',
                        '[piq-page] > ol {margin: 15px;}',
                        '[piq-page] > .btn-group {margin: 0px 15px 15px 15px;}',
                        '.container {padding:5px;}',
                        '[pi-quest]::before, [pi-quest]::after {content: " ";display: table;}',
                        '[pi-quest]::after {clear: both;}',
                        '[pi-quest] h3 { border-bottom: 1px solid transparent; border-top-left-radius: 3px; border-top-right-radius: 3px; padding: 10px 15px; color: inherit; font-size: 2em; margin-bottom: 20px; margin-top: 0;background-color: #d9edf7;border-color: #bce8f1;color: #31708f;}',
                        '[pi-quest] .form-group > label {font-size:1.2em; font-weight:normal;}',

                        '[pi-quest] .btn-toolbar {margin:15px;float:none !important; text-align:center;position:relative;}',
                        '[pi-quest] [ng-click="decline($event)"] {position:absolute;right:0;bottom:0}',
                        '[pi-quest] [ng-click="submit()"] {width:30%;line-height: 1.3333333;border-radius: 6px;}',
                        // larger screens
                        '@media (min-width: 480px) {',
                        ' [pi-quest] [ng-click="submit()"] {width:30%;padding: 10px 16px;font-size: 1.6em;}',
                        '}',
                        // phones and smaller screens
                        '@media (max-width: 480px) {',
                        ' [pi-quest] [ng-click="submit()"] {padding: 8px 13px;font-size: 1.2em;}',
                        ' [pi-quest] [ng-click="decline($event)"] {font-size: 0.9em;padding:3px 6px;}',
                        '}'
                    ]
                }
            ]
        },
        
        
        {inherit: 'intro'},
	{inherit: 'demographics'},
        
	// force the instructions to preceed the iat
        {
            mixer: 'wrapper',
            data: [
                {inherit: 'raceiat_instructions'},
                {inherit: 'raceiat'}
            ]
        },

	{inherit: 'explicits'},
	{inherit: 'uploading'},
        {inherit: 'lastpage'},
        {inherit: 'redirect'}

    ]);

    return API.script;
});
