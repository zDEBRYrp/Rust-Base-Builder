import { useEffect, useState } from "react";
import { Slider, ThemeProvider, createTheme } from "@mui/material";
import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import { set_enable_hints, set_enable_cameras, set_enable_structures_visibility, set_enable_resource_container, set_enable_model_transform_controls, set_performance_mode, set_performance_monitor_state, set_camera_fov, set_enable_model_textures, set_bloom_state, set_better_lighting_state, set_ssao_state, set_antialiasing_state, set_audio} from "../../Store.tsx"; //prettier-ignore

import controls_a_Thumbnail from "../../icons/controls_a_thumbnail.png";
import controls_b_Thumbnail from "../../icons/controls_b_thumbnail.png";
import settings_a_Thumbnail from "../../icons/settings_a_thumbnail.png";
import settings_b_Thumbnail from "../../icons/settings_b_thumbnail.png";

import { useAudioPlayer } from "./AudioPlayer.tsx";

//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component This component provides access to multiple settings related to the app, divided into different sections:
//Component UI settings, audio, performance, postprocessing, other
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const Settings = () => {
  const dispatch = useDispatch();
  const playSound = useAudioPlayer();

  const enable_hints = useSelector((state: RootState) => state.pageSettings.enable_hints);
  const enable_cameras = useSelector((state: RootState) => state.pageSettings.enable_cameras);
  const enable_structures_visibility = useSelector((state: RootState) => state.pageSettings.enable_structures_visibility); //prettier-ignore
  const enable_resource_container = useSelector((state: RootState) => state.pageSettings.enable_resource_container);
  const model_transform_controls = useSelector((state: RootState) => state.pageSettings.enable_model_transform_controls); //prettier-ignore

  const performance_mode = useSelector((state: RootState) => state.pageSettings.performance_mode); //prettier-ignore
  const performance_monitor_state = useSelector((state: RootState) => state.pageSettings.performance_monitor_state); //prettier-ignore
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures); //prettier-ignore
  const camera_fov = useSelector((state: RootState) => state.pageSettings.camera_fov); //prettier-ignore

  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore
  const better_lighting_state = useSelector((state: RootState) => state.pageSettings.better_lighting_state); //prettier-ignore
  const ssao_state = useSelector((state: RootState) => state.pageSettings.ssao_state); //prettier-ignore
  const antialiasing_state = useSelector((state: RootState) => state.pageSettings.antialiasing_state); //prettier-ignore
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  const [settings_button_click, set_settings_button_click] = useState<boolean>(false);
  const [controls_button_click, set_controls_button_click] = useState<boolean>(false);

  //prettier-ignore
  const camera_fov_slider_theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          root: {color: "#ffd5b3"},
          thumb: {color: "white"},
          mark: {backgroundColor: "white"},
          markLabel: {color: "white", fontSize: "1.3vh"},
        },
      },
    },
  });

  //prettier-ignore
  const camera_fov_slider_marks = [
    {value: 60, label: "60"},
    {value: 70, label: "70"},
    {value: 80, label: "80"},
    {value: 90, label: "90"},
    {value: 100, label: "100"},
    {value: 110, label: "110"},
    {value: 120, label: "120"},
  ];

  function SettingsControlsButtonClick(type: string) {
    if (type === "settings") {
      set_settings_button_click(!settings_button_click);
      set_controls_button_click(false);
    } else if (type === "controls") {
      set_controls_button_click(!controls_button_click);
      set_settings_button_click(false);
    }
    playSound("menu_sound");
  }

  //prettier-ignore
  function handleToggleSwitch(actionCreator: (toggle: boolean) => { type: string; payload: boolean }, toggle: boolean) {
    dispatch(actionCreator(toggle));
    playSound("buttons_sound")
  }

  function BuildSettingsAndControlsSegmentTitle(segment_title: string) {
    return <div className="settings_and_controls_segment_title">{segment_title}</div>;
  }

  //prettier-ignore
  function BuildSettingsSegments(settings_element_description: string, is_setting_enabled: boolean, toggle_setting: any) {
    return (
      <div className="settings_segment_container">
        <div className="settings_segment_type">{settings_element_description}</div>
        <div className="settings_segment_buttons_container">
          <div 
          onClick={() => handleToggleSwitch(toggle_setting, true)}
            className={
              is_setting_enabled
                ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
            }
          >
            включено
          </div>
          <div
           onClick={() => handleToggleSwitch(toggle_setting, false)}
            className={
              !is_setting_enabled
                ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
            }
          >
            выключено
          </div>
        </div>
      </div>
    );
  }

  function BuildControlsSegments(settings_element_description: string, controls_element: string) {
    return (
      <div className="controls_segment_container">
        <div className="controls_segment_type">{settings_element_description}</div>
        <div className="controls_segment_description">{controls_element}</div>
      </div>
    );
  }

  const HandleCameraFovChange = (_event: Event, newValue: number | number[]) => {
    dispatch(set_camera_fov(newValue as number));
  };

  useEffect(() => {
    {
      if (performance_mode) {
        dispatch(set_performance_mode(true));
        dispatch(set_enable_model_textures(false));
        dispatch(set_bloom_state(false));
        dispatch(set_better_lighting_state(false));
        dispatch(set_ssao_state(false));
        dispatch(set_antialiasing_state(false));
      } else if (!performance_mode) {
        dispatch(set_performance_mode(false));
        dispatch(set_enable_model_textures(true));
        dispatch(set_bloom_state(true));
        dispatch(set_better_lighting_state(true));
        dispatch(set_ssao_state(true));
        dispatch(set_antialiasing_state(true));
      }
    }
  }, [performance_mode]);

  return (
    <>
      {/* prettier-ignore */}
      <div className="settings_and_controls_main_container">
        <div className="settings_main_containter">
          <button className="settings_main_containter_button" onClick={() => {SettingsControlsButtonClick("settings")}}>
          <img src={!settings_button_click ? settings_a_Thumbnail : settings_b_Thumbnail} style={{ width: '75%', height: '75%', objectFit: 'contain' }} alt="Settings button thumbnail" className="settings_button_thumbnail"/>
          </button>
          <span className="settings_main_containter_description">настройки</span>
        </div>

        <div className="controls_main_containter">
          <button className="controls_main_containter_button" onClick={() => {SettingsControlsButtonClick("controls")}}>
          <img src={!controls_button_click ? controls_a_Thumbnail : controls_b_Thumbnail} alt="Controls button thumbnail" className="controls_button_thumbnail"/>
          </button>
          <span className="controls_main_containter_description">управление</span>
        </div>
      </div>

      {/* prettier-ignore */}
      <div className={settings_button_click ? "settings_container settings_container_displayed" : "settings_container settings_container_hidden"} style={{ height: performance_mode ? '65%' : '80%', }}>

        {BuildSettingsAndControlsSegmentTitle("Настройки интерфейса")}
          {BuildSettingsSegments("подсказки управления:", enable_hints, set_enable_hints)}
          {BuildSettingsSegments("переключатель 2D / 3D:", enable_cameras, set_enable_cameras)}
          {BuildSettingsSegments("видимость объектов:", enable_structures_visibility, set_enable_structures_visibility)}
          {BuildSettingsSegments("счётчик ресурсов:", enable_resource_container, set_enable_resource_container)}
          {BuildSettingsSegments("панель управления объектом:", model_transform_controls, set_enable_model_transform_controls)}

        {BuildSettingsAndControlsSegmentTitle("Звук")}
          {BuildSettingsSegments("звук:", audio, set_audio)}

        {BuildSettingsAndControlsSegmentTitle("Производительность")}
          {BuildSettingsSegments("режим производительности:", performance_mode, set_performance_mode)}
          {BuildSettingsSegments("монитор производительности:", performance_monitor_state, set_performance_monitor_state)}


        <div className="settings_segment_container">
          <div className="settings_segment_type">угол обзора 3D:</div>
          <ThemeProvider theme={camera_fov_slider_theme}>
            <Slider aria-label="Volume" value={camera_fov} min={60} max={120} step={10} marks={camera_fov_slider_marks} style={{ width: "40%" }} onChange={HandleCameraFovChange}/>
          </ThemeProvider>
        </div>

        {BuildSettingsAndControlsSegmentTitle("Графика " + (performance_mode ? "(ограничена режимом производительности)" : ""))}
         {!performance_mode && (
          <>{BuildSettingsSegments("текстуры моделей:", enable_model_textures, set_enable_model_textures)}
          {BuildSettingsSegments("свечение:", bloom_state, set_bloom_state)}
          {BuildSettingsSegments("улучшенное освещение:", better_lighting_state, set_better_lighting_state)}
          {BuildSettingsSegments("SSAO (затенение окружающего пространства):", ssao_state, set_ssao_state)}
          {BuildSettingsSegments("сглаживание:", antialiasing_state, set_antialiasing_state)}
          </>)}
      </div>

      {/* prettier-ignore */}
      <div className={controls_button_click ? "controls_container controls_container_displayed" : "controls_container controls_container_hidden"}>
          
        {BuildSettingsAndControlsSegmentTitle("Мышь — 3D режим")}
          {BuildControlsSegments("ЛКМ | MB1", "вращать камеру")}
          {BuildControlsSegments("ПКМ | MB2", "перемещать камеру")}
          {BuildControlsSegments("Колесо мыши", "приближать и отдалять")}

        {BuildSettingsAndControlsSegmentTitle("Мышь — 2D режим")}
          {BuildControlsSegments("ЛКМ | ПКМ", "перемещать камеру")}
          {BuildControlsSegments("Колесо мыши", "приближать и отдалять")}
        
        {BuildSettingsAndControlsSegmentTitle("Клавиатура — выбран объект")}
          {BuildControlsSegments("W | ⇧", "двигать объект вперёд")}
          {BuildControlsSegments("D | ⇨", "двигать объект вправо")}
          {BuildControlsSegments("S | ⇩", "двигать объект вниз")}
          {BuildControlsSegments("A | ⇦", "двигать объект влево")}
          {BuildControlsSegments("Q", "вращать объект против часовой стрелки")}
          {BuildControlsSegments("E", "вращать объект по часовой стрелке")}
          {BuildControlsSegments("SPACE", "поднять объект по высоте")}
          {BuildControlsSegments("CTRL", "опустить объект по высоте")}
          {BuildControlsSegments("DEL | BACKSPACE", "удалить выбранный объект")}
      </div>
    </>
  );
};

export default Settings;
