import * as room from 'pixel_combats/room';
import * as basic from 'pixel_combats/basic';

// константы
export const red_team_name = 'Red';
export const blue_team_name = 'Blue';
export const red_team_display_name = '༒< Гвардейцы >༒';
export const blue_team_display_name = '༒< Заключенные >༒';
export const red_team_spawn_points_groups = '2';
export const blue_team_spawn_points_groups = '1';
export const red_team_color = new basic.Color(1, 1, 1, 0);
export const blue_team_color = new basic.Color(1, 0.5, 0, 0);

// команда синия
export function create_blue_team() {
 room.Teams.Add(blue_team_name, blue_team_display_name, blue_team_color);
 room.Teams.Get(blue_team_name).Spawns.SpawnPointsGroups.Add(blue_team_spawn_points_groups);
}

// команда красная
export function create_red_team() {
 room.Teams.Add(red_team_name, red_team_display_name, red_team_color);
 room.Teams.Get(red_team_name).Spawns.SpawnPointsGroups.Add(red_team_spawn_points_groups);
}
