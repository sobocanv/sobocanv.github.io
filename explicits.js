define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false, //Change to true if you don't want to show the submit button.
        header: 'Vprašalnik',
        decline: true,
        declineText: isTouch ? 'Preskoči' : 'Nočem odgovoriti', 
        autoFocus:true, 
        progressBar:  'Stran <%= pagesMeta.number %> od 3'
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch 
                ? 'Prosimo, izberite ustrezni odgovor ali pritisnite na gumb \'Preskoči\'' 
                : 'Prosimo, izberite ustrezni odgovor ali pritisnite na gumb \'Nočem odgovoriti\''
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < 3 %>',
        helpText: 'Nasvet: Če želite odgovoriti hitreje, pritisnite na izbrani odziv dvakrat.'
    });

    API.addQuestionsSet('basicSelect',{
        inherit :'basicQ',
        type: 'selectOne'
    });
	
    API.addQuestionsSet('basicDropdown',{
        inherit :'basicQ',
        type : 'dropdown',
        autoSubmit:false
    });
	
    API.addQuestionsSet('therm',{
        inherit: 'basicSelect',
        answers: [
            {text:'10 - Izjemno toplo', value:10},
            {text:'9 - Zelo toplo', value:9},
            {text:'8 - Zmerno toplo', value:8},
            {text:'7 - Nekoliko toplo', value:7},
            {text:'6 - Rahlo toplo', value:6},
            {text:'5 - Niti toplo niti hladno', value:5},
            {text:'4 - Rahlo hladno', value:4},
            {text:'3 - Nekoliko hladno', value:3},
            {text:'2 - Zmerno hladno', value:2},
            {text:'1 - Zelo hladno', value:1},
            {text:'0 - Izjemno hladno', value:0}
        ]
    });

	
    /**
	*Specific questions
	*/	
    API.addQuestionsSet('attributes7',{
        inherit : 'basicSelect',
        name: 'attributes7',
        stem: 'Katera izjava vas najbolje opisuje?',
        answers: [
            {text:'Močno raje imam <%= global.foreignLabels %> kot <%= global.localLabels %>.',value:7},
            {text:'Zmerno raje imam <%= global.foreignLabels %> kot <%= global.localLabels %>.',value:6},
            {text:'Nekoliko raje imam <%= global.foreignLabels %> kot <%= global.localLabels %>.',value:5},
            {text:'Enako rad imam <%= global.foreignLabels %> in <%= global.localLabels %>.',value:4},
            {text:'Nekoliko raje imam <%= global.localLabels %> kot <%= global.foreignLabels %>.',value:3},
            {text:'Zmerno raje imam <%= global.localLabels %> kot <%= global.foreignLabels %>.',value:2},
            {text:'Močno raje imam <%= global.localLabels %> kot <%= global.foreignLabels %>.',value:1}
        ]
    });
	
    API.addQuestionsSet('thermLocal',{
        inherit : 'therm',
        name: 'Tlocal_0to10',
        stem: 'Kako toplo ali hladno se počutite do <b><%= global.localLabels %></b>?'
    });

    API.addQuestionsSet('thermForeign',{
        inherit : 'therm',
        name: 'Tforeign_0to10',
        stem: 'Kako toplo ali hladno se počutite do <b><%= global.foreignLabels %></b>?'
    });

    API.addSequence([
        {
            mixer : 'random', 
            data : [
                {
                    mixer : 'random', 
                    wrapper:true, 
                    data : [
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermLocal'}
                        },
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermForeign'}							
                        }
                    ]
                },
                {
                    inherit:'basicPage', 
                    questions: {inherit:'attributes7'}
                }
            ]
        }
    ]);

    return API.script;
});
