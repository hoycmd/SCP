import * as room from 'pixel_combats/room';
import * as basic from 'pixel_combats/basic';
import * as teams from './default_teams.js';
import * as triggers from './triggers.js';

try {
 
// настройки
room.Damage.GetContext().DamageOut.Value = true; // урон в режиме
room.Damage.GetContext().FriendlyFire.Value = true; // урон по своим
room.BreackGraph.OnlyPlayerBlocksDmg = true; // лом блоков офф
room.TeamsBalancer.IsAutoBalance = true; // соавтор команд
room.Ui.GetContext().Hint.Value = '<< SCP фонд >>'; // подсказка 

// создаем команды
const blueTeam = teams.create_blue_team();
const redTeam = teams.create_red_team();
blueTeam.Build.BlocksSet.Value = room.BuildBlocksSet.Blue;
redTeam.Build.BlocksSet.Value = room.BuildBlocksSet.AllClear;
blueTeam.contextedProperties.SkinType.Value = 2;
redTeam.contextedProperties.SkinType.Value = 3;
blueTeam.Spawns.RespawnTime.Value = 3;
redTeam.Spawns.RespawnTime.Value = 5;

// интерфейс команд
blueTeam.Properties.Get('Deaths').Value = '༒< Scp >༒';
room.Ui.GetContext().TeamProp1.Value = { Team: 'Blue', Prop: 'Deaths' };
redTeam.Properties.Get('Prop').Value = '༒<< удачной игры! >>༒';
room.Ui.GetContext().TeamProp2.Value = { Team: 'Red', Prop: 'Prop' };

// лидерборд
room.LeaderBoard.PlayerLeaberBoardValues = [
 new basic.DisplayValueHeader('Kills', 'KILLS', 'KILLS'),
 new basic.DisplayValueHeader('Deaths', 'DEATHS', 'DEATHS'),
 new basic.DisplayValueHeader('Scores', 'SCORES', 'SCORES'),
 new basic.DisplayValueHeader('Spawns', 'SPAWNS', 'SPAWNS')
];
room.LeaderBoard.PlayersWeightGetter.Set(function(p) {
 return p.Properties.Get('Scores').Value;
});

// вход в команды
room.Teams.OnRequestJoinTeam.Add(function(p,t) { 
 t.Add(p);
 function Getadm(p) {
 p.inventory.Main.Value = true;
 p.inventory.MainInfinity.Value = true;
 p.inventory.Secondary.Value = true;
 p.inventory.SecondaryInfinity.Value = true;
 p.inventory.Melee.Value = true;
 p.inventory.Explosive.Value = true;
 p.inventory.ExplosiveInfinity.Value = true;
 p.inventory.Build.Value = true;
 p.inventory.BuildInfinity.Value = true;
 p.Build.Pipette.Value = true;
 p.Build.FlyEnable.Value = true;
 p.Build.BalkLenChange.Value = true;
 p.Build.BuildRangeEnable.Value = true;
 p.Build.BuildModeEnable.Value = true;
 p.Build.RemoveQuad.Value = true;
 p.Build.FillQuad.Value = true;
 p.Build.FloodFill.Value = true;
 p.Build.ChangeSpawnsEnable.Value = true;
 p.Build.LoadMapEnable.Value = true;
 p.Build.ChangeMapAuthorsEnable.Value = true;
 p.Build.GenMapEnable.Value = true;
 p.Build.ChangeCameraPointsEnable.Value = true;
 p.Build.CollapseChangeEnable.Value = true;
 p.Build.QuadChangeEnable.Value = true;
 p.Build.SetSkyEnable.Value = true;
 p.Build.BlocksSet.Value = BuildBlocksSet.AllClear;
 p.Damage.DamageIn.Value = false;
 }
if (p.id == 'D4F07EE3D6175B53' || p.id == '2827CD16AE7CC982') {
 Getadm(p);
}
});
// спавн по входу
room.Teams.OnPlayerChangeTeam.Add(function(p) { 
 p.Spawns.Spawn(); 
});

// счетчик убийств
room.Damage.OnKill.Add(function(p,k) { 
  if (p.id !== k.id) { 
++p.Properties.Kills.Value;
p.Properties.Scores.Value += 100;
  }
});

// счетчик смертей
room.Damage.OnDeath.Add(function(p) {
 ++p.Properties.Deaths.Value;
});

// счетчик спавнов
room.Spawns.OnSpawn.Add(function(p) {
 ++p.Properties.Spawns.Value;
});

// бессмертие
const immortalityTimerName = 'immortality';
room.Spawns.GetContext().OnSpawn.Add(function(p) {
 p.Properties.Immortliaty.Value = true;
 timer = p.Timers.Get(immortalityTimerName).Restart(5);
});
room.Timers.OnPlayerTimer.Add(function(t) {       
 if (t.Id != immortalityTimerName) return;
 t.Player.Properties.Immortliaty.Value = false;
});

// инвентарь 
const inventory = room.Inventory.GetContext();
inventory.Main.Value = false;
inventory.Secondary.Value = false;
inventory.Melee.Value = false;
inventory.Explosive.Value = false;
inventory.Build.Value = false;

// Зоны
const MeleeTrigger = triggers.CreateNewArea('MeleeTrigger', ['Нож'], true, function(p,a) {
 if (p.inventory.Melee.Value) p.Ui.Hint.Value = '<<  Невозможно повторно, взять нож! >>'; 
 return;
  p.inventory.Melee.Value = true;
  p.Ui.Hint.Value = '<< Вы взяли: нож! >>';
}, function(p,a) {}, 'ViewMeleeTrigger', new basic.Color(0, 0, 1, 0), true);
 
} catch (e) {
 room.msg.Show(`${e.name}: ${e.message} ${e.stack}`);
}


