define(['pipAPI','iat10_sl.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();

    return iatExtension({
        category1 : {
            name : global.localLabels, //Will appear in the data.
            title : {
                media : {word : global.localLabels}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.slovenianNames[0]},
                {word: global.slovenianNames[1]},
                {word: global.slovenianNames[2]},
                {word: global.slovenianNames[3]},
                {word: global.slovenianNames[4]},
                {word: global.slovenianNames[5]},
                {word: global.slovenianNames[6]},
                {word: global.slovenianNames[7]}
            ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },    
        category2 : {
            name : global.foreignLabels, //Will appear in the data.
            title : {
                media : {word : global.foreignLabels}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.foreignNames[0]},
                {word: global.foreignNames[1]},
                {word: global.foreignNames[2]},
                {word: global.foreignNames[3]},
                {word: global.foreignNames[4]},
                {word: global.foreignNames[5]},
                {word: global.foreignNames[6]},
                {word: global.foreignNames[7]}
            ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
        attribute1 : {
            name : 'Slabe besede',
            title : {
                media : {word : 'Slabe besede'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.negWords[0]},
                {word: global.negWords[1]},
                {word: global.negWords[2]},
                {word: global.negWords[3]},
                {word: global.negWords[4]},
                {word: global.negWords[5]},
                {word: global.negWords[6]},
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        attribute2 : {
            name : 'Dobre besede',
            title : {
                media : {word : 'Dobre besede'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.posWords[0]},
                {word: global.posWords[1]},
                {word: global.posWords[2]},
                {word: global.posWords[3]},
                {word: global.posWords[4]},
                {word: global.posWords[5]},
                {word: global.posWords[6]},
                {word: global.posWords[7]},
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        //base_url : {//Where are your images at?
            //image : global.baseURL
        //},
        isTouch : global.$isTouch
    });
});

