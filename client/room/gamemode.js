import { DisplayValueHeader, Color } from 'pixel_combats/basic';
import { Game, Players, Inventory, LeaderBoard, BuildBlocksSet, Teams, Damage, BreackGraph, Ui, Properties, GameMode, Spawns, Timers, TeamsBalancer } from 'pixel_combats/room';

Damage.GetContext().DamageOut.Value = true;
Damage.GetContext().FriendlyFire.Value = true;
BreackGraph.OnlyPlayerBlocksDmg = true; 
TeamsBalancer.IsAutoBalance = true;

Teams.Add("Blue", "Заключенные", new Color(1, 0.5, 0, 0));
Teams.Add("Red", "Гвардейцы", new Color(1, 1, 1, 0));
var admsTeam = Teams.Get("Red");
var playersTeam = Teams.Get("Blue");
Teams.Get("Blue").Spawns.SpawnPointsGroups.Add(1);
Teams.Get("Red").Spawns.SpawnPointsGroups.Add(2);
playersTeam.Build.BlocksSet.Value = BuildBlocksSet.Blue;
playersTeam.ContextedProperties.SkinType.Value = 2;
admsTeam.ContextedProperties.SkinType.Value = 3;
admsTeam.Build.BlocksSet.Value = BuildBlocksSet.AllClear;

LeaderBoard.PlayerLeaderBoardValues = [
  new DisplayValueHeader("Kills", "<b>Киллы</b>", "<b>Киллы</b>"),
  new DisplayValueHeader("Deaths", "<b>Смерти</b>", "<b>Смерти</b>"),
  new DisplayValueHeader("Scores", "<b>Очки</b>", "<b>Очки</b>"),
  new DisplayValueHeader("Статус", "<b>Статус</b>", "<b>Статус</b>")
];                        
 LeaderBoard.PlayersWeightGetter.Set(function(player) {
  return player.Properties.Get("Scores").Value;
});

Ui.GetContext().TeamProp1.Value = { Team: "Blue", Prop: "Deaths" };
Ui.GetContext().TeamProp2.Value = { Team: "Red", Prop: "Deaths" };

Teams.OnRequestJoinTeam.Add(function(player,team){
  function getadm(player) {
    player.inventory.Main.Value = true;
    player.inventory.MainInfinity.Value = true;
    player.inventory.Secondary.Value = true;
    player.inventory.SecondaryInfinity.Value = true;
    player.inventory.Melee.Value = true;
    player.inventory.Explosive.Value = true;
    player.inventory.ExplosiveInfinity.Value = true;
    player.inventory.Build.Value = true;
    player.inventory.BuildInfinity.Value = true;
    player.contextedProperties.SkinType.Value = 1;
    player.Build.Pipette.Value = true;
    player.Build.FlyEnable.Value = true;
    player.Build.BalkLenChange.Value = true;
    player.Build.BuildRangeEnable.Value = true;
    player.Build.BuildModeEnable.Value = true;
    player.Build.RemoveQuad.Value = true;
    player.Build.FillQuad.Value = true;
    player.Build.FloodFill.Value = true;
    player.Build.ChangeSpawnsEnable.Value = true;
    player.Build.LoadMapEnable.Value = true;
    player.Build.ChangeMapAuthorsEnable.Value = true;
    player.Build.GenMapEnable.Value = true;
    player.Build.ChangeCameraPointsEnable.Value = true;
    player.Build.CollapseChangeEnable.Value = true;
    player.Build.QuadChangeEnable.Value = true;
    player.Build.SetSkyEnable.Value = true;
    player.Build.BlocksSet.Value = BuildBlocksSet.AllClear;
    player.Damage.DamageIn.Value = false;
  }
  function getvip1(player) {
    player.inventory.Main.Value = true;
    player.inventory.MainInfinity.Value = true;
    player.inventory.Secondary.Value = true;
    player.inventory.SecondaryInfinity.Value = true;
    player.inventory.Melee.Value = true;
    player.inventory.Explosive.Value = true;
    player.contextedProperties.MaxHp.Value = 1000;
  }
  function getvip2(player) {
    player.inventory.Main.Value = true;
    player.inventory.MainInfinity.Value = true;
    player.inventory.Secondary.Value = true;
    player.inventory.SecondaryInfinity.Value = true;
    player.inventory.Melee.Value = true;
    player.inventory.Explosive.Value = true;
    player.inventory.ExplosiveInfinity.Value = true;
    player.Build.FlyEnable.Value = true;
    player.contextedProperties.MaxHp.Value = 5000;
  }
  function getvip3(player) {
    player.inventory.Main.Value = true;
    player.inventory.MainInfinity.Value = true;
    player.inventory.Secondary.Value = true;
    player.inventory.SecondaryInfinity.Value = true;
    player.inventory.Melee.Value = true;
    player.inventory.Explosive.Value = true;
    player.inventory.ExplosiveInfinity.Value = true;
    player.Build.FlyEnable.Value = true;
    player.inventory.Build.Value = true;
    player.contextedProperties.MaxHp.Value = 10000;
  }
  Teams.Get("Red").Add(player);
  player.contextedProperties.MaxHp.Value = 200;
  player.inventory.Main.Value = true;
  player.inventory.Secondary.Value = true;
  player.inventory.Melee.Value = true;
  player.inventory.Build.Value = true;
   } 
  Teams.Get("Blue").Add(player);                           
  player.contextedProperties.MaxHp.Value = 150;
  // Для меня
  if (player.id == "41F16562BF7046EA") {
    getadm(player);
  }
  // Для чёрного мечника 
  if (player.id == "78B0B66D795E5120") {
    getadm(player);
  }
  // Для n1ckа
  if (player.id == "2F1955AAE64508B9") {
    getvip3(player);
  }
  // Для ghostа
  if (player.id == "3D58DB48C21B6054") {
    getvip3(player);
  }
  // Для rekiona
  if (player.id == "B0B43E6C2C10E541") {
    getvip1(player);
  }
  // Для mau
  if (player.id == "AAA9FBB8CCA3CD90") {
    getvip3(player);
  }
  // Для отчима
  if (player.id == "8972D9E2F6573D5F") {
    getvip2(player);
  }
  // Для сотрудника
  if (player.id == "CD8BA5F2ABD9BBDA") {
    getvip2(player);
  }
  // Для брата
  if (player.id == "8681FCE77AB4939D") {
    getvip3(player);
  }
  // Для ГГчеликаГГ
  if (player.id == "40265AFE3B5A0AC2") {
    getvip3(player);
  }
  // Для dragonа
  if (player.id == "C957E4E920E8ACD") {
    getvip1(player);
  }
  if (player.id == "41F16562BF7046EA" || player.id == "78B0B66D795E5120" || player.id == "2F1955AAE64508B9" || player.id == "3D58DB48C21B6054" || player.id == "AAD18F7FB400BD5F" || player.id == "B0B43E6C2C10E541" || player.id == "AAA9FBB8CCA3CD90" || player.id == "8681FCE77AB4939D" || player.id == "40265AFE3B5A0AC2" || player.id == "C957E4E920E8ACD") {
  if (player.id == "41F16562BF7046EA") {
    player.Properties.Get("Статус").Value = "ГЛ. АДМИН";
  }
  if (player.id == "78B0B66D795E5120") {
    player.Properties.Get("Статус").Value = "АДМИН";
  }
  if (player.id == "2F1955AAE64508B9" || player.id == "3D58DB48C21B6054" || player.id == "AAD18F7FB400BD5F" || player.id == "B0B43E6C2C10E541" || player.id == "AAA9FBB8CCA3CD90" || player.id == "8681FCE77AB4939D" || player.id == "40265AFE3B5A0AC2" || player.id == "C957E4E920E8ACD") {
    player.Properties.Get("Статус").Value = "VIP";
  }
  } else {
    player.Properties.Get("Статус").Value = "ИГРОК";
  }
});

Teams.OnPlayerChangeTeam.Add(function(player){ 
  player.Spawns.Spawn();
});

var immortalityTimerName = "immortality";
Spawns.GetContext().OnSpawn.Add(function(player){
  player.Properties.Immortality.Value = true;
  timer = player.Timers.Get(immortalityTimerName).Restart(5);
});
Timers.OnPlayerTimer.Add(function(timer){
  if (timer.Id != immortalityTimerName) return;
  timer.Player.Properties.Immortality.Value = false;
});

Damage.OnDeath.Add(function(player) {
  ++player.Properties.Deaths.Value;
});

Damage.OnKill.Add(function(player, killed) {
  if (player.id !== killed.id) { 
    ++player.Properties.Kills.Value;
    player.Properties.Scores.Value += 250;
  }
});

var inventory = Inventory.GetContext();
inventory.Main.Value = false;
inventory.Secondary.Value = false;
inventory.Melee.Value = false;
inventory.Explosive.Value = false;
inventory.Build.Value = false;
inventory.BuildInfinity.Value = false;

Spawns.GetContext().RespawnTime.Value = 0;
