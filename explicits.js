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
        declineText: isTouch ? 'Odkloni' : 'Ne želim odgovoriti', 
        autoFocus:true, 
        progressBar:  'Stran <%= pagesMeta.number %> od 4'
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch 
                ? 'Izberite odgovor ali pritisnite \'Odkloni\'' 
                : 'Izberite odgovor ali pritisnite \'Ne želim odgovoriti\''
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < 3 %>',
        helpText: 'Nasvet: Če želite odgovoriti hitreje, dvakrat pritisnite na izbrano polje.'
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

    API.addQuestionsSet('explicitMotivation',{
        inherit : 'basicSelect',
        answers: [
            {text:'Popolnoma se strinjam', value:7},
            {text:'Deloma se strinjam', value:6},
            {text:'Rahlo se strinjam', value:5},
            {text:'Niti se strinjam, niti se ne strinjam', value:4},
            {text:'Rahlo se ne strinjam', value:3},
            {text:'Deloma se ne strinjam', value:2},
            {text:'Sploh se ne strinjam', value:1}
        ]
    });
	
    /**
	*Specific questions
	*/	
    API.addQuestionsSet('attributes7',{
        inherit : 'basicSelect',
        name: 'attributes7',
        stem: 'Katera trditev vas najbolje opiše?',
        answers: [
            {text:'Precej raje imam Slovence kot Neslovence.',value:7},
            {text:'Nekoliko raje imam Slovence kot Neslovence.',value:6},
            {text:'Malce raje imam Slovence kot Neslovence.',value:5},
            {text:'Enako rad/a imam Slovence kot Neslovence.',value:4},
            {text:'Malce raje imam Neslovence kot Slovence.',value:3},
            {text:'Nekoliko raje imam Neslovence kot Slovence.',value:2},
            {text:'Precej raje imam Neslovence kot Slovence.',value:1}
        ]
    });
	
    API.addQuestionsSet('thermLocal',{
        inherit : 'therm',
        name: 'Tlocal_0to10',
        stem: 'Kako toplo ali hladno se počutite do Slovencev?'
    });

    API.addQuestionsSet('thermForeign',{
        inherit : 'therm',
        name: 'Tforeign_0to10',
        stem: 'Kako toplo ali hladno se počutite do Neslovencev?'
    });

    API.addQuestionsSet('motivation',{
        inherit: 'explicitMotivation',
        name: 'motivation',
        stem: 'Do tujcev skušam biti nepristranski/a.'
    });

    API.addSequence([
        {
            mixer : 'random', 
            data : [
                {
                    mixer : 'random', 
                    wrapper: true, 
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
                },
		{
		    inherit:'basicPage',
		    questions: {inherit:'motivation'}
		}
            ]
        }
    ]);

    return API.script;
});
