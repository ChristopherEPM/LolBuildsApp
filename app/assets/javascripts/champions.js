// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

var getBaseStatsPerLevel = function(champLevel){
    renderMoveSpeed( parseFloat($('#champ-movespeed').data('stat')) + (((parseFloat($('.js-flatMovementSpeed').attr('data-statsamount')) +parseFloat($('.js-flatMovementSpeed').attr('data-statsamount'))) * parseFloat($('.js-percentMovementSpeed').attr('data-statsamount')))) + parseFloat($('.js-flatMovementSpeed').attr('data-statsamount'))); 
    if(parseFloat($('#champ-attackdamageperlevel').data('stat')) > 0){
      renderAtackDamage((parseFloat($('#champ-attackdamageperlevel').data('stat')) * champLevel) + parseFloat($('#champ-attackdamage').data('stat')) + parseFloat($('.js-flatPhysicalDamage').attr('data-statsamount')));
    }
    else{
      renderAtackDamage( parseFloat($('#champ-attackdamage').data('stat')) + parseFloat($('.js-flatPhysicalDamage').attr('data-statsamount')) );
    }
    if(parseFloat($('#champ-critperlevel').data('stat')) > 0){
      renderCritic((parseFloat($('#champ-critperlevel').data('stat')) * champLevel) + parseFloat($('#champ-crit').data('stat')) ); 
    }
    if(parseFloat($('#champ-critchanceperlevel').data('stat')) > 0){
      renderCritic((parseFloat($('#champ-critchanceperlevel').data('stat')) * champLevel) + parseFloat($('#champ-critchance').data('stat')) + parseFloat($('.js-flatCritChance').attr('data-statsamount')));
    }
    else{
      renderCriticChance(parseFloat($('#champ-critchance').data('stat')) + parseFloat($('.js-flatCritChance').attr('data-statsamount')));
    }
    if(parseFloat($('#champ-armorperlevel').data('stat')) > 0){
      renderArmor((parseFloat($('#champ-armorperlevel').data('stat')) * champLevel) + parseFloat($('#champ-armor').data('stat')) + parseFloat($('.js-flatArmor').attr('data-statsamount'))); 
    }
    else{
      renderArmor(parseFloat($('#champ-armor').data('stat')) + parseFloat($('.js-flatArmor').attr('data-statsamount')));
    }
    if(parseFloat($('#champ-spellblockperlevel').data('stat')) > 0){
      renderSpellBlock((parseFloat($('#champ-spellblockperlevel').data('stat')) * champLevel) + parseFloat($('#champ-spellblock').data('stat')) + parseFloat($('.js-flatSpellBlock').attr('data-statsamount'))); 
    }
    else{
      renderSpellBlock(parseFloat($('#champ-spellblock').data('stat')) + parseFloat($('.js-flatSpellBlock').attr('data-statsamount')));
    }
    if(parseFloat($('#champ-hpperlevel').data('stat')) > 0){
      renderHp((parseFloat($('#champ-hpperlevel').data('stat')) * champLevel) + parseFloat($('#champ-hp').data('stat')) + parseFloat($('.js-flatHPPool').attr('data-statsamount'))); 
    }
    else{
      renderHP(parseFloat($('#champ-hp').data('stat')) + parseFloat($('.js-flatHPPool').attr('data-statsamount')));
    }
    if(parseFloat($('#champ-hpregenperlevel').data('stat')) > 0){
      renderHpRegen((parseFloat($('#champ-hpregenperlevel').data('stat')) * champLevel) + parseFloat($('#champ-hpregen').data('stat')) + parseFloat($('.js-flatHPRegen').attr('data-statsamount'))); 
    }
    else{
      renderHpRegen(parseFloat($('#champ-hpregen').data('stat')) + parseFloat($('.js-flatHPRegen').attr('data-statsamount')));
    }
    if(parseFloat($('#champ-mpperlevel').data('stat')) > 0){
      if($('#champ-resourcetype').data('partype')==="MP"){
        renderResources((parseFloat($('#champ-mpperlevel').data('stat')) * champLevel) + parseFloat($('#champ-mp').data('stat')) + parseFloat($('.js-flatMPPool').attr('data-statsamount')));        
      }
      else{
        renderResources((parseFloat($('#champ-mpperlevel').data('stat')) * champLevel) + parseFloat($('#champ-mp').data('stat')) );
      }
      
    }
    else{
      if($('#champ-resourcetype').data('partype')==="MP"){
        renderResources(parseFloat($('#champ-mp').data('stat')) + parseFloat($('.js-flatMPPool').attr('data-statsamount')));        
      }
      else{
        renderResources(parseFloat($('#champ-mp').data('stat')) );
      }
    }
    if(parseFloat($('#champ-mpregenperlevel').data('stat')) > 0){
      renderResourcesRegen((parseFloat($('#champ-mpregenperlevel').data('stat') * champLevel)) + parseFloat($('#champ-mpregen').data('stat')) ); 
    }
    renderMagicPower(parseFloat($('#champ-magicpower').data('stat')) + parseFloat($('.js-flatMagicDamage').attr('data-statsamount')));
    

}

var renderAtackDamage = function(calculatedAtack){
  $("#champ-attackdamage").text(calculatedAtack.toFixedDown(3));
}
var renderCritic = function(calculatedCritic){
  $("#champ-crit").text(calculatedCritic.toFixedDown(3));
}
var renderCriticChance =  function(calculatedCriticChance){
  $("#champ-critchance").text(calculatedCriticChance.toFixedDown(3));
}
var renderArmor = function(calculatedArmor){
  $("#champ-armor").text(calculatedArmor.toFixedDown(3));
}
var renderSpellBlock = function(calculatedSpellBlock){
  $("#champ-spellblock").text(calculatedSpellBlock.toFixedDown(3));
}
var renderHp = function(calculatedHp){
  $("#champ-hp").text(calculatedHp.toFixedDown(3));
}
var renderHpRegen = function(calculatedHpRegen){
  $("#champ-hpregen").text(calculatedHpRegen.toFixedDown(3));
}
var renderMoveSpeed = function(calculatedMoveSpeed){
  $("#champ-movespeed").text(calculatedMoveSpeed.toFixedDown(3));
}
var renderResources = function(calculatedResources){
  $("#champ-mp").text(calculatedResources.toFixedDown(3));
}
var renderResourcesRegen = function(calculatedResourcesRegen){
  $("#champ-mpregen").text(calculatedResourcesRegen.toFixedDown(3));
}
var renderMagicPower = function(calculatedMagicPower){
  $("#champ-magicpower").text(calculatedMagicPower.toFixedDown(3));
}
var renderFlatMagicPen = function(calculatedFlatMagicPenetration){
  $("#champ-fmagicpen").text(calculatedFlatMagicPenetration.toFixedDown(3));
}
var renderPercentMagicPen = function(calculatedPercentMagicPenetration){
  $("#champ-xcentmagicpen").text(calculatedPercentMagicPenetration.toFixedDown(3));
}
var renderFlatArmorPen = function(calculatedFlatArmorPenetration){
  $("#champ-farmorpem").text(calculatedFlatArmorPenetration.toFixedDown(3));
}
var renderPercentArmorPen = function(calculatedPercentArmorPenetration){
  $("#champ-xcentarmorpen").text(calculatedPercentArmorPenetration.toFixedDown(3));
}


$(document).ready(function(){
  //events handlers

      $('.js-champlv').on('change', function(){
        if($('.js-champlv').val()>=1 && $('.js-champlv').val()<=18)
          getBaseStatsPerLevel($('.js-champlv').val());
      });

  // var doSearch = function(){

  //   $(".btn-submit").on("click", function(event){
  //     event.preventDefault();// evitamos que haga el submit y recargue la pagina
  //     var termSearch = $('.js-sinput').val();
  //     ajaxRequest(termSearch);
  //   });

  // }();

  // var playerStateHandler = function(){
  //   $('.btn-play').on('click', function(){
  //     trackClassToggler();
  //     playerTrigger();
  //   });
  // }();

  // var playerTimeUpdateHandler = function(){
  //   $('.js-player').on('timeupdate', printTime);
  // }();
});
