var data = {
    requestHeader: {
        interactionCode: 'SEARCH',
        serviceId: 1
    },
    requestBody: {
        inquery: $( ".qa-q-list" ).data('searchquery'),
        count: 10,
        userid: 0
    }};

var rootQ2AURL = $( ".qa-q-list" ).data('q2aurl');

$.ajax({
    type: "POST",
    url: rootQ2AURL + "qa-plugin/api/",
    data: JSON.stringify(data),
    dataType: "json",
    crossDomain: true,
    success: function( ret )
    {
        var html = '';
        ret.responseBody.result.forEach(element => {
            var votes = element.netvotes;
            if (votes > 0)
                votes = '+' + votes;

            var d = new Date(Number(element.created)*1000);
            var options = { month: 'long', day: 'numeric' };
            var date = d.toLocaleDateString('fr', options);

            var tags = '';

            element.tags.split(',').forEach(tag => {
                tags += '<li class="qa-q-item-tag-item"><a href="'+rootQ2AURL+'tag/'+tag+'" class="qa-tag-link">'+tag+'</a></li>';
            });

            html += '<div class="qa-q-list-item" id="q'+element.postid+'">' +
                    '<div class="qa-q-item-stats">' +
                    '<div class="qa-voting qa-voting-net" id="voting_'+element.postid+'">' +
                    '<div class="qa-vote-buttons qa-vote-buttons-net">' +
                    '<button title="Cliquez pour voter pour" type="submit" value="+" class="qa-vote-first-button qa-vote-up-button"> <span class="fa fa-chevron-up"></span> </button>' +
                    '<button title="Cliquez pour voter contre" type="submit" value="–" class="qa-vote-second-button qa-vote-down-button"> <span class="fa fa-chevron-down"></span> </button>' +
                    '</div>' +
                    '<div class="qa-vote-count qa-vote-count-net">' +
                    '<span class="qa-netvote-count">' +
                    '<span class="qa-netvote-count-data">'+votes+'</span><span class="qa-netvote-count-pad"> vote</span>' +
                    '</span>' +
                    '</div>' +
                    '<div class="qa-vote-clear clearfix">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="qa-q-item-main">' +
                    '<div class="qa-q-item-title">' +
                    '<a href="'+element.url+'">'+element.title+'</a>' +
                    '</div>' +
                    '<ul id="qa_ai_images_preview"></ul>' +
                    '<span class="qa-q-item-avatar-meta">' +
                    '    <span class="qa-q-item-meta">' +
                    '        <span class="qa-q-item-what">posée</span>' +
                    '        <span class="qa-q-item-who">' +
                    '            <span class="qa-q-item-who-pad">par </span>' +
                    '            <span class="qa-q-item-who-data">'+element.handle+'</span>' +
                    '            <span class="qa-q-item-who-points">' +
                    '                <span class="qa-q-item-who-points-pad">(</span><span class="qa-q-item-who-points-data">'+element.points+'</span><span class="qa-q-item-who-points-pad"> points)</span>' +
                    '            </span>' +
                    '        </span>' +
                    '        <span class="qa-q-item-when">' +
                    '            <span class="qa-q-item-when-data">'+date+'</span>' +
                    '        </span>' +
                    '    </span>' +
                    '</span>' +
                    '<div class="qa-q-item-tags clearfix">' +
                    '    <ul class="qa-q-item-tag-list">' +tags +
                    '    </ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="qa-q-item-clear clearfix">' +
                    '</div>' +
                    '</div>';
        });

        $( ".qa-q-list" ).html( html );
    }
});
