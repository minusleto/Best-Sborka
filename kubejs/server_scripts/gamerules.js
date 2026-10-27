// Best-Sborka world rules, applied every time a world is loaded.
// Quests are done in FTB Quests, so advancement announcements in chat are turned off.
// Delete this file to get the messages back (toasts in the corner are not affected).
ServerEvents.loaded(event => {
  event.server.runCommandSilent('gamerule announceAdvancements false')
})
