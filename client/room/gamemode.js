import * as room from 'pixel_combats/room';
import * as basic from 'pixel_combats/basic';
import * as teams from './default_teams.js';
 
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
redTeam.Properties.Get('Deaths').Value = '༒<< удачной игры! >>༒';
room.Ui.GetContext().TeamProp2.Value = { Team: 'Red', Prop: 'Deaths' };

// лидерборд
room.LeaberBoard.PlayerLeaberBoardValues = [
 new basic.DisplayValueHeader('Kills', 'KILLS', 'KILLS'),
 new basic.DisplayValueHeader('Deaths', 'DEATHS', 'DEATHS'),
 new basic.DisplayValueHeader('Scores', 'SCORES', 'SCORES'),
 new basic.DisplayValueHeader('Spawns', 'SPAWNS', 'SPAWNS')
];
room.LeaberBoard.PlayersWeightGetter.Set(function(p) {
 return p.Properties.Get('Scores').Value;
});

// вход в команды
room.Teams.OnRequestJoinTeam.Add(function(p,t) { t.Add(p); });
// спавн по входу
room.Teams.PlayerChangeTeam.Add(function(p) { p.Spawns.Spawn(); });

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
