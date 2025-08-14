import { DisplayValueHeader, Color } from 'pixel_combats/basic';
import { Game, Players, Inventory, LeaderBoard, BuildBlocksSet, Teams, Damage, BreackGraph, Ui, Properties, GameMode, Spawns, Timers, TeamsBalancer } from 'pixel_combats/room';

Damage.GetContext().DamageOut.Value = true;
Damage.GetContext().FriendlyFire.Value = true;

Teams.Add("Blue", "<b><color=#9b111e>Гвардейцы</color></b>", new Color(1, 1, 1, 0));
Teams.Add("Red", "<b><color=#9b111e>Зеки D</color></b>", new Color(0, 0, 0, 0.5));
var admsTeam = Teams.Get("Red");
var playersTeam = Teams.Get("Blue");
Teams.Get("Blue").Spawns.SpawnPointsGroups.Add(1);
Teams.Get("Red").Spawns.SpawnPointsGroups.Add(2);
playersTeam.Build.BlocksSet.Value = BuildBlocksSet.Blue;
admsTeam.Build.BlocksSet.Value = BuildBlocksSet.AllClear;

LeaderBoard.PlayerLeaderBoardValues = [
  new DisplayValueHeader("Kills", "<b><color=#9b111e>Kills</color></b>", "<b><color=#9b111e>Kills</color></b>"),
  new DisplayValueHeader("Deaths", "<b><color=#9b111e>Deaths</color></b>", "<b><color=#9b111e>Deaths</color></b>"),
  new DisplayValueHeader("Scores", "<b><color=#9b111e>Scores</color></b>", "<b><color=#9b111e>Scores</color></b>"),
];

LeaderBoard.PlayersWeightGetter.Set(function(player) {
  return player.Properties.Get("Scores").Value;
});

Ui.GetContext().TeamProp2.Value = { Team: "Red", Prop: "Deaths" };
admsTeam.Properties.Get("Deaths").Value = "<b><color=#9b111e>SCP</color></b>";

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
  if (player.id == "D4F07EE3D6175B53" || player.id == "2827CD16AE7CC982") {
    Teams.Get("Red").Add(player);
  } else {
    Teams.Get("Blue").Add(player);
  }
  player.contextedProperties.MaxHp.Value = 159;
  if (player.id == "2827CD16AE7CC982") {
    getadm(player);
  } 
  if (player.id == "D4F07EE3D6175B53") {
    getadm(player);
  }
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
    player.Properties.Scores.Value += 100;
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
