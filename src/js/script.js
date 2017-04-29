
$(document).ready(function() {


    //$.ajax({
    //    type:"GET",
    //    url:"https://hackerearth.0x10.info/api/accolite_product?type=json&query=list_product",
    //    cache:false,
    //    dataType:"json",
    //    success:function(data){
    //
    //        $("span.product-count").text(data.menu.length);
    //        var productTemplateScript = $('#product-template').html();
    //        var productTemplate = Handlebars.compile(productTemplateScript);
    //
    //        var productHtml = productTemplate(data);
    //
    //        $('.page-loader').addClass('hidden');
    //        $('.controls').removeClass('hidden');
    //        $('.dropdown').removeClass('hidden');
    //        $('section > .row').html(productHtml).find('div').last();
    //
    //        // Instantiate MixItUp:
    //        $('#product-item-container').mixItUp();
    //        $('.product-item a').on('click',function(){
    //
    //            var modalTemplateScript = $('#modal-template').html();
    //            var modalTemplate = Handlebars.compile(modalTemplateScript);
    //
    //            var $this = $(this),
    //                data = $this.parents('.product-item'),
    //                templateData = {
    //                    name : data.find('h2[data-name]').data('name'),
    //                    tags:data.find('p[data-tags]').data('tags'),
    //                    rating : data.find('p[data-rating]').data('rating'),
    //                    image : data.find('.product-image[data-image]').data('image'),
    //                    description:data.find('p[data-description]').data('description')
    //                };
    //
    //            var modalHtml = modalTemplate(templateData);
    //            $('.product-detail').remove();
    //            $('#product-window > .fake-modal-wrapper').prepend(modalHtml);
    //
    //            ////Like button click - Local Storage
    //            var key="";
    //
    //            $('.like-button').on('click',function(){
    //                var $this = $(this);
    //                var count=1;
    //                key = $this.parents('#product-window').find('.product-detail').data('uid');
    //                if(localStorage[key]){
    //                    count += parseInt(localStorage[key]);
    //                    localStorage[key] = count;
    //
    //                }else{
    //                    localStorage[key] = count;
    //                }
    //                $this.find('span.like-count').text(count);
    //            });
    //            //Like Count Init
    //            var likes = localStorage[key];
    //            $('#product-window span.like-count').text(likes>0?likes:1);
    //
    //
    //            $('#product-window').toggleClass('hidden');
    //            $('.main').toggleClass('noscroll');
    //        });
    //    },
    //    error:function(xhr,status,error){
    //
    //        $('span.product-count').text(0);
    //
    //        $('.controls').addClass('hidden');
    //        $('.no-results').addClass('hidden');
    //        $('.page-loader').addClass('hidden');
    //        $('.error-page').removeClass('hidden');
    //
    //    }
    //
    //});

    $.getJSON("data.json",
        function(data){
            $("span.product-count").text(data.menu.length);
            var productTemplateScript = $('#product-template').html();
            var productTemplate = Handlebars.compile(productTemplateScript);

            var productHtml = productTemplate(data);

            $('.page-loader').addClass('hidden');
            $('.controls').removeClass('hidden');
            $('.dropdown').removeClass('hidden');
            $('section > .row').html(productHtml).find('div').last();

            // Instantiate MixItUp:
            $('#product-item-container').mixItUp();
            $('.product-item a').on('click',function(){

            var modalTemplateScript = $('#modal-template').html();
            var modalTemplate = Handlebars.compile(modalTemplateScript);

            var $this = $(this),
                data = $this.parents('.product-item'),
                templateData = {
                    name : data.find('h2[data-name]').data('name'),
                    tags:data.find('p[data-tags]').data('tags'),
                    rating : data.find('p[data-rating]').data('rating'),
                    image : data.find('.product-image[data-image]').data('image'),
                    description:data.find('p[data-description]').data('description')
                };

            var modalHtml = modalTemplate(templateData);
            $('.product-detail').remove();
            $('#product-window > .fake-modal-wrapper').prepend(modalHtml);

            ////Like button click - Local Storage
            var key="";

            $('.like-button').on('click',function(){
                var $this = $(this);
                var count=1;
                key = $this.parents('#product-window').find('.product-detail').data('uid');
                if(localStorage[key]){
                    count += parseInt(localStorage[key]);
                    localStorage[key] = count;

                }else{
                    localStorage[key] = count;
                }
                $this.find('span.like-count').text(count);
            });
            //Like Count Init
            var likes = localStorage[key];
            $('#product-window span.like-count').text(likes>0?likes:1);


            $('#product-window').toggleClass('hidden');
            $('.main').toggleClass('noscroll');
        }

        );
    },function(xhr,status,error){

            $('span.product-count').text(0);

            $('.controls').addClass('hidden');
            $('.no-results').addClass('hidden');
            $('.page-loader').addClass('hidden');
            $('.error-page').removeClass('hidden');

        });

    $('html').on('click',function(){
        if($('.dropdown ul').is(':visible')){
            $('.dropdown ul').slideToggle();
        }
    });
    $('.dropdown a').on('click',function(e){
        $(this).next('ul').slideToggle();
        e.stopPropagation();
    });

    $("#search-input").on("keyup",function(){
        var $this = $(this);
        var query = $(this).val();
        searchProducts(query);
    });
    $('a.close-window').on('click',function(){
        $(this).parents('#product-window').toggleClass('hidden');
        $('.main').toggleClass('noscroll');
    });
    var infoVisible,searchWord;
    function searchProducts(query)
    {
        var searchSet = $('#product-item-container .product-item');
        $(".dropdown").removeClass('hidden');
        $('.no-results').addClass('hidden');
        if(query !== undefined || query !== null)
        searchWord = query.length?query:"";

        searchSet.each(function(index){
            var tags,tagsArr,wordFound=false,noQuery=false;
            tags = $(this).data('tags');

            if(tags.length && searchWord.length)
            {
                tagsArr = tags.split(",");
                $.each(tagsArr,function(index,value){


                    if(value.indexOf(searchWord) != -1 ){
                        wordFound = true;
                    }
                });
            }
            else
            {
                if(!searchWord.length)noQuery = true;
            }


            if(wordFound && !noQuery)
            {
                if(infoVisible){
                    $('.no-results').addClass('hidden');
                    infoVisible = false;
                }
                $(this).fadeIn(100);
            }
            else if(noQuery){
                $(this).fadeIn(200);
            }
            else
            {
                $(this).fadeOut(100);
                $(".dropdown").addClass('hidden');
                $('.no-results').removeClass('hidden');
            }

            setTimeout(function(){
                if( ! searchSet.is(':visible')){
                    $('.no-results').removeClass('hidden');
                    $('.no-results').fadeIn(200);
                    infoVisible = true;
                }
            },600);

        });



    };


});








































