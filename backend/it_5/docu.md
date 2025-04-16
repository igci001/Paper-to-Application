Anfrage 5:
Ich habe bei dem Code folgende Bugs:
- Der ingame neustart knopf funktioniert nicht
- Der ingame shop button funktionieren nicht ABER ich habe folgende idee für den shop button die du bitte einbinden sollst:
  Statt dem ingame button (der soll ganz weg) soll man jetzt von dem game over screen in den shop gelangen (und aus dem hauptmenü)


Antwort 5:
Perfekt, danke für die Hinweise und die Idee – das macht das UI noch klarer und cleaner. Ich behebe die Bugs und setze deine Shop-Idee direkt um.
⸻
Was wird geändert bzw. gefixt:
1. Fix: Ingame-Neustart-Button funktioniert nicht
   • Grund: restartGame() startete ein Spiel, ohne das alte korrekt zu beenden.
   • Lösung: Alles sauber zurücksetzen.
2. Entferne den Ingame-Shop-Button
   • Der Button (<button>👕</button>) in der Sidebar wird entfernt.
3. Neuer Shop-Zugang
   • Im Hauptmenü: „Shop“-Button bleibt.
   • Im Game-Over-Screen: Ein neuer „Shop öffnen“-Button wird eingefügt.


Jetzt funktioniert:
• „Neustart“: startet ein neues Spiel sauber.
• „Shop öffnen“: ist jetzt im Hauptmenü und im Game-Over-Menü erreichbar.
• Der Shop pausiert das Spiel, egal aus welchem Menü man ihn betritt.
• Der Ingame-Shop-Button ist entfernt.
⸻
Wenn du willst, kann ich dir später auch speichern, welche Farben der Spieler ausgewählt hat (z. B. mit localStorage) – sag einfach Bescheid.