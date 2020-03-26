const { prefix, token } = require('./config.json');

const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('The bot is online!');
    client.user.setActivity("DM me \"hi\" to start", { type: "PLAYING"})
});

client.on('message', message => {
    const args = message.content.slice(prefix.length);
    const command = args.toLowerCase();

    if (message.content === 'hi' || message.content === "Hi" || message.content === "hey" || message.content === "Hey" || message.content === "hello" || message.content === "Hello") {
        const embedMessage = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Welcome to Corona Statistics')
            .setURL('https://google.com')
            .addField('**What do I do?** :information_source:', 'I send the latest available information about **COVID-19!**', false)
            .addField('**How to use?** :thinking:', 'Use **!corona help** for instructions', false)
            .addField('**What do I want?** :palms_up_together:', 'I want you to stay safe, so please **#StayAtHome**, ' + message.author.username + ' :kissing_heart: :mask:', false)
            .setFooter('Bot created by @mkelzeer');

        message.channel.send(embedMessage);
    } else if (command ===  "ping") {
        var ping = Date.now() - message.createdTimestamp + " ms";
        message.channel.send("Your ping is `" + `${Date.now() - message.createdTimestamp}` + " ms`");
    } else if (command ===  "suggestions" || command ===  "ideas" || command ===  "fun" || command ===  "guide") {
        const embedMessage = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Quarantine Starter Pack')
            .setURL('https://www.facebook.com/mhawirosero/posts/10222419902861916')
            .setDescription('A guide to some stuff you can do during the quarantine time. \n \n **Disclaimer**: We didn\'t test the games & software programs provided, please scan them before use and download them on your own risk. But keep your PC safe, imagine you staying safe and your PC dying to a virus :joy:')
            .addField('**Movies**:', 'https://drive.google.com/drive/folders/1z9TE9dCdWe1epUWxHbpCZSSUoAF4DQdj', false)
            .addField('**Games**:', 'https://drive.google.com/drive/folders/1_rk2Y2Dm4t95OqA4RJT1T3oTv6Q7J9o8', false)
            .addField('**Series**:', 'https://drive.google.com/drive/folders/16vVbSTKIwGCdr1wFttAK_INuvXjXjH9Z', false)
            .addField('**Music**:', 'https://drive.google.com/drive/folders/1OgkdIeT7gI_fvRnDlJvrnPv3_RbCku2o', false)
            .addField('**Software**:', 'https://drive.google.com/drive/folders/1zLGO4Dhek-CnMTPgPG5BbHZLeKPntVEK', false)
            .addField('**Fix Google Drive Download Limit (Quota Exceeded) Error**:', 'https://www.geekrar.com/fix-bypass-google-drive-download-limit-error/', false)
            .setFooter('Content provided by Mhawi Rosero, bot created by @mkelzeer');

        message.channel.send(embedMessage);
    } else if (command === "help") {
        const embedMessage = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Commands Help')
            .setURL('https://google.com')
            .addField('**!corona** *global*', 'Sends the latest worldwide corona-stats available', false)
            .addField('**!corona** *country*', 'Sends corona-stats stats for the specific country', false)
            .addField('**!corona** *instructions*', 'Sends you the *random-masks* usage instructions', false)
            .addField('**!corona** *fun*', 'Try it! :wink:', false)
            .setFooter('Bot created by @mkelzeer');

            message.channel.send(embedMessage);
    } else if (command === "instructions") {
        message.channel.send('The instructions are provided by **World Health Organization**', {files: ["https://i.imgur.com/vst2OY4.png"]});
    } else if (command === "global") {
        axios({
            "method":"GET",
            "url":"https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
            "headers": {
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key":"2adbab6d4bmshea1acf94ee759eap109d43jsn28fe3bc9e950"
            }
        }).then((response)=>{
            data = response.data

            var total_cases = data.total_cases
            var total_deaths = data.total_deaths
            var total_recovered = data.total_recovered
            var new_cases = data.new_cases;
            var new_deaths = data.new_deaths
            var statistic_taken_at = data.statistic_taken_at

            const embedMessage = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('COVID-19 Statistics')
                .setURL('https://google.com')
                .setDescription('Latest available data about CoronaVirus (COVID-19)')
                .setThumbnail('https://www.cdc.gov/coronavirus/2019-ncov/images/outbreak-coronavirus-world.png')
                .addField('**Total cases**', total_cases, true)
                .addField('**Total recovered**', total_recovered, true)
                .addField('**New cases**', new_cases, false)
                .addField('**New deaths**', new_deaths, true) 
                .addField('**Total deaths**', total_deaths, true)   
                .setFooter('Data taken at ' + statistic_taken_at);

            message.channel.send(embedMessage);
        }).catch((error)=>{
            console.log(error)
        });
    } else if (message.content.startsWith(prefix)){
        if (args == args.toUpperCase()) {
            upper_args = args;
        } else {
            var splitStr = args.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }

            upper_args = splitStr.join(' ');
        }

        axios({
            "method":"GET",
            "url":"https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
            "headers": {
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key":"2adbab6d4bmshea1acf94ee759eap109d43jsn28fe3bc9e950"
            }
        }).then((response)=>{
            data = response.data["countries_stat"];
            function filterIt(arr, searchKey) {
                return arr.filter(function(obj) {
                  return Object.keys(obj).some(function(key) {
                    searchedData = obj[key].includes(searchKey);
                    return searchedData;
                  })
                });
            }
            useable_data = filterIt(data, upper_args)[0];

            const embedMessage = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('COVID-19 Statistics — ' + useable_data['country_name'])
                .setURL('https://google.com')
                .setDescription('Latest available data about CoronaVirus (COVID-19) in ' + useable_data['country_name'])
                .setThumbnail('https://www.cdc.gov/coronavirus/2019-ncov/images/outbreak-coronavirus-world.png')
                .addField('**Confirmed cases**', useable_data['cases'], true)
                .addField('**Active cases**', useable_data['active_cases'], true)
                .addField('**Recovered cases**', useable_data['total_recovered'], true)
                .addField('**New cases**', useable_data['new_cases'], true)
                .addField('**Deaths**', useable_data['deaths'], true)
                .addField('**New deaths**', useable_data['new_deaths'], true)
                .addField('**Critical/Serious cases**', useable_data['serious_critical'], true)
                .addField('**Total cases per 1,000,000 population**', useable_data['total_cases_per_1m_population'], false)
                .setFooter('Data taken at ' + response.data["statistic_taken_at"]);

            message.channel.send(embedMessage);
        }).catch((error)=> {
            console.log('Somone wrote an invalid country, here are the logs: \n' + '__START__ \n' + '   ' + error + '\n __END__');
            message.channel.send("Invalid country, please use **!corona help** for instructions on how to use the bot.")
        })
    }
});

client.login(token); // Edit "token" in config.json
