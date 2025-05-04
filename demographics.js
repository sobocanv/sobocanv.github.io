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
        { inherit:'basicDropdown', name:'citizenship', stem:'What country is your primary citizenship?', answers: [
        	{text: 'Afghanistan', value: 'Afghanistan'},
        	{text: 'Albania', value: 'Albania'},
        	{text: 'Algeria', value: 'Algeria'},
        	{text: 'Andorra', value: 'Andorra'},
        	{text: 'Angola', value: 'Angola'},
        	{text: 'Antigua and Barbuda', value: 'Antigua and Barbuda'},
        	{text: 'Argentina', value: 'Argentina'},
        	{text: 'Armenia', value: 'Armenia'},
        	{text: 'Australia', value: 'Australia'},
        	{text: 'Austria', value: 'Austria'},
        	{text: 'Azerbaijan', value: 'Azerbaijan'},
        	{text: 'Bahamas', value: 'Bahamas'},
        	{text: 'Bahrain', value: 'Bahrain'},
        	{text: 'Bangladesh', value: 'Bangladesh'},
        	{text: 'Barbados', value: 'Barbados'},
        	{text: 'Belarus', value: 'Belarus'},
        	{text: 'Belgium', value: 'Belgium'},
        	{text: 'Belize', value: 'Belize'},
        	{text: 'Benin', value: 'Benin'},
        	{text: 'Bhutan', value: 'Bhutan'},
        	{text: 'Bolivia', value: 'Bolivia'},
        	{text: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina'},
        	{text: 'Botswana', value: 'Botswana'},
        	{text: 'Brazil', value: 'Brazil'},
        	{text: 'Brunei', value: 'Brunei'},
        	{text: 'Bulgaria', value: 'Bulgaria'},
        	{text: 'Burkina Faso', value: 'Burkina Faso'},
        	{text: 'Burundi', value: 'Burundi'},
	        {text: 'Cabo Verde', value: 'Cabo Verde'},
	        {text: 'Cambodia', value: 'Cambodia'},
	        {text: 'Cameroon', value: 'Cameroon'},
	        {text: 'Canada', value: 'Canada'},
	        {text: 'Central African Republic', value: 'Central African Republic'},
	        {text: 'Chad', value: 'Chad'},
	        {text: 'Chile', value: 'Chile'},
	        {text: 'China', value: 'China'},
	        {text: 'Colombia', value: 'Colombia'},
	        {text: 'Comoros', value: 'Comoros'},
	        {text: 'Congo (Congo-Brazzaville)', value: 'Congo (Congo-Brazzaville)'},
	        {text: 'Congo (Congo-Kinshasa)', value: 'Congo (Congo-Kinshasa)'},
	        {text: 'Costa Rica', value: 'Costa Rica'},
	        {text: 'Croatia', value: 'Croatia'},
	        {text: 'Cuba', value: 'Cuba'},
	        {text: 'Cyprus', value: 'Cyprus'},
	        {text: 'Czech Republic', value: 'Czech Republic'},
	        {text: 'Denmark', value: 'Denmark'},
	        {text: 'Djibouti', value: 'Djibouti'},
	        {text: 'Dominica', value: 'Dominica'},
	        {text: 'Dominican Republic', value: 'Dominican Republic'},
	        {text: 'Ecuador', value: 'Ecuador'},
	        {text: 'Egypt', value: 'Egypt'},
	        {text: 'El Salvador', value: 'El Salvador'},
	        {text: 'Equatorial Guinea', value: 'Equatorial Guinea'},
	        {text: 'Eritrea', value: 'Eritrea'},
	        {text: 'Estonia', value: 'Estonia'},
	        {text: 'Eswatini', value: 'Eswatini'},
	        {text: 'Ethiopia', value: 'Ethiopia'},
	        {text: 'Fiji', value: 'Fiji'},
	        {text: 'Finland', value: 'Finland'},
	        {text: 'France', value: 'France'},
	        {text: 'Gabon', value: 'Gabon'},
	        {text: 'Gambia', value: 'Gambia'},
	        {text: 'Georgia', value: 'Georgia'},
	        {text: 'Germany', value: 'Germany'},
	        {text: 'Ghana', value: 'Ghana'},
	        {text: 'Greece', value: 'Greece'},
	        {text: 'Grenada', value: 'Grenada'},
	        {text: 'Guatemala', value: 'Guatemala'},
	        {text: 'Guinea', value: 'Guinea'},
	        {text: 'Guinea-Bissau', value: 'Guinea-Bissau'},
	        {text: 'Guyana', value: 'Guyana'},
	        {text: 'Haiti', value: 'Haiti'},
	        {text: 'Honduras', value: 'Honduras'},
	        {text: 'Hungary', value: 'Hungary'},
	        {text: 'Iceland', value: 'Iceland'},
	        {text: 'India', value: 'India'},
	        {text: 'Indonesia', value: 'Indonesia'},
	        {text: 'Iran', value: 'Iran'},
	        {text: 'Iraq', value: 'Iraq'},
	        {text: 'Ireland', value: 'Ireland'},
	        {text: 'Israel', value: 'Israel'},
	        {text: 'Italy', value: 'Italy'},
	        {text: 'Jamaica', value: 'Jamaica'},
	        {text: 'Japan', value: 'Japan'},
	        {text: 'Jordan', value: 'Jordan'},
	        {text: 'Kazakhstan', value: 'Kazakhstan'},
	        {text: 'Kenya', value: 'Kenya'},
	        {text: 'Kiribati', value: 'Kiribati'},
	        {text: 'Korea (North)', value: 'Korea (North)'},
	        {text: 'Korea (South)', value: 'Korea (South)'},
	        {text: 'Kuwait', value: 'Kuwait'},
	        {text: 'Kyrgyzstan', value: 'Kyrgyzstan'},
	        {text: 'Laos', value: 'Laos'},
	        {text: 'Latvia', value: 'Latvia'},
	        {text: 'Lebanon', value: 'Lebanon'},
	        {text: 'Lesotho', value: 'Lesotho'},
	        {text: 'Liberia', value: 'Liberia'},
	        {text: 'Libya', value: 'Libya'},
	        {text: 'Liechtenstein', value: 'Liechtenstein'},
	        {text: 'Lithuania', value: 'Lithuania'},
	        {text: 'Luxembourg', value: 'Luxembourg'},
	        {text: 'Madagascar', value: 'Madagascar'},
	        {text: 'Malawi', value: 'Malawi'},
	        {text: 'Malaysia', value: 'Malaysia'},
	        {text: 'Maldives', value: 'Maldives'},
	        {text: 'Mali', value: 'Mali'},
	        {text: 'Malta', value: 'Malta'},
	        {text: 'Marshall Islands', value: 'Marshall Islands'},
	        {text: 'Mauritania', value: 'Mauritania'},
	        {text: 'Mauritius', value: 'Mauritius'},
	        {text: 'Mexico', value: 'Mexico'},
	        {text: 'Micronesia', value: 'Micronesia'},
	        {text: 'Moldova', value: 'Moldova'},
	        {text: 'Monaco', value: 'Monaco'},
	        {text: 'Mongolia', value: 'Mongolia'},
	        {text: 'Montenegro', value: 'Montenegro'},
	        {text: 'Morocco', value: 'Morocco'},
	        {text: 'Mozambique', value: 'Mozambique'},
	        {text: 'Myanmar', value: 'Myanmar'},
	        {text: 'Namibia', value: 'Namibia'},
	        {text: 'Nauru', value: 'Nauru'},
	        {text: 'Nepal', value: 'Nepal'},
	        {text: 'Netherlands', value: 'Netherlands'},
	        {text: 'New Zealand', value: 'New Zealand'},
	        {text: 'Nicaragua', value: 'Nicaragua'},
	        {text: 'Niger', value: 'Niger'},
	        {text: 'Nigeria', value: 'Nigeria'},
	        {text: 'North Macedonia', value: 'North Macedonia'},
	        {text: 'Norway', value: 'Norway'},
	        {text: 'Oman', value: 'Oman'},
	        {text: 'Pakistan', value: 'Pakistan'},
	        {text: 'Palau', value: 'Palau'},
	        {text: 'Panama', value: 'Panama'},
	        {text: 'Papua New Guinea', value: 'Papua New Guinea'},
	        {text: 'Paraguay', value: 'Paraguay'},
	        {text: 'Peru', value: 'Peru'},
	        {text: 'Philippines', value: 'Philippines'},
	        {text: 'Poland', value: 'Poland'},
	        {text: 'Portugal', value: 'Portugal'},
	        {text: 'Qatar', value: 'Qatar'},
	        {text: 'Romania', value: 'Romania'},
	        {text: 'Russia', value: 'Russia'},
	        {text: 'Rwanda', value: 'Rwanda'},
	        {text: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis'},
	        {text: 'Saint Lucia', value: 'Saint Lucia'},
	        {text: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines'},
	        {text: 'Samoa', value: 'Samoa'},
	        {text: 'San Marino', value: 'San Marino'},
	        {text: 'Sao Tome and Principe', value: 'Sao Tome and Principe'},
	        {text: 'Saudi Arabia', value: 'Saudi Arabia'},
	        {text: 'Senegal', value: 'Senegal'},
	        {text: 'Serbia', value: 'Serbia'},
	        {text: 'Seychelles', value: 'Seychelles'},
	        {text: 'Sierra Leone', value: 'Sierra Leone'},
	        {text: 'Singapore', value: 'Singapore'},
	        {text: 'Slovakia', value: 'Slovakia'},
	        {text: 'Slovenia', value: 'Slovenia'},
	        {text: 'Solomon Islands', value: 'Solomon Islands'},
	        {text: 'Somalia', value: 'Somalia'},
	        {text: 'South Africa', value: 'South Africa'},
	        {text: 'South Sudan', value: 'South Sudan'},
	        {text: 'Spain', value: 'Spain'},
	        {text: 'Sri Lanka', value: 'Sri Lanka'},
	        {text: 'Sudan', value: 'Sudan'},
	        {text: 'Suriname', value: 'Suriname'},
	        {text: 'Sweden', value: 'Sweden'},
	        {text: 'Switzerland', value: 'Switzerland'},
	        {text: 'Syria', value: 'Syria'},
	        {text: 'Taiwan', value: 'Taiwan'},
	        {text: 'Tajikistan', value: 'Tajikistan'},
	        {text: 'Tanzania', value: 'Tanzania'},
	        {text: 'Thailand', value: 'Thailand'},
	        {text: 'Timor-Leste', value: 'Timor-Leste'},
	        {text: 'Togo', value: 'Togo'},
	        {text: 'Tonga', value: 'Tonga'},
	        {text: 'Trinidad and Tobago', value: 'Trinidad and Tobago'},
	        {text: 'Tunisia', value: 'Tunisia'},
	        {text: 'Turkey', value: 'Turkey'},
	        {text: 'Turkmenistan', value: 'Turkmenistan'},
	        {text: 'Tuvalu', value: 'Tuvalu'},
	        {text: 'Uganda', value: 'Uganda'},
	        {text: 'Ukraine', value: 'Ukraine'},
	        {text: 'United Arab Emirates', value: 'United Arab Emirates'},
	        {text: 'United Kingdom', value: 'United Kingdom'},
	        {text: 'United States', value: 'United States'},
	        {text: 'Uruguay', value: 'Uruguay'},
	        {text: 'Uzbekistan', value: 'Uzbekistan'},
	        {text: 'Vanuatu', value: 'Vanuatu'},
	        {text: 'Vatican City', value: 'Vatican City'},
	        {text: 'Venezuela', value: 'Venezuela'},
	        {text: 'Vietnam', value: 'Vietnam'},
	        {text: 'Yemen', value: 'Yemen'},
	        {text: 'Zambia', value: 'Zambia'},
	        {text: 'Zimbabwe', value: 'Zimbabwe'}
    	]},
        { inherit:'basicDropdown', name:'currentCountry', stem:'What country do you currently live in?', answers: [
	        {text: 'Afghanistan', value: 'Afghanistan'},
	        {text: 'Albania', value: 'Albania'},
	        {text: 'Algeria', value: 'Algeria'},
	        {text: 'Andorra', value: 'Andorra'},
	        {text: 'Angola', value: 'Angola'},
	        {text: 'Antigua and Barbuda', value: 'Antigua and Barbuda'},
	        {text: 'Argentina', value: 'Argentina'},
	        {text: 'Armenia', value: 'Armenia'},
	        {text: 'Australia', value: 'Australia'},
	        {text: 'Austria', value: 'Austria'},
	        {text: 'Azerbaijan', value: 'Azerbaijan'},
	        {text: 'Bahamas', value: 'Bahamas'},
	        {text: 'Bahrain', value: 'Bahrain'},
	        {text: 'Bangladesh', value: 'Bangladesh'},
	        {text: 'Barbados', value: 'Barbados'},
	        {text: 'Belarus', value: 'Belarus'},
	        {text: 'Belgium', value: 'Belgium'},
	        {text: 'Belize', value: 'Belize'},
	        {text: 'Benin', value: 'Benin'},
	        {text: 'Bhutan', value: 'Bhutan'},
	        {text: 'Bolivia', value: 'Bolivia'},
	        {text: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina'},
	        {text: 'Botswana', value: 'Botswana'},
	        {text: 'Brazil', value: 'Brazil'},
	        {text: 'Brunei', value: 'Brunei'},
	        {text: 'Bulgaria', value: 'Bulgaria'},
	        {text: 'Burkina Faso', value: 'Burkina Faso'},
	        {text: 'Burundi', value: 'Burundi'},
	        {text: 'Cabo Verde', value: 'Cabo Verde'},
	        {text: 'Cambodia', value: 'Cambodia'},
	        {text: 'Cameroon', value: 'Cameroon'},
	        {text: 'Canada', value: 'Canada'},
	        {text: 'Central African Republic', value: 'Central African Republic'},
	        {text: 'Chad', value: 'Chad'},
	        {text: 'Chile', value: 'Chile'},
	        {text: 'China', value: 'China'},
	        {text: 'Colombia', value: 'Colombia'},
	        {text: 'Comoros', value: 'Comoros'},
	        {text: 'Congo (Congo-Brazzaville)', value: 'Congo (Congo-Brazzaville)'},
	        {text: 'Congo (Congo-Kinshasa)', value: 'Congo (Congo-Kinshasa)'},
	        {text: 'Costa Rica', value: 'Costa Rica'},
	        {text: 'Croatia', value: 'Croatia'},
	        {text: 'Cuba', value: 'Cuba'},
	        {text: 'Cyprus', value: 'Cyprus'},
	        {text: 'Czech Republic', value: 'Czech Republic'},
	        {text: 'Denmark', value: 'Denmark'},
	        {text: 'Djibouti', value: 'Djibouti'},
	        {text: 'Dominica', value: 'Dominica'},
	        {text: 'Dominican Republic', value: 'Dominican Republic'},
	        {text: 'Ecuador', value: 'Ecuador'},
	        {text: 'Egypt', value: 'Egypt'},
	        {text: 'El Salvador', value: 'El Salvador'},
	        {text: 'Equatorial Guinea', value: 'Equatorial Guinea'},
	        {text: 'Eritrea', value: 'Eritrea'},
	        {text: 'Estonia', value: 'Estonia'},
	        {text: 'Eswatini', value: 'Eswatini'},
	        {text: 'Ethiopia', value: 'Ethiopia'},
	        {text: 'Fiji', value: 'Fiji'},
	        {text: 'Finland', value: 'Finland'},
	        {text: 'France', value: 'France'},
	        {text: 'Gabon', value: 'Gabon'},
	        {text: 'Gambia', value: 'Gambia'},
	        {text: 'Georgia', value: 'Georgia'},
	        {text: 'Germany', value: 'Germany'},
	        {text: 'Ghana', value: 'Ghana'},
	        {text: 'Greece', value: 'Greece'},
	        {text: 'Grenada', value: 'Grenada'},
	        {text: 'Guatemala', value: 'Guatemala'},
	        {text: 'Guinea', value: 'Guinea'},
	        {text: 'Guinea-Bissau', value: 'Guinea-Bissau'},
	        {text: 'Guyana', value: 'Guyana'},
	        {text: 'Haiti', value: 'Haiti'},
	        {text: 'Honduras', value: 'Honduras'},
	        {text: 'Hungary', value: 'Hungary'},
	        {text: 'Iceland', value: 'Iceland'},
	        {text: 'India', value: 'India'},
	        {text: 'Indonesia', value: 'Indonesia'},
	        {text: 'Iran', value: 'Iran'},
	        {text: 'Iraq', value: 'Iraq'},
	        {text: 'Ireland', value: 'Ireland'},
	        {text: 'Israel', value: 'Israel'},
	        {text: 'Italy', value: 'Italy'},
	        {text: 'Jamaica', value: 'Jamaica'},
	        {text: 'Japan', value: 'Japan'},
	        {text: 'Jordan', value: 'Jordan'},
	        {text: 'Kazakhstan', value: 'Kazakhstan'},
	        {text: 'Kenya', value: 'Kenya'},
	        {text: 'Kiribati', value: 'Kiribati'},
	        {text: 'Korea (North)', value: 'Korea (North)'},
	        {text: 'Korea (South)', value: 'Korea (South)'},
	        {text: 'Kuwait', value: 'Kuwait'},
	        {text: 'Kyrgyzstan', value: 'Kyrgyzstan'},
	        {text: 'Laos', value: 'Laos'},
	        {text: 'Latvia', value: 'Latvia'},
	        {text: 'Lebanon', value: 'Lebanon'},
	        {text: 'Lesotho', value: 'Lesotho'},
	        {text: 'Liberia', value: 'Liberia'},
	        {text: 'Libya', value: 'Libya'},
	        {text: 'Liechtenstein', value: 'Liechtenstein'},
	        {text: 'Lithuania', value: 'Lithuania'},
	        {text: 'Luxembourg', value: 'Luxembourg'},
	        {text: 'Madagascar', value: 'Madagascar'},
	        {text: 'Malawi', value: 'Malawi'},
	        {text: 'Malaysia', value: 'Malaysia'},
	        {text: 'Maldives', value: 'Maldives'},
	        {text: 'Mali', value: 'Mali'},
	        {text: 'Malta', value: 'Malta'},
	        {text: 'Marshall Islands', value: 'Marshall Islands'},
	        {text: 'Mauritania', value: 'Mauritania'},
	        {text: 'Mauritius', value: 'Mauritius'},
	        {text: 'Mexico', value: 'Mexico'},
	        {text: 'Micronesia', value: 'Micronesia'},
	        {text: 'Moldova', value: 'Moldova'},
	        {text: 'Monaco', value: 'Monaco'},
	        {text: 'Mongolia', value: 'Mongolia'},
	        {text: 'Montenegro', value: 'Montenegro'},
	        {text: 'Morocco', value: 'Morocco'},
	        {text: 'Mozambique', value: 'Mozambique'},
	        {text: 'Myanmar', value: 'Myanmar'},
	        {text: 'Namibia', value: 'Namibia'},
	        {text: 'Nauru', value: 'Nauru'},
	        {text: 'Nepal', value: 'Nepal'},
	        {text: 'Netherlands', value: 'Netherlands'},
	        {text: 'New Zealand', value: 'New Zealand'},
	        {text: 'Nicaragua', value: 'Nicaragua'},
	        {text: 'Niger', value: 'Niger'},
	        {text: 'Nigeria', value: 'Nigeria'},
	        {text: 'North Macedonia', value: 'North Macedonia'},
	        {text: 'Norway', value: 'Norway'},
	        {text: 'Oman', value: 'Oman'},
	        {text: 'Pakistan', value: 'Pakistan'},
	        {text: 'Palau', value: 'Palau'},
	        {text: 'Panama', value: 'Panama'},
	        {text: 'Papua New Guinea', value: 'Papua New Guinea'},
	        {text: 'Paraguay', value: 'Paraguay'},
	        {text: 'Peru', value: 'Peru'},
	        {text: 'Philippines', value: 'Philippines'},
	        {text: 'Poland', value: 'Poland'},
	        {text: 'Portugal', value: 'Portugal'},
	        {text: 'Qatar', value: 'Qatar'},
	        {text: 'Romania', value: 'Romania'},
	        {text: 'Russia', value: 'Russia'},
	        {text: 'Rwanda', value: 'Rwanda'},
	        {text: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis'},
	        {text: 'Saint Lucia', value: 'Saint Lucia'},
	        {text: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines'},
	        {text: 'Samoa', value: 'Samoa'},
	        {text: 'San Marino', value: 'San Marino'},
	        {text: 'Sao Tome and Principe', value: 'Sao Tome and Principe'},
	        {text: 'Saudi Arabia', value: 'Saudi Arabia'},
	        {text: 'Senegal', value: 'Senegal'},
	        {text: 'Serbia', value: 'Serbia'},
	        {text: 'Seychelles', value: 'Seychelles'},
	        {text: 'Sierra Leone', value: 'Sierra Leone'},
	        {text: 'Singapore', value: 'Singapore'},
	        {text: 'Slovakia', value: 'Slovakia'},
	        {text: 'Slovenia', value: 'Slovenia'},
	        {text: 'Solomon Islands', value: 'Solomon Islands'},
	        {text: 'Somalia', value: 'Somalia'},
	        {text: 'South Africa', value: 'South Africa'},
	        {text: 'South Sudan', value: 'South Sudan'},
	        {text: 'Spain', value: 'Spain'},
	        {text: 'Sri Lanka', value: 'Sri Lanka'},
	        {text: 'Sudan', value: 'Sudan'},
	        {text: 'Suriname', value: 'Suriname'},
	        {text: 'Sweden', value: 'Sweden'},
	        {text: 'Switzerland', value: 'Switzerland'},
	        {text: 'Syria', value: 'Syria'},
	        {text: 'Taiwan', value: 'Taiwan'},
	        {text: 'Tajikistan', value: 'Tajikistan'},
	        {text: 'Tanzania', value: 'Tanzania'},
	        {text: 'Thailand', value: 'Thailand'},
	        {text: 'Timor-Leste', value: 'Timor-Leste'},
	        {text: 'Togo', value: 'Togo'},
	        {text: 'Tonga', value: 'Tonga'},
	        {text: 'Trinidad and Tobago', value: 'Trinidad and Tobago'},
	        {text: 'Tunisia', value: 'Tunisia'},
	        {text: 'Turkey', value: 'Turkey'},
	        {text: 'Turkmenistan', value: 'Turkmenistan'},
	        {text: 'Tuvalu', value: 'Tuvalu'},
	        {text: 'Uganda', value: 'Uganda'},
	        {text: 'Ukraine', value: 'Ukraine'},
	        {text: 'United Arab Emirates', value: 'United Arab Emirates'},
	        {text: 'United Kingdom', value: 'United Kingdom'},
	        {text: 'United States', value: 'United States'},
	        {text: 'Uruguay', value: 'Uruguay'},
	        {text: 'Uzbekistan', value: 'Uzbekistan'},
	        {text: 'Vanuatu', value: 'Vanuatu'},
	        {text: 'Vatican City', value: 'Vatican City'},
	        {text: 'Venezuela', value: 'Venezuela'},
	        {text: 'Vietnam', value: 'Vietnam'},
	        {text: 'Yemen', value: 'Yemen'},
	        {text: 'Zambia', value: 'Zambia'},
	        {text: 'Zimbabwe', value: 'Zimbabwe'}
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
