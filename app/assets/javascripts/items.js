// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var extractItemStats = function(itemIndex){

  var actualBackPack = JSON.parse(window.localStorage.getItem("actualBackPackItemsStats"));
  actualBackPack[itemIndex] = null;
  //actualBackPack.splice(itemIndex, 1);
  window.localStorage.setItem("actualBackPackItemsStats", JSON.stringify(actualBackPack));
  var actualBackPack = JSON.parse(window.localStorage.getItem("actualBackPackItemsStats"));
  setTotalStats();
}
var renderItemBackPackImage = function(image, itemIndexPosition){
  var itemImage = '<img src="http://ddragon.leagueoflegends.com/cdn/6.5.1/img/item/'+image+'" class="js-backpack-item backpack-item-image" data-indexPosition="'+itemIndexPosition+'">';
  $('.backpack-items').append(itemImage);

   $('.js-backpack-item').on('click', function(){
        var itemIndex = $(this).attr('data-indexPosition');
        $(this).remove();
        extractItemStats(itemIndex);
        $(".js-alert-bpi").fadeOut();
    });

}
var itemIsUnique = function(itemId){
  $('[class*=js-backpack-item]').each(function(index){
    if($(this).attr('data-itemId')==itemId){
        return false;
    }
  });
}

var getItemStats =  function(itemStats){
  var totalStats = { PercentAttackSpeed: 0, FlatMagicDamage:0, FlatPhysicalDamage: 0, 
    FlatMovementSpeed: 0, PercentMovementSpeed: 0, FlatCritChance: 0, FlatArmor: 0, FlatSpellBlock: 0, 
    FlatHPPool: 0, FlatHPRegen: 0, FlatMPPool: 0, PercentLifeSteal: 0 };

  totalStats["PercentAttackSpeed"] +=  checkAttackSpeed(itemStats);
  totalStats["FlatMagicDamage"] += checkMagicDamage(itemStats);
  totalStats["FlatPhysicalDamage"] += checkPhysicalDamage(itemStats);
  //totalStats["FlatMovementSpeed"] += checkFlatMovementSpeed(itemStats);
  if("FlatMovementSpeedMod" in itemStats ){
    totalStats["FlatMovementSpeed"] += itemStats["FlatMovementSpeedMod"];
    if("PercentMovementSpeed" in itemStats){
      totalStats["FlatMovementSpeed"] = (totalStats["FlatMovementSpeed"] * totalStats["PercentMovementSpeed"]) + totalStats["FlatMovementSpeed"];
    }
  }
  if("PercentMovementSpeedMod" in itemStats ){
    totalStats["PercentMovementSpeed"] += itemStats["PercentMovementSpeedMod"];
    if("FlatMovementSpeed" in itemStats && totalStats["FlatMovementSpeed"] > 0){
      totalStats["FlatMovementSpeed"] = (totalStats["FlatMovementSpeed"] * totalStats["PercentMovementSpeed"]) + totalStats["FlatMovementSpeed"];
    }
  }
  totalStats["FlatCritChance"] += checkCritChance(itemStats);
  totalStats["FlatArmor"] += checkArmor(itemStats);
  totalStats["FlatSpellBlock"] += checkSpellBlock(itemStats);
  totalStats["FlatHPPool"] += checkHPPool(itemStats);
  totalStats["FlatHPRegen"] += checkHPRegen(itemStats);
  totalStats["FlatMPPool"] += checkMPPool(itemStats);
  totalStats["PercentLifeSteal"] += checkLifeSteal(itemStats);
  return totalStats;
}
var checkFlatMovementSpeed = function(itemStats){


  return itemStats["FlatMagicDamageMod"] || 0;
}
var checkPercentMovementSpeed = function(itemStats){
  return itemStats["PercentMovementSpeedMod"] || 0;
}
var checkAttackSpeed = function(itemStats){
  return itemStats["PercentAttackSpeedMod"] * 100 || 0;
}
var checkMagicDamage = function(itemStats){
  return itemStats["FlatMagicDamageMod"] || 0;
}
var checkPhysicalDamage = function(itemStats){
  return itemStats["FlatPhysicalDamageMod"] || 0;
}
var checkCritChance = function(itemStats){
  return itemStats["FlatCritChanceMod"] * 100 || 0;
}
var checkArmor = function(itemStats){
  return itemStats["FlatArmorMod"] || 0;
}
var checkSpellBlock = function(itemStats){
  return itemStats["FlatSpellBlockMod"] || 0;
}
var checkHPPool = function(itemStats){
  return itemStats["FlatHPPoolMod"] || 0;
}
var checkHPRegen = function(itemStats){
  return itemStats["FlatHPRegenMod"] || 0;
}
var checkMPPool = function(itemStats){
  return itemStats["FlatMPPoolMod"] || 0;
}
var checkLifeSteal = function(itemStats){
  return itemStats["PercentLifeStealMod"] * 100 || 0;
}


var getTotalStats = function(arrayStats){
  var itemsTotalStats = { PercentAttackSpeed: 0, FlatMagicDamage:0, FlatPhysicalDamage: 0, 
    FlatMovementSpeed: 0, PercentMovementSpeed: 0, FlatCritChance: 0, FlatArmor: 0, FlatSpellBlock: 0, 
    FlatHPPool: 0, FlatHPRegen: 0, FlatMPPool: 0, PercentLifeSteal: 0 };
  arrayStats.forEach( function(element) {
    itemsTotalStats["PercentAttackSpeed"] += element["PercentAttackSpeed"];
    itemsTotalStats["FlatMagicDamage"] += element["FlatMagicDamage"];
    itemsTotalStats["FlatPhysicalDamage"] += element["FlatPhysicalDamage"];
    itemsTotalStats["FlatMovementSpeed"] += element["FlatMovementSpeed"];
    itemsTotalStats["PercentMovementSpeed"] += element["PercentMovementSpeed"];
    itemsTotalStats["FlatCritChance"] += element["FlatCritChance"];
    itemsTotalStats["FlatArmor"] += element["FlatArmor"];
    itemsTotalStats["FlatSpellBlock"] += element["FlatSpellBlock"];
    itemsTotalStats["FlatHPPool"] += element["FlatHPPool"];
    itemsTotalStats["FlatHPRegen"] += element["FlatHPRegen"];
    itemsTotalStats["FlatMPPool"] += element["FlatMPPool"];
    itemsTotalStats["PercentLifeSteal"] += element["PercentLifeSteal"];

  });
  return itemsTotalStats;
}
var renderAllStats = function(arrayTotalStats){
  $('.js-percentAttackSpeed').text(arrayTotalStats["PercentAttackSpeed"].toFixedDown(3));
  $('.js-percentAttackSpeed').attr('data-statsAmount', arrayTotalStats["PercentAttackSpeed"].toFixedDown(3));
  $('.js-flatMagicDamage').text(arrayTotalStats["FlatMagicDamage"].toFixedDown(3));
  $('.js-flatMagicDamage').attr('data-statsAmount',arrayTotalStats["FlatMagicDamage"].toFixedDown(3));
  $('.js-flatPhysicalDamage').text(arrayTotalStats["FlatPhysicalDamage"].toFixedDown(3));
  $('.js-flatPhysicalDamage').attr('data-statsAmount', arrayTotalStats["FlatPhysicalDamage"].toFixedDown(3));
  $('.js-flatMovementSpeed').text(arrayTotalStats["FlatMovementSpeed"].toFixedDown(3));
  $('.js-flatMovementSpeed').attr('data-statsAmount', arrayTotalStats["FlatMovementSpeed"].toFixedDown(3));
  $('.js-percentMovementSpeed').text(arrayTotalStats["PercentMovementSpeed"].toFixedDown(3));
  $('.js-percentMovementSpeed').attr('data-statsAmount', arrayTotalStats["PercentMovementSpeed"].toFixedDown(3));
  $('.js-flatCritChance').text(arrayTotalStats["FlatCritChance"].toFixedDown(3));
  $('.js-flatCritChance').attr('data-statsAmount', arrayTotalStats["FlatCritChance"].toFixedDown(3));
  $('.js-flatArmor').text(arrayTotalStats["FlatArmor"].toFixedDown(3));
  $('.js-flatArmor').attr('data-statsAmount', arrayTotalStats["FlatArmor"].toFixedDown(3));
  $('.js-flatSpellBlock').text(arrayTotalStats["FlatSpellBlock"].toFixedDown(3));
  $('.js-flatSpellBlock').attr('data-statsAmount', arrayTotalStats["FlatSpellBlock"].toFixedDown(3));
  $('.js-flatHPPool').text(arrayTotalStats["FlatHPPool"].toFixedDown(3));
  $('.js-flatHPPool').attr('data-statsAmount', arrayTotalStats["FlatHPPool"].toFixedDown(3));
  $('.js-flatHPRegen').text(arrayTotalStats["FlatHPRegen"].toFixedDown(3));
  $('.js-flatHPRegen').attr('data-statsAmount', arrayTotalStats["FlatHPRegen"].toFixedDown(3));
  $('.js-flatMPPool').text(arrayTotalStats["FlatMPPool"].toFixedDown(3));
  $('.js-flatMPPool').attr('data-statsAmount', arrayTotalStats["FlatMPPool"].toFixedDown(3));
  $('.js-percentLifeSteal').text(arrayTotalStats["PercentLifeSteal"].toFixedDown(3));
  $('.js-percentLifeSteal').attr('data-statsAmount', arrayTotalStats["PercentLifeSteal"].toFixedDown(3));
}

var setTotalStats = function(){
  var arrayStats = [];
  var arrayTotalStats = [];

  JSON.parse(window.localStorage.getItem("actualBackPackItemsStats")).forEach( function(element) {
    if(element!==null){
      arrayStats.push(getItemStats(element));
    }
  });
  arrayTotalStats = getTotalStats(arrayStats);
  renderAllStats(arrayTotalStats);
  getBaseStatsPerLevel($('.js-champlv').val());
}

$(document).ready( function(){  //events handlers
  localStorage.removeItem("actualBackPackItemsStats");
 
  var itemImageRoute ="http://ddragon.leagueoflegends.com/cdn/6.5.1/img/item/";
  var totalItems = 0;
  
  var actualBackPack = [];
  var backPackLength = 5;
  var itemsTotalStats = { PercentAttackSpeed: 0, FlatMagicDamage:0, FlatPhysicalDamage: 0, 
    FlatMovementSpeed: 0, PercentMovementSpeed: 0, FlatCritChance: 0, FlatArmor: 0, FlatSpellBlock: 0, 
    FlatHPPool: 0, FlatHPRegen: 0, FlatMPPool: 0, PercentLifeSteal: 0 };
  
  $('.js-alert-close').on('click', function(){
    $(".js-alert-bpi").fadeOut();
  });

  $('.js-item-wrap').on('click', function(){
    var actualBackPack = JSON.parse(window.localStorage.getItem("actualBackPackItemsStats")) || [];
    //debugger;
    var countNotNulls =0;
    if(actualBackPack !== null){
      actualBackPack.forEach( function(element) {
        if(element !== null){
          countNotNulls++;
        }
      });
    }
    //debugger;
    if((actualBackPack !==null && countNotNulls <= 6)){
      for(var index = 0; index <= backPackLength; index++) {
        if(actualBackPack[index]===undefined || actualBackPack[index]===null){
          renderItemBackPackImage($(this).children("img").data('image'), index);
          actualBackPack[index] = JSON.parse($(this).children("img").data('stats').replace(/=>/g, ":"));
          countNotNulls++;
          break;
        }
      }
      window.localStorage.setItem("actualBackPackItemsStats", JSON.stringify(actualBackPack));
      setTotalStats();
    }
    if(countNotNulls === 6){
      console.log("Build completa");
      $(".js-alert-bpi").fadeIn();
    }
  });

   
  
});