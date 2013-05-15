// Tweets
// A plugin to process a JSON feed of tweets into a HTML container
// Created by Donovan Hutchinson
// Requires:
//  jQuery
//  Handlebars (for templating)
// Full instructions: http://github.com/donovanh/tweets-plugin/
// Based on: jQuery Plugin Boilerplate by Stefan Gabos

;(function($) {

    $.tweets = function(options) {

        var defaults = {
            searchPhrase: 'hop.ie',
            templateID: 'tweet-template-default',
            destinationID: 'tweet-container',
            tweetSource: 'Your source URL, eg. tweets.example.com',
            maxTweets: 15
        }

        var plugin = this;

        var updateTimer = null;

        plugin.settings = {}

        var init = function() {
            plugin.settings = options || defaults;

            // Check if the destination exists
            if ($('#'+plugin.settings.destinationID).length == 0) {
              console.log('Tweets plugin error: Please supply a destination element for the tweets.');
              return;
            }
            // Check if there's a source to get the tweets (essential)
            if (plugin.settings.tweetSource.length == 0) {
              console.log('Tweets plugin error: This plugin requires a server component specified. Please check github.com/donovanh/tweets/ for details.');
              return;
            }

            plugin.settings.searchPhrase = cleanSearchPhrase(plugin.settings.searchPhrase);

            // Get the tweet template
            if ($('#'+plugin.settings.templateID).length == 0) {
              // Use the default template
              plugin.settings.templateHTML = tweet_template_default;
            } else {
              plugin.settings.templateHTML = $('#'+plugin.settings.templateID).html();
            }

            if (plugin.settings.searchPhrase.length > 0) {
              $.get(plugin.settings.tweetSource+'/search/'+plugin.settings.searchPhrase, function(data) {
                var outputHTML = '';
                if (data.results !== undefined && data.results.length > 0) {
                  $.each(data.results, function(index, tweet) {
                    tweet.text = linkify_entities(tweet);
                    tweet.relative_timestamp = time_ago(tweet.created_at);
                    var template = Handlebars.compile(plugin.settings.templateHTML);
                    outputHTML += template(tweet);
                  });
                }
                $("#"+plugin.settings.destinationID).html(outputHTML);
              });
              // Since the success was successful, add a listener for a stream of further tweets
              listenForMoreTweets(plugin.settings);
            } else {
              console.log('Tweets plugin error: Please supply a searchPhrase.');
              return;
            }

            // Set timeout to update the timestamps
            updateTimer = window.setInterval(function() { updateDatestamps(); }, 10000);

        }

        // Default handlebars template
        var tweet_template_default = '<article class="tweet"><section class="user-details"><a href="http://twitter.com/{{from_user}}"><div class="user-image" style="background-image: url({{profile_image_url}})"></div><p><strong>{{from_user_name}}</strong><span>{{from_user}}</span></p></a></section><p class="text">{{{text}}}</p><p class="timing" data-created-at="{{created_at}}"><a href="http://twitter.com/{{from_user}}/statuses/{{id_str}}">{{relative_timestamp}}</a></p></article>';


        // plugin.foo_public_method = function() {
        //     // code goes here
        // }

        // Private methods

        var listenForMoreTweets = function(settings) {
          var socket = io.connect(settings.tweetSource);
          socket.on('tweet', function (data) {
            addToTopOfList(data, settings);
          });
          socket.emit('stream', settings.searchPhrase);
        }

        var addToTopOfList = function(tweet, settings) {
          if (tweet.user === undefined) {
            return;
          }
          tweet.text = linkify_entities(tweet);
          tweet.relative_timestamp = time_ago(tweet.created_at);
          tweet.from_user = tweet.user.screen_name;
          tweet.profile_image_url = tweet.user.profile_image_url;
          tweet.from_user_name = tweet.user.name;
          var template = Handlebars.compile(settings.templateHTML);
          var existingHTML = $("#"+settings.destinationID).html();
          var outputHTML = $('<div></div>');
          outputHTML.html(template(tweet));
          outputHTML.find('.tweet').addClass('new');
          $("#"+settings.destinationID).html(outputHTML.html() + existingHTML);
          // Remove new class to trigger a flash in the CSS transition
          $('.tweet').removeClass('new');
          // Makre sure we don't have too many tweets showing
          trimTweets(settings.maxTweets);
        }

        var trimTweets = function(maxTweets) {
          // Trim the number of tweets shown to reduce memory usage
          if ($('.tweet').length > maxTweets) {
            $.each($('.tweet'), function(index, tweet) {
              if (index > maxTweets) {
                $(tweet).remove();
              }
            });
          }
        }

        var cleanSearchPhrase =function(searchphrase) {
          return searchphrase.replace('#', '%23');
        }

        var updateDatestamps = function() {
          // Scan all the tweets and update the timestamps on each
          $.each($('.tweet'), function(index, tweet) {
            var dateHTML = $(tweet).find('p.timing');
            var originalDate = $(dateHTML).attr('data-created-at');
            var relativeDate = time_ago(originalDate);
            $(dateHTML).find('a').text(relativeDate);
          });
        }

        var time_ago = function(time){

          switch (typeof time) {
              case 'number': break;
              case 'string': time = +new Date(time); break;
              case 'object': if (time.constructor === Date) time = time.getTime(); break;
              default: time = +new Date();
          }
          var time_formats = [
              [60, 'seconds', 1], // 60
              [120, '1 minute ago', '1 minute from now'], // 60*2
              [3600, 'minutes', 60], // 60*60, 60
              [7200, '1 hour ago', '1 hour from now'], // 60*60*2
              [86400, 'hours', 3600], // 60*60*24, 60*60
              [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
              [604800, 'days', 86400], // 60*60*24*7, 60*60*24
              [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
              [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
              [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
              [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
              [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
              [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
              [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
              [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
          ];
          var seconds = (+new Date() - time) / 1000,
              token = 'ago', list_choice = 1;

          if (seconds == 0) {
              return 'Just now'
          }
          if (seconds < 0) {
              seconds = Math.abs(seconds);
              token = 'from now';
              list_choice = 2;
          }
          var i = 0, format;
          while (format = time_formats[i++])
              if (seconds < format[0]) {
                  if (typeof format[2] == 'string')
                      return format[list_choice];
                  else
                      return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
              }
          return time;
        }

        var escapeHTML = function (text) {
            return $('<div/>').text(text).html()
        }
           
        var linkify_entities = function (tweet) {
            if (!(tweet.entities)) {
                return escapeHTML(tweet.text)
            }
            
            // This is very naive, should find a better way to parse this
            var index_map = {}
            
            $.each(tweet.entities.urls, function(i,entry) {
                console.log(entry);
                index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<a href='"+escapeHTML(entry.url)+"'>"+escapeHTML(entry.display_url)+"</a>"}]
            })
            
            $.each(tweet.entities.hashtags, function(i,entry) {
                index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<a href='http://twitter.com/search?q="+escape("#"+entry.text)+"'>"+escapeHTML(text)+"</a>"}]
            })
            
            $.each(tweet.entities.user_mentions, function(i,entry) {
                index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<a title='"+escapeHTML(entry.name)+"' href='http://twitter.com/"+escapeHTML(entry.screen_name)+"'>"+escapeHTML(text)+"</a>"}]
            })
            
            var result = ""
            var last_i = 0
            var i = 0
            
            // iterate through the string looking for matches in the index_map
            for (i=0; i < tweet.text.length; ++i) {
                var ind = index_map[i]
                if (ind) {
                    var end = ind[0]
                    var func = ind[1]
                    if (i > last_i) {
                        result += escapeHTML(tweet.text.substring(last_i, i))
                    }
                    result += func(tweet.text.substring(i, end))
                    i = end - 1
                    last_i = end
                }
            }
            
            if (i > last_i) {
                result += escapeHTML(tweet.text.substring(last_i, i))
            }
            
            return result
        }

        init();

    }

})(jQuery);
