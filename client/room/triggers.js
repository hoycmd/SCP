import * as room from 'pixel_combats/room';

// инициализация, настройки параметры зоны
function CreateNewArea(AreaName, AreaTags, AreaEnable, AreaOnEnter, AreaOnExit, AreaViewName, AreaViewColor, AreaViewEnable) {
 const NewArea = room.AreaPlayerTriggerService.Get(AreaName);
  NewArea.Tags = AreaTags;
  NewArea.Enable = AreaEnable;
  NewArea.OnEnter.Add(AreaOnEnter);
  NewArea.OnExit.Add(AreaOnExit);
 const NewAreaView = room.AreaViewService.GetContext().Get(AreaViewName);
  NewAreaView.Color = AreaViewColor;
  NewAreaView.Tags = AreaTags;
  NewAreaView.Enable = AreaViewEnable;
}
