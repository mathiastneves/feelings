document.addEventListener('DOMContentLoaded', function() {

    //Fetches an API to retrieve a random quote
    getQuote = function () {
        var quoteNumber = Math.floor(Math.random() * 1644)
        fetch('https://type.fit/api/quotes')
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('.random-quote').innerHTML = `"${data[quoteNumber].text}"`
            document.querySelector('.random-quote-author').innerHTML = data[quoteNumber].author
        });
    }
    getQuote()

    document.querySelector('.get-quote').onclick = getQuote

    //Starts breathing animation
    document.querySelector('.start-breathing').onclick = function(){
        document.querySelector('.circle').classList.add('animation')
    }

    //Stops breathing animation
    document.querySelector('.stop-breathing').onclick = function(){
        document.querySelector('.circle').classList.remove('animation')
    }

    document.querySelector('.faster').onclick = function(){
        circle = document.querySelector('.circle')
        let cycle = parseInt(getComputedStyle(circle).animationDuration, 10)
        console.log(cycle)
        
        if (cycle > 4){
            cycle = (cycle / 4 - 1) * 4
            circle.style.animationDuration = cycle + "s"
        }
    }
    document.querySelector('.slower').onclick = function(){
        circle = document.querySelector('.circle')
        let cycle = parseInt(getComputedStyle(circle).animationDuration, 10)
        console.log(cycle)
        if (cycle > 0 && cycle < 28){
            cycle = (cycle / 4 + 1) * 4
            circle.style.animationDuration = cycle + "s"
        }
    }
    
    //Select main feelings
    var mainFeelings = document.getElementsByClassName('main-feeling')

    //Select all feelings
    var allFeelings = document.getElementsByClassName('feeling')

    //Select deeper feelings
    var deeperFeelings = document.getElementsByClassName('deeper')
    
    Array.prototype.forEach.call(allFeelings, function(element){
    
        //Adds event listener to feelings
        element.addEventListener('click', function(element){
            var selectedFeeling = element.target.value
            let description = ''

            //Fetches dictionary api
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedFeeling}`)
            .then((response) => response.json())
            .then((data) => {
            
            //Loops through all meanings
            for (let i = 0; i < data[0].meanings.length; i++){

                //Filters only meanings that are adjectives
                if(data[0].meanings[i].partOfSpeech == 'adjective'){

                    data[0].meanings[i].definitions.forEach(function(definition){
                        
                        //Filters out meanings that contain parenthesis
                        if(definition.definition.indexOf('(') == -1){
                        description += '<p>' + definition.definition + '</p>'
                        }
                    })
                    
                }
            }
            document.querySelector('.feeling-description').innerHTML = description
            document.querySelector('.feeling-description-heading').innerHTML = `Definition: ${selectedFeeling}`
            document.querySelector('.feeling-description-container').style.display = 'block'
            });
            
            
            /*Displays more feelings
            document.querySelector('.more').onclick = function(){
                
                var moreFeelings = document.getElementsByClassName(selectedFeeling);
                
                Array.prototype.forEach.call(moreFeelings, function(field){
                    field.style.display = 'inline-block'
                })
            } */

            //Displays more feelings
            document.querySelector('.more').onclick = function(){
                let checkedFeelings = []

                //Reset display of all deeper feelings to none every time the button is clicked
                Array.prototype.forEach.call(deeperFeelings, function(field){
                    field.style.display = 'none'
                })

                //Creates an array with only the selected fields every time the button is clicked
                Array.prototype.forEach.call(mainFeelings, function(field){    
                    if (field.checked == true){
                        checkedFeelings.push(field.value)
                    }
                })

                //Shows only the deeper feelings related to the selected main feelings
                Array.prototype.forEach.call(deeperFeelings, function(field){
                    checkedFeelings.forEach(function(checkedFeeling){
                        if (field.classList.contains(checkedFeeling)){
                            field.style.display = 'inline-block'
                        }
                    })     
                })
            }
        })
    })
})