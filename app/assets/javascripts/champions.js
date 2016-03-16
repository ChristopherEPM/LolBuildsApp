// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

var getBaseStatsPerLevel = function(champLevel){
    // var atack =$('#champ-attackdamage').data('stat');
    // var bonusAtack = $('#champ-attackdamageperlevel').data('stat') * champLevel;
    if($('#champ-attackdamageperlevel').data('stat') > 0){
      renderAtackDamage(($('#champ-attackdamageperlevel').data('stat') * champLevel) + ($('#champ-attackdamage').data('stat')) ); 
    }
    if($('#champ-critperlevel').data('stat') > 0){
      renderCritic(($('#champ-critperlevel').data('stat') * champLevel) + ($('#champ-crit').data('stat')) ); 
    }
    if($('#champ-armorperlevel').data('stat') > 0){
      renderArmor(($('#champ-armorperlevel').data('stat') * champLevel) + ($('#champ-armor').data('stat')) ); 
    }
    if($('#champ-spellblockperlevel').data('stat') > 0){
      renderSpellBlock(($('#champ-spellblockperlevel').data('stat') * champLevel) + ($('#champ-spellblock').data('stat')) ); 
    }
    if($('#champ-hpperlevel').data('stat') > 0){
      renderHp(($('#champ-hpperlevel').data('stat') * champLevel) + ($('#champ-hp').data('stat')) ); 
    }
    if($('#champ-hpregenperlevel').data('stat') > 0){
      renderHpRegen(($('#champ-hpregenperlevel').data('stat') * champLevel) + ($('#champ-hpregen').data('stat')) ); 
    }
    if($('#champ-mpperlevel').data('stat') > 0){
      renderResources(($('#champ-mpperlevel').data('stat') * champLevel) + ($('#champ-mp').data('stat')) ); 
    }
    if($('#champ-mpregenperlevel').data('stat') > 0){
      renderResourcesRegen(($('#champ-mpregenperlevel').data('stat') * champLevel) + ($('#champ-mpregen').data('stat')) ); 
    }
    if($('#champ-magicpowerperlevel').data('stat') > 0){
      renderResourcesRegen(($('#champ-magicpowerperlevel').data('stat') * champLevel) + ($('#champ-magicpowerper').data('stat')) ); 
    }

}

var renderAtackDamage = function(calculatedAtack){
  $("#champ-attackdamage").text(calculatedAtack.toFixedDown(3));

}
var renderCritic = function(calculatedCritic){
  $("#champ-crit").text(calculatedCritic.toFixedDown(3));
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
  $("#champ-magicpower").text(calculatedArmor.toFixedDown(3));
}
var renderFlatMagicPen = function(calculatedFlatMagicPenetration){
  $("#champ-fmagicpen").text(calculatedArmor.toFixedDown(3));
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