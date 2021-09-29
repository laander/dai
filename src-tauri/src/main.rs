#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
  fn custom_menu(name: &str) -> CustomMenuItem {
    let c = CustomMenuItem::new(name.to_string(), name);
    return c;
  }
  let menu = Menu::new()
    .add_submenu(Submenu::new(
      "Dai",
      Menu::new()
        .add_native_item(MenuItem::About("Dai".to_string()))
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Hide)
        .add_native_item(MenuItem::HideOthers)
        .add_native_item(MenuItem::ShowAll)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Quit),
    ))
    .add_submenu(Submenu::new(
      "Edit",
      Menu::new()
        .add_native_item(MenuItem::Undo)
        .add_native_item(MenuItem::Redo)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Cut)
        .add_native_item(MenuItem::Copy)
        .add_native_item(MenuItem::Paste)
        .add_native_item(MenuItem::SelectAll)
        .add_native_item(MenuItem::Separator)
        .add_item(custom_menu("Navigate Up").accelerator("up"))
        .add_item(custom_menu("Navigate Down").accelerator("down"))
        .add_item(custom_menu("Move Up").accelerator("cmdOrControl+up"))
        .add_item(custom_menu("Move Down").accelerator("cmdOrControl+down"))
        .add_native_item(MenuItem::Separator)
        .add_item(custom_menu("Toggle Done").accelerator("space"))
        .add_item(custom_menu("Delete Todo").accelerator("backspace"))
        .add_item(custom_menu("Edit Text").accelerator("enter"))
        .add_item(custom_menu("Cancel Edit Text").accelerator("escape"))
        .add_native_item(MenuItem::Separator)
        .add_item(custom_menu("New Todo").accelerator("cmdOrControl+n")),
    ))
    .add_submenu(Submenu::new(
      "Window",
      Menu::new()
        .add_item(custom_menu("Toggle Theme").accelerator("cmdOrControl+b"))
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Minimize)
        .add_native_item(MenuItem::EnterFullScreen)
        .add_native_item(MenuItem::Zoom),
    ));

  tauri::Builder::default()
    .menu(menu)
    .on_menu_event(|event| {
      let event_name = event.menu_item_id();
      event.window().emit("menu", event_name).unwrap();
      match event_name {
        "Learn More" => {
          println!("Learning more...");
        }
        _ => {}
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
