define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false,
        header: 'Demographics',
        decline: true,
        declineText: isTouch ? 'Decline' : 'Decline to Answer', 
        autoFocus:true, 
        progressBar: 'Page <%= pagesMeta.number %> out of <%= pagesMeta.count %>'
    });

    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required: true,
        errorMsg: {
            required: isTouch 
                ? 'Please select an answer, or click \'Decline\'' 
                : 'Please select an answer, or click \'Decline to Answer\''
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < pagesMeta.count %>',
        helpText: 'Tip: For quick response, click to select your answer, and then click again to submit.'
    });

    API.addQuestionsSet('basicSelect',{ inherit:'basicQ', type:'selectOne' });
    API.addQuestionsSet('basicDropdown',{ inherit:'basicQ', type:'dropdown', autoSubmit:false });

    /**
	* Specific demographic questions
	*/
    API.addQuestionsSet('demographics',[
        { inherit:'basicSelect', name:'birthMonth', stem:'What is your birth month?', answers:[
            'January','February','March','April','May','June','July','August','September','October','November','December'
        ]},
        { inherit:'basicSelect', name:'birthYear', stem:'What is your birth year?', answers: 
            Array.from({length: 2025 - 1900}, (_, i) => (2024 - i).toString())
        },
        { inherit:'basicSelect', name:'genderIdentity', stem:'What is your gender identity?', answers:[
            'Woman','Man','Nonbinary','Other'
        ]},
        { inherit:'basicSelect', name:'transgender', stem:'Do you identify as transgender?', answers:[
            'Yes','No','Do not want to disclose'
        ]},
        { inherit:'basicSelect', name:'iatExperience', stem:'How many implicit association tests have you previously performed?', answers:[
            '0','1–2','3–5','More than 5'
        ]},
        { inherit:'basicSelect', name:'politicalIdentity', stem:'What is your political identity?', answers: [
            {text: 'Strongly right-wing / conservative', value: 1},
            {text: 'Moderately right-wing / conservative', value: 2},
            {text: 'Centrist / neutral', value: 3},
            {text: 'Moderately left-wing / progressive', value: 4},
            {text: 'Strongly left-wing / progressive', value: 5}
        ]},
        { inherit:'basicDropdown', name:'religious_affiliation', stem:'What is your religious affiliation?', answers: [
            {text: 'Atheist', value: 'atheist'},
            {text: 'Buddhist', value: 'buddhist'},
            {text: 'Catholic', value: 'catholic'},
            {text: 'Protestant', value: 'protestant'},
            {text: 'Orthodox Christian', value: 'orthodox_christian'},
            {text: 'Hindu', value: 'hindu'},
            {text: 'Muslim', value: 'muslim'},
            {text: 'Jewish', value: 'jewish'},
            {text: 'Other', value: 'other'}
        ],
        onAnswer: function(answer) {
            if (answer === 'other') {
                this.addQuestion({
                    type: 'text',
                    name: 'other_religion',
                    stem: 'Please specify your religion:'
                });
            }
        }},
        { inherit:'basicSelect', name:'citizenship', stem:'What country is your primary citizenship?', answers: [
            'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 
            'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana',
            'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad',
            'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Congo (Congo-Kinshasa)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus',
            'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 
            'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 
            'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
            'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea (North)', 'Korea (South)', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
            'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali',
            'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
            'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
            'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
            'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
            'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
            'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
            'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
            'Yemen', 'Zambia', 'Zimbabwe'
        ]},
        { inherit:'basicSelect', name:'currentCountry', stem:'What country do you currently live in?', answers: [
            'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 
            'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana',
            'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad',
            'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Congo (Congo-Kinshasa)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus',
            'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 
            'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 
            'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
            'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea (North)', 'Korea (South)', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
            'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali',
            'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
            'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
            'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
            'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
            'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
            'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
            'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
            'Yemen', 'Zambia', 'Zimbabwe'
        ]},
        { inherit:'basicSelect', name:'education', stem:'What is your highest level of education?', answers:[
            'No formal education','Some primary school','Completed primary school','Some secondary school','Completed secondary school',
            'Vocational or technical training','Some college or university','Completed bachelor’s degree','Some graduate or postgraduate study',
            'Completed master’s degree','Completed doctoral degree (Ph.D., M.D., etc.)'
        ]},
        { inherit:'basicSelect', name:'occupation', stem:'What is your occupation (or last job if retired/unemployed)?', answers:[
            'Education / Research','Healthcare / Medicine','Technology / IT','Business / Finance',
            'Arts / Entertainment','Legal / Public Administration','Science / Engineering','Manual Labor / Skilled Trades','Service Industry'
        ], 
        onAnswer: function(answer) {
            let subcategories = [];
            switch(answer) {
                case 'Education / Research':
                    subcategories = ['Teacher', 'Professor', 'Researcher', 'Administrator'];
                    break;
                case 'Healthcare / Medicine':
                    subcategories = ['Doctor', 'Nurse', 'Therapist', 'Medical Technician', 'Healthcare Administrator'];
                    break;
                case 'Technology / IT':
                    subcategories = ['Software Developer', 'IT Support', 'Data Analyst', 'System Administrator', 'Cybersecurity Specialist'];
                    break;
                case 'Business / Finance':
                    subcategories = ['Manager', 'Accountant', 'Financial Analyst', 'Marketing Specialist', 'Sales'];
                    break;
                case 'Arts / Entertainment':
                    subcategories = ['Musician', 'Actor', 'Designer', 'Writer', 'Performer'];
                    break;
                case 'Legal / Public Administration':
                    subcategories = ['Lawyer', 'Paralegal', 'Government Official', 'Civil Servant', 'Police / Security'];
                    break;
                case 'Science / Engineering':
                    subcategories = ['Engineer', 'Scientist', 'Lab Technician', 'Architect'];
                    break;
                case 'Manual Labor / Skilled Trades':
                    subcategories = ['Construction Worker', 'Electrician', 'Mechanic', 'Plumber', 'Carpenter'];
                    break;
                case 'Service Industry':
                    subcategories = ['Hospitality', 'Retail', 'Food Service', 'Customer Support', 'Transportation'];
                    break;
            }
            if(subcategories.length > 0) {
                this.addQuestion({
                    inherit: 'basicSelect',
                    name: 'occupationSubcategory',
                    stem: 'Please select the subcategory that best fits your occupation:',
                    answers: subcategories
                });
            }
        }}
    ]);

    /**
	* Sequence: present demographic questions
	*/
    API.addSequence([
        {
            mixer:'random',
            data:[
                {
                    inherit:'basicPage',
                    questions:[
                        {inherit:'demographics', name:'birthMonth'},
                        {inherit:'demographics', name:'birthYear'}
                    ]
                },
                {
                    inherit:'basicPage',
                    questions:[
                        {inherit:'demographics', name:'genderIdentity'},
                        {inherit:'demographics', name:'transgender'}
                    ]
                },
                {
                    inherit:'basicPage',
                    questions:[
                        {inherit:'demographics', name:'iatExperience'},
                        {inherit:'demographics', name:'politicalIdentity'},
                        {inherit:'demographics', name:'religion'}
                    ]
                },
                {
                    inherit:'basicPage',
                    questions:[
                        {inherit:'demographics', name:'citizenship'},
                        {inherit:'demographics', name:'currentCountry'}
                    ]
                },
                {
                    inherit:'basicPage',
                    questions:[
                        {inherit:'demographics', name:'education'},
                        {inherit:'demographics', name:'occupation'}
                    ]
                }
            ]
        }
    ]);

    return API.script;
});
