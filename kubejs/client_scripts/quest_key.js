// Best-Sborka: open the FTB Quests book with the Ё / ~ key.
// Ё and ~ are one physical key (GLFW_KEY_GRAVE_ACCENT = 96), so it works on Russian and English layouts.
// The built-in FTB Quests keybind ("Quests" in Controls) is unbound by default; this script
// covers it without touching options.txt (options.txt is client-local and ignored by git).
// The key is ignored while any screen is open (chat, inventory, the book itself).
const QUESTS_KEY = 96
const ClientQuestFile = Java.loadClass('dev.ftb.mods.ftbquests.client.ClientQuestFile')
let questKeyWasDown = false

ClientEvents.tick(event => {
  const down = Client.isKeyDown(QUESTS_KEY)
  if (down && !questKeyWasDown && event.player && !Client.currentScreen) {
    ClientQuestFile.openGui()
  }
  questKeyWasDown = down
})
