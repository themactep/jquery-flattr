/*
  Flattr buttons for Blogger.
  Paul Philippov <themactep@gmail.com>

  Installation
  ------------
  Copy the followind code within <header/> area of your HTML template.
  Don't forget to replace <username> with your Flattr username.

  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"/>
  <script type="text/javascript" src="http://dl.dropbox.com/u/2074242/Google/jquery.flattr-0.0.1.js"/>
  <script type="text/javascript">
  $('document').ready(function(){
    $(this).flattr('<username>');
  });
  </script>

  License
  -------
  http://creativecommons.org/licenses/by-sa/3.0/

  Documentation
  -------------
  https://github.com/themactep/jquery-flattr

  Last Change: 04-Jan-2011.
*/

(function($){
  $.fn.extend({
    flattr: function(user_id, button_type, language){

      if (typeof(user_id) == 'undefined') {
        alert("Flattr Button plugin: User ID is not defined.");
        exit;
      }

      if (typeof(button_type) == 'undefined') {
        button_type = 'default';
      }

      if (typeof(language) == 'undefined') {
        language = 'en_GB';
      }

      var ApiVersion = '0.6';

      $('.post').each(function(){
        var title = $(this).find('.post-title').text().trim();
        var url   = $(this).find('.post-title a').attr('href');
        var descr = $(this).find('.post-body').text().trim().split("\n")[0];
        var tags_array = new Array();
        $(this).find('.post-labels a').each(function(){
          tags_array.push($(this).text().trim());
        });
        var tags = tags_array.join(',');

        var link = $('<a/>').addClass('FlattrButton').text(descr)
                            .attr('href', url)
                            .attr('title', title)
                            .attr('lang', language)
                            .attr('data-flattr-uid', user_id)
                            .attr('data-flattr-category', 'text')
                            .attr('data-flattr-tags', tags)
                            .css('display', 'none');

        $(this).prepend($('<aside/>').append($('<span/>').append(link)));
      });

      $.getScript('http://api.flattr.com/js/' + ApiVersion + '/load.js?mode=auto&button=' + button_type);

    }
  });
})(jQuery);
