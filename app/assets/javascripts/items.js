// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

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
  if("PercentAttackSpeedMod" in itemStats ){
    totalStats["PercentAttackSpeed"] += itemStats["PercentAttackSpeedMod"];
  }
  if("FlatMagicDamageMod" in itemStats ){
    totalStats["FlatMagicDamage"] += itemStats["FlatMagicDamageMod"];
  }
  if("FlatPhysicalDamageMod" in itemStats ){
    totalStats["FlatPhysicalDamage"] += itemStats["FlatPhysicalDamageMod"];
  }
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
  if("FlatCritChanceMod" in itemStats ){
    totalStats["FlatCritChance"] += itemStats["FlatCritChanceMod"];
  }
  if("FlatArmorMod" in itemStats ){
    totalStats["FlatArmor"] += itemStats["FlatArmorMod"];
  }
  if("FlatSpellBlockMod" in itemStats ){
    totalStats["FlatSpellBlock"] += itemStats["FlatSpellBlockMod"];
  }
  if("FlatHPPoolMod" in itemStats ){
    totalStats["FlatHPPool"] += itemStats["FlatHPPoolMod"];
  }
  if("FlatHPRegenMod" in itemStats ){
    totalStats["FlatHPRegen"] += itemStats["FlatHPRegenMod"];
  }
  if("FlatMPPoolMod" in itemStats ){
    totalStats["FlatMPPool"] += itemStats["FlatMPPoolMod"];
  }
  if("PercentLifeStealMod" in itemStats ){
    totalStats["PercentLifeSteal"] += itemStats["PercentLifeStealMod"];
  }
  return totalStats;
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