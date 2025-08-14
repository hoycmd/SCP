import * as room from 'pixel_combats/room';
import * as basic from 'pixel_combats/basic';

room.Teams.Add('Blue', '|ГВАРДЕЙЦЫ|', new basic.Color(1, 1, 1, 0));
room.Teams.Add('Red', '|Зеки D|', new basic.Color(0, 0, 0, 0.5));
const prop_team_adm = room.Teams.Get('Blue');
const prop_team_player = room.Teams.Get('Red');
prop_team_adm.Spawns.SpawnPointsGroups.Add(1);
prop_team_player.Spawns.SpawnPointsGroups.Add(2);

room.Damage.FriendlyFire.Value = true;
room.Damage.DamageOut.Value = true;
room.BreackGraph.OnlyPlayerBlocksDmg = true;
room.BreackGraph.PlayerBlocksBoost = true;
const IdPropAdmin = 'D4F07EE3D6175B53';
const IdPropOhrans = '2827CD16AE7CC982';

room.Ui.GetContext().TeamProp1.Value = { Team: 'Gvard', Prop: 'Deaths' };
prop_team_adm.Properties.Get('Deaths').Value = '<b><color=#9b111e>SCP</color></b>';

room.LeaberBoard.PlayerLeaderBoardValues = [
 new DisplayValueHeader('Deaths', '<b><color=#9b111e>Deaths</color></b>', '<b><color=#9b111e>Deaths</color></b>'),
 new DisplayValueHeader('Scores', '<b><color=#9b111e>Kills</color></b>', '<b><color=#9b111e>Kills</color></b>')
 new DisplayValueHeader('RoomID', '<b><color=#9b111e>ID</color></b>', '<b><color=#9b111e>ID</color></b>')
];
room.LeaderBoard.TeamWeightGetter.Set(function(t) {
 return t.Properties.Get('Scores');
});
room.Teams.RequestJoinTeam.Add(function(p, t) { t.Add(p); });
room.Teams.PlayerChangeTeam.Add(function(p) { p.Spawns.Spawn()});

room.Damage.OnDeaths.Add(function(p) {
 ++p.Properties.Deaths.Value;
p.Ui.Hint.Value = 'Вы умерли!';
});  

room.Damage.OnKill.Add(function(p,k) {
 if (k.Team != null && k.Team != p.Team) {
++p.Properties.Kills.Value;
p.Properties.Scores.Value += 100;
 }  
});   

const inv = room.Inventory.GetContext();
inv.Main.Value = false;
inv.Secondary.Value = false;
inv.Melee.Value = false;
inv.Explosive.Value = false;
inv.Build.Value = false;

if (p.id == IdPropAdmin || p.id == IdPropOhrans ) GiveAdm();
function GiveAdm() {
p.inv.Main.Value = true;
p.inv.Secondary.Value = true;
p.inv.Melee.Value = true;
p.inv.Explosive.Value = true;
p.inv.Build.Value = true;
p.inv.MainInfinity.Value = true;
p.inv.SecondaryInfinity.Value = true;
p.inv.ExplosiveInfinity.Value = true;
p.inv.BuildInfinity.Value = true;
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
p.ContextedProperties.SkinType.Value = 3;
}

