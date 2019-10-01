$(document).ready(function () {
  establishSearch("#search-input");
});


function establishSearch(searchInputSelector) {
  //config.toml 传递值到页面，Jquery获取相关的值
  // var AppID = $("#algoliaData").data("appid");
  // var SearchKey = $("#algoliaData").data("searchkey");
  // var initindex = $("#algoliaData").data("initindex");
  var SearchKey="3db7ff6e33f59c09f8bdaef18ca4ee4d";
  var AppID="0Q3QVS8ZFA";
  var initindex="myhugo";

  var client = algoliasearch(AppID, SearchKey);
  var index = client.initIndex(initindex);
  $(searchInputSelector).autocomplete({hint: false}, [
    {
      source: $.fn.autocomplete.sources.hits(index, {hitsPerPage: 8}),
      displayKey: 'name',
      templates: {
        suggestion: function (suggestion) {
          return '<span>' + '<a href="/' + suggestion.uri.toLowerCase() + '">' +
            suggestion._highlightResult.title.value + '</a></span>';

        }
      }
    }
  ]).on('autocomplete:selected', function (event, suggestion, dataset) {
    return '<span>' + '<a href="/' + suggestion.uri.toLowerCase() + '">' +
      suggestion._highlightResult.title.value + '</a></span>';

  });
}
